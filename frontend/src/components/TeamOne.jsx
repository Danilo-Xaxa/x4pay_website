import React from "react";
import Slider from "react-slick";
import clientsData from "../data/clients.json";
import useScrollAnimation from "../hooks/useScrollAnimation";

const TeamOne = () => {
  const { ref, isVisible } = useScrollAnimation();
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="TeamOne-icon-box-next">
        <button
          onClick={onClick}
          className="slick-arrow style2 default team-slider2-next"
        >
          <i className="fas fa-arrow-right" />
        </button>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="TeamOne-icon-box-prev">
        <button
          onClick={onClick}
          className="team-slider2 slick-arrow style2 default team-slider2-prev"
        >
          <i className="fas fa-arrow-left" />
        </button>
      </div>
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="team-area-1 space" ref={ref}>
      <div className="container">
        <div className={`row justify-content-center fade-in-up${isVisible ? " visible" : ""}`}>
          <div className="col-xl-6">
            <div className="title-area text-center">
              <span className="sub-title">
                <img src="assets/img/icon/title_left.svg" alt="shape" />
                Subaquirentes em operação
              </span>
              <h2 className="sec-title">
                Alguns de nossos clientes{" "}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-30 global-carousel team-slider2">
        <Slider {...settings}>
          {clientsData.map((client) => (
            <div className="p-2" key={client.id}>
              <div className="team-card">
                <div className="team-card_wrapp">
                  <div className="team-card_img">
                    <img src={client.image} alt={client.name} />
                  </div>
                  <div className="team-social">
                    <div className="plus-btn">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </div>
                    <div className="global-social">
                      <a href={client.website} target="_blank" rel="noopener noreferrer">
                        <i className="far fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-card_content">
                  <h4 className="team-card_title">
                    <a href={client.website} target="_blank" rel="noopener noreferrer">
                      {client.name}
                    </a>
                  </h4>
                  <span className="team-card_desig">{client.location}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TeamOne;
