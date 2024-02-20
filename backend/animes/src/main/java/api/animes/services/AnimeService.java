package api.animes.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AnimeService {

    @Autowired
    private RestTemplate restTemplate;

    public List<String> getFiveAnimes() {
        String apiUrl = "https://api.jikan.moe/v4/anime?page=1&limit=5";
        ResponseEntity<List<String>> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<String>>() {
                }
        );
        return response.getBody();
    }
}
