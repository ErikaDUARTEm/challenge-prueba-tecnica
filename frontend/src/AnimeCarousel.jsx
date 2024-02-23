import { useEffect, useState } from "react";
import { AnimeSlider } from "./AnimeSlider";
import { Loading } from "./Loading";

/*Componente que hace las llamadas a la Api Gratuita, pasa datos al backend y hace llamada al enpoint
que contiene las reglas de negocio*/
const AnimeCarousel = ({ searchTerm }) => {
  const [animesData, setAnimesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [average, setAverage] = useState();
  const [searchError, setSearchError] = useState(null);

  //Fetch para acceder a la data de los animes
  const fetchNewAnimes = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.jikan.moe/v4/anime?page=5");
      const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Actualización de el estado con los nuevos animes
      if (
        data &&
        data.data &&
        Array.isArray(data.data) &&
        data.data.length > 0
      ) {
        setAnimesData((prevAnimes) => [...prevAnimes, ...data.data]);
      } else {
        console.error(
          "La respuesta de la API no tiene el formato esperado:",
          data
        );
      }
      setSearchError(null); // Limpia cualquier error previo
    } catch (error) {
      console.error("Error fetching new animes:", error);
      setSearchError(error);
    } finally {
      setLoading(false); // Establecer loading en false al finalizar la solicitud
    }
  };
  useEffect(() => {
    fetchNewAnimes();
  }, [searchTerm]);

  // Lógica para enviar datos al backend
  useEffect(() => {
    const fetchAverageScore = async () => {
      setLoading(true);
      const scoresPorTitulo = {};

      animesData.forEach((anime) => {
        const titulo = anime.title;

        if (!scoresPorTitulo[titulo]) {
          scoresPorTitulo[titulo] = [];
        }

        scoresPorTitulo[titulo].push(anime.score || 0);
      });

      const scores = {
        scoresPorTitulo: scoresPorTitulo,
      };
      //Fetch al enpoint que devuelve las reglas de negocio
      const response = await fetch(
        "http://localhost:8080/calculateAverageScore",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scores),
        }
      );
      const data = await response.json();
      setAverage(data);
      setLoading(false);
    };
    fetchAverageScore();
  }, [animesData]);

  // Filtro de los animes según búsqueda
  const getFilteredAnimes = (animes) => {
    return animes.filter((anime) => {
      const titleLowerCase = anime.title.toLowerCase();
      const searchTermLowerCase = searchTerm.toLowerCase();
      return titleLowerCase.includes(searchTermLowerCase);
    });
  };
  const filteredAnimesForSlider = getFilteredAnimes(animesData);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AnimeSlider
          loading={loading}
          filteredAnimes={filteredAnimesForSlider}
          averageData={average}
        />
      )}
    </>
  );
};

export default AnimeCarousel;
