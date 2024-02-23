package api.animes.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CalculateAverageScoreController {

    @PostMapping("/calculateAverageScore")
    public ResponseEntity<Map<String, Object>> calcularPuntajePromedio(@RequestBody Map<String, Object> requestBody) {

        try {
            Map<String, List<Double>> scoresPorTitulo = (Map<String, List<Double>>) requestBody.get("scoresPorTitulo");
            // Calcular el puntaje promedio por título
            Map<String, Double> puntajesPromedioPorTitulo = new HashMap<>();
            Map<String, String> clasificacionesPorTitulo = new HashMap<>();

            scoresPorTitulo.forEach((titulo, scores) -> {
                double sumaTotal = scores.stream().mapToDouble(Double::doubleValue).sum();
                long totalEpisodios = scores.size();
                double puntajePromedio = totalEpisodios > 0 ? Math.round(sumaTotal / totalEpisodios) : 0.0;

                // Clasificación según las reglas de negocio
                String clasificacion = clasificarSegunPuntaje(puntajePromedio);
                clasificacionesPorTitulo.put(titulo, clasificacion);

                puntajesPromedioPorTitulo.put(titulo, puntajePromedio);
            });

            // Devolver una respuesta con puntajes promedio y clasificaciones
            Map<String, Object> response = new HashMap<>();
            response.put("puntajesPromedio", puntajesPromedioPorTitulo);
            response.put("clasificaciones", clasificacionesPorTitulo);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error en el servidor: " + e.getMessage()));
        }
    }

    //Reglas de negocio
    private String clasificarSegunPuntaje(double puntuacion) {
        if (puntuacion >= 1 && puntuacion <= 4) {
            return "❌ I do not recommend it.";
        } else if (puntuacion >= 5 && puntuacion <= 7) {
            return "😃 You may have fun.";
        } else if (puntuacion > 7) {
            return "⭐ Great, this is one of the best anime.";
        } else {
            return "\uD83D\uDE35 Puntuación no válida.";
        }
    }
}
