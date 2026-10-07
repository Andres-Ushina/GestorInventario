package com.example.GestorInventario.dto;

public record AppInfoResponse(
        String name,
        String version,
        String description,
        String developer,
        String email,
        String environment
) { }
