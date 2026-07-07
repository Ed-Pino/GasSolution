package com.gassolutions.auth;

public class AuthResponse {

    private String token;
    private Long userId;
    private String email;
    private String nombre;
    private String rol;

    public AuthResponse() {}

    public AuthResponse(String token, Long userId, String email, String nombre, String rol) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
