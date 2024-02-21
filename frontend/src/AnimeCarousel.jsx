import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AnimeCarousel = () => {
  const [animes, setAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [scores, setScores] = useState([]);
  const [average, setAverage] = useState();

  const fetchNewAnimes = async () => {
  try {
    // Realizar la solicitud a la API
    const response = await fetch('https://api.jikan.moe/v4/anime?page=5');
    const data = await response.json();
    
    // Iterar sobre los datos y agregar las imágenes al estado una por una o en lotes pequeños
    data.data.forEach((anime) => {
      // Actualizar el estado con cada imagen
      setAnimes((prevAnimes) => [...prevAnimes, anime]);
    });
  } catch (error) {
    console.error('Error fetching new animes:', error);
  }
};

  

  useEffect(() => {
    fetchNewAnimes();
  }, [searchTerm]);



  useEffect(() => {
    if (scores.length > 0) {
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
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [scores, average]);

  const handleArrowClick = (direction) => {
    if (direction === 'next') {
      fetchNewAnimes();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    afterChange: handleArrowClick,
  };

  return (
    <div>
      <h2>API Data Carousel</h2>
      <Slider {...settings}>
        {animes.map((item) => (
          <div key={item.mal_id}>
            <img src={item.images.jpg.image_url} alt={item.title} />
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
