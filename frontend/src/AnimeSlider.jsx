// AnimeSlider.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/style.css";
import { Loading } from "./Loading";

export const AnimeSlider = ({ loading, filteredAnimes, averageData }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: !loading,
    afterChange: function (index) {
      console.log(`Slider Changed to: ${index + 1},`);
    },
    responsive: [
      {
        breakpoint: 1024,
          settings: {
            mobileFirst: true,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 5,
            centerMode: false,
            variableWidth: true,
            focusOnSelect: true
          }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
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

  console.log('average de Slider ', averageData)

  return (
    <div className="slider-container">
   
     <Slider {...settings}>
      {filteredAnimes.map((anime) => {
        return (
          <div key={anime.mal_id} className="container-cards">
            <div className="card">
              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                className="img-animes"
              />
              <h3>{anime.title}</h3>
             {averageData &&
                averageData.puntajesPromedio &&
                averageData.clasificaciones &&
                averageData.puntajesPromedio[anime.title] && (
                  <p>{averageData.clasificaciones[anime.title]}</p>
                )}
            </div>
          </div>
        );
      })}
    </Slider>
    </div>
  );
};

export default AnimeSlider;
