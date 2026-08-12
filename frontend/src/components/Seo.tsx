import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
  path?: string
  image?: string
  jsonLd?: object
}

export default function Seo({ title, description, path = '/', image = '/images/logo.png', jsonLd }: SeoProps) {
  const url = `https://gassolutions.duckdns.org${path}`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`https://gassolutions.duckdns.org${image}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}