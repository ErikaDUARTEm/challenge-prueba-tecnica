import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const AnimeCarousel = () => {
  const [animes, setAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Lógica para obtener la lista de animes desde tu backend y actualizar el estado
    // Ejemplo hipotético (asegúrate de adaptarlo a tu aplicación)
    fetch('https://api.jikan.moe/v4/anime?page=1&limit=5')
      .then((response) => response.json())
      .then((data) => setAnimes(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  const settings = {
    // Configuración del carrusel (puedes personalizar según tus necesidades)
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  
 console.log(animes)
 return (
  <div>
    <h2>API Data Carousel</h2>
    <Slider {...settings}>
      {animes.map((item) => (
        <div key={item.id}>
          {/* Contenido de cada slide, puedes personalizar según la estructura de tu API */}
          <img src={item.images.jpg.image_url} />
          <p>{item.score}</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>

          {/* Otros datos que quieras mostrar en el slide */}
        </div>
      ))}
    </Slider>
  </div>
);
};

export default AnimeCarousel;
