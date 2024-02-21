package api.animes.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@RestController
public class CalculateAverageScoreController {
    @PostMapping("/calculateAverageScore")
    public ResponseEntity<Double> calcularPuntajePromedio(@RequestBody List<Double> scores) {
        // Imprime los puntajes en la consola
        System.out.println("Puntajes recibidos: " + scores);

        // Realiza el cálculo del puntaje promedio
        double suma = scores.stream().mapToDouble(Double::doubleValue).sum();
        double puntajePromedio = suma / scores.size();

        // Devuelve el puntaje promedio como parte de la respuesta
        return ResponseEntity.ok(puntajePromedio);
    }
}
