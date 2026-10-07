package com.example.GestorInventario;

import com.example.GestorInventario.config.AppInfoProperties;
import com.example.GestorInventario.config.SecurityConfig;
import com.example.GestorInventario.controller.InfoController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.matchesPattern;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InfoController.class)
@Import({AppInfoProperties.class, SecurityConfig.class})
class InfoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void returnsApplicationMetadataAndValidDeveloperEmail() throws Exception {
        mockMvc.perform(get("/api/info"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("GestorInventario"))
                .andExpect(jsonPath("$.version").isNotEmpty())
                .andExpect(jsonPath("$.environment").isNotEmpty())
                .andExpect(jsonPath("$.description").isNotEmpty())
                .andExpect(jsonPath("$.email").value(matchesPattern("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")));
    }
}
