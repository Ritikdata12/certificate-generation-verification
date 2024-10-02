import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import "./Companies.css";

const Companies = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 6, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="another">
    <div className="container-fluid">
      <h2 style={{ textAlign: 'center', padding: '20px', fontWeight: 'bold' , marginBottom: '40px' }}>
        OUR CLIENTS FOR NEWS
      </h2>
      <Slider {...settings} className="customer-logos">
        <div className="slide">
          <img src="https://w7.pngwing.com/pngs/328/427/png-transparent-india-zee-news-television-news-broadcasting-mitsubishi-television-text-trademark-thumbnail.png" alt="Client Logo 1" />
        </div>
       
        <div className="slide">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCsudND7b5btEWhadYA2CYPi6GOwlarV--w&s" alt="Client Logo 3" />
        </div>
        <div className="slide">
          <img src="https://inkbotdesign.com/wp-content/uploads/2024/06/cnn-logo-design-news-logos-1024x683.webp" alt="Client Logo 4" />
        </div>
        <div className="slide">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFt5fMjNvyX7p05JAulyQ_HEr2XeX0VvU6Gg&s" alt="Client Logo 5" />
        </div>
        <div className="slide">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ZwN6EM5drL62ZAalYwfTjDlxEkWfBJr58Q&s" alt="Client Logo 6" />
        </div>
        <div className="slide">
          <img src="https://image.freepik.com/free-vector/luxury-letter-e-logo-design_1017-8903.jpg" alt="Client Logo 7" />
        </div>
        <div className="slide">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJAF_DVdq460d1xSBx-zAPEXw6LmgadacWA&s" alt="Client Logo 8" />
        </div>
      
      </Slider>
    </div>
    </div>
  );
};

export default Companies;