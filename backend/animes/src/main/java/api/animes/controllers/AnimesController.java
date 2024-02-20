package api.animes.controllers;


import api.animes.services.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AnimesController {

    private final AnimeService animeService;

    @Autowired
    public AnimesController(AnimeService animeService) {
        this.animeService = animeService;
    }

    @GetMapping("/anime")
    public List<String> getFiveAnimes() {
        return animeService.getFiveAnimes();
    }
}
