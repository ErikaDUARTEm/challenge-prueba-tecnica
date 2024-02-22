// AnimeSlider.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/style.css";

export const AnimeSlider = ({ loading, filteredAnimes }) => {
 

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: !loading,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1},`
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
      {filteredAnimes.map((anime) => (
          <div key={anime.mal_id}>
            <img src={anime.images?.jpg?.image_url} alt={anime.title} className='img-animes' />
            <h3>{anime.title}</h3>
            <p>{anime.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AnimeSlider;
