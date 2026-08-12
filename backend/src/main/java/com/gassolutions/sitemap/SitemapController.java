package com.gassolutions.sitemap;

import com.gassolutions.product.ProductRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SitemapController {

    private final ProductRepository productRepository;

    private static final String BASE = "https://gassolutions.duckdns.org";

    public SitemapController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping(value = "/sitemap.xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> sitemap() {
        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        sb.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
        sb.append(url(BASE + "/", "weekly", "1.0"));
        sb.append(url(BASE + "/products", "weekly", "0.9"));
        sb.append(url(BASE + "/services", "weekly", "0.9"));
        sb.append(url(BASE + "/about", "monthly", "0.6"));

        productRepository.findByActivoTrue()
                .forEach(p -> sb.append(url(BASE + "/products/" + p.getId(), "weekly", "0.8")));

        sb.append("</urlset>");
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/xml"))
                .body(sb.toString());
    }

    private static String url(String loc, String changefreq, String priority) {
        return "  <url>\n"
                + "    <loc>" + loc + "</loc>\n"
                + "    <changefreq>" + changefreq + "</changefreq>\n"
                + "    <priority>" + priority + "</priority>\n"
                + "  </url>\n";
    }
}