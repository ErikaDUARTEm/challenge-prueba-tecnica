import { useEffect, useState } from 'react';
import { AnimeSlider } from './AnimeSlider';
import { Loading } from './Loading';


const AnimeCarousel = ({ searchTerm }) => {
  const [animesData, setAnimesData] = useState([]);
  const [ loading, setLoading] = useState(false);
  const [average, setAverage] = useState();
  const [searchError, setSearchError] = useState(null);
 


  const fetchNewAnimes = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://api.jikan.moe/v4/anime?page=5');
      const data = await response.json();
  
      console.log(data, data.data)
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Actualizar el estado con los nuevos animes
      console.log(data)
      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      setAnimesData((prevAnimes) => [...prevAnimes, ...data.data]);
       } else {
        console.error('La respuesta de la API no tiene el formato esperado:', data);
      }
      setSearchError(null); // Limpiar cualquier error previo
    } catch (error) {
      console.error('Error fetching new animes:', error);
      setSearchError(error);
    }finally {
      setLoading(false); // Establecer loading en false al finalizar la solicitud
    }
  };
  
console.log(animesData)
  

  useEffect(() => {
    fetchNewAnimes();
  }, [searchTerm]);

// Crear un objeto para almacenar los animes por temporada
const animesPorTemporada = {
  fall: [],
  winter: [],
  summer: [],
  spring: []
};

// Filtrar los animes y asignarlos a los arrays correspondientes
const temporadasFiltradas = animesData.filter(anime => {
  if (anime.season) {
    switch (anime.season.toLowerCase()) {
      case "fall":
        animesPorTemporada.fall.push(anime);
        break;
      case "winter":
        animesPorTemporada.winter.push(anime);
        break;
      case "summer":
        animesPorTemporada.summer.push(anime);
        break;
      case "spring":
        animesPorTemporada.spring.push(anime);
        break;
      // Puedes agregar más casos según sea necesario
      default:
        break;
    }
    return true; // Indicar que el anime pasa el filtro
  }
  return false; // Indicar que el anime no tiene una temporada definida
});

// Ahora animesPorTemporada contendrá los animes separados por temporada, incluso si season es null

let fallSeason = animesPorTemporada.fall
let winterSeason = animesPorTemporada.winter;
let summerSeason = animesPorTemporada.summer;
let springSeason = animesPorTemporada.spring;


const scoreSeason = (fallSeason, winterSeason, summerSeason, springSeason) => {
  const scoresPorTemporada = {
    fall: fallSeason.flatMap(anime =>anime.score || 0),     // Si anime.score es null o undefined, se utiliza 0
    winter: winterSeason.flatMap(anime => anime.score || 0),
    summer: summerSeason.flatMap(anime => anime.score || 0),
    spring: springSeason.flatMap(anime => anime.score || 0)
  };

  return scoresPorTemporada;
};

let scores = scoreSeason(fallSeason, winterSeason, summerSeason, springSeason)
console.log(scores)
// Lógica para enviar datos al backend
useEffect(() => {
  setLoading(true);
  if (temporadasFiltradas.length > 0) {
    
    try {
      fetch('http://localhost:8080/calculateAverageScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(scores),
      })
        .then((response) => response.text())
        .then((resultado) => {
          console.log(resultado);
          setAverage(resultado);
        });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }
}, [scores]);

console.log(average)

  const handleArrowClick = (direction) => {
    if (direction === 'next') {
      fetchNewAnimes();
    }
  };

  
    // Filtrar los animes según el término de búsqueda
  const filteredAnimes = animesData.filter((anime) => {
    const titleLowerCase = anime.title.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();
    return titleLowerCase.includes(searchTermLowerCase);
  });

  
    

  return (
    <>
      
      {loading && <Loading/>} {/* Indicador de carga */}
      <AnimeSlider loading={loading} filteredAnimes={filteredAnimes} />
      {/* <div className="slider-container">
        <Slider {...settings}>
          {filteredAnimes.map((anime) => (
          <div key={anime.mal_id}>
            <img src={anime.images?.jpg?.image_url} alt={anime.title} className='img-animes' />
            <h3>{anime.title}</h3>
            <p>{anime.description}</p>
          </div>
        ))}
      </Slider>
      </div> */}
      
    </>
  );
};

export default AnimeCarousel;
