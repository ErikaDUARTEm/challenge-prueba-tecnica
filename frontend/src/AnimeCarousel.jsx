import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const AnimeCarousel = () => {
  const [animes, setAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Lógica para obtener la lista de animes desde tu backend y actualizar el estado
    // Ejemplo hipotético (asegúrate de adaptarlo a tu aplicación)
    fetch('https://api.jikan.moe/v4/anime?page=1&limit=5')
      .then((response) => response.json())
      .then((data) =>  setAnimes(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  useEffect(()=>{
    const newScores = animes.map((item) => item.score);
    setScores((prevScores) => [...prevScores, ...newScores]);
  }, [animes]);

  useEffect(() => {
    // Solo realiza la llamada al backend si scores se ha actualizado
    if (scores.length > 0) {
      fetch('http://localhost:8080/calculateAverageScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scores),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(resultado => {
          // Maneja el resultado devuelto por el backend (puntaje promedio)
          console.log('Puntaje promedio recibido desde el backend:', resultado);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [scores]);

  const settings = {
    // Configuración del carrusel
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  
 console.log(animes)
 console.log(scores)
 return (
  <div>
    <h2>API Data Carousel</h2>
    <Slider {...settings}>
      {animes.map((item) => (
        <div key={item.id}>
          {/* Contenido de cada slide */}
          <img src={item.images.jpg.image_url} />
          <p>{item.score}</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>

        </div>
      ))}
    </Slider>
  </div>
);
};

export default AnimeCarousel;
