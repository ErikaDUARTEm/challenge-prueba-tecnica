package api.animes.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CalculateAverageScoreController {

    @PostMapping("/calculateAverageScore")
    public ResponseEntity<String> calcularPuntajePromedio(@RequestBody List<Double> scores) {

        // Realiza el cálculo del puntaje promedio
        double suma = scores.stream().mapToDouble(Double::doubleValue).sum();
        double puntajePromedio = suma / scores.size();
        String mensaje = messageAccordingToScore(puntajePromedio);
        // Devuelve el puntaje promedio como parte de la respuesta
        return ResponseEntity.ok(mensaje);
    }

    private String messageAccordingToScore(double puntuacion) {
        if (puntuacion >= 1 && puntuacion <= 4) {
            return "No lo recomiendo.";
        } else if (puntuacion >= 5 && puntuacion <= 7) {
            return "Puedes divertirte.";
        } else if (puntuacion > 7) {
            return "Genial, esto es uno de los mejores animes.";
        } else {
            return "Puntuación no válida.";
        }
    }
}
