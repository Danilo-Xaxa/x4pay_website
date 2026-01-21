import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const TeamOne = () => {
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
  let settings = {
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
    <div className="team-area-1 space">
      <div className="container">
        <div className="row justify-content-center">
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

        <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/nasabank.png" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://nasabank.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">NasaBank</Link>
                </h4>
                <span className="team-card_desig">Cuiabá (MT)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/xulis.png" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://xulis.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">Xulis</Link>
                </h4>
                <span className="team-card_desig">Vitória (ES)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/ami.jpg" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="#" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">AMI</Link>
                </h4>
                <span className="team-card_desig">Goiânia (GO)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/payt2.png" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://www.payt.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">Payt</Link>
                </h4>
                <span className="team-card_desig">São Paulo (SP)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/superfin2.png" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://www.superfin.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">SuperFin</Link>
                </h4>
                <span className="team-card_desig">Marília (SP)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/spotpass.png" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://www.spotpass.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">SpotPass</Link>
                </h4>
                <span className="team-card_desig">Belo Horizonte (MG)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/grupojmb.png" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://grupojmb.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">Grupo JMB</Link>
                </h4>
                <span className="team-card_desig">Maceió (AL)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/dnapagamentos.png" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://dnapagamentos.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">DNA Pagamentos</Link>
                </h4>
                <span className="team-card_desig">Americana (SP)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/statuspay.png" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://statuspay.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">Status Pay</Link>
                </h4>
                <span className="team-card_desig">Maceió (AL)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/reflowpay.jpg" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://reflowpayments.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">Reflow Bank</Link>
                </h4>
                <span className="team-card_desig">Goiânia (GO)</span>
              </div>
            </div>
          </div>  

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/payzu2.jpg" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://payzu.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">PayZu</Link>
                </h4>
                <span className="team-card_desig">Teixeira de Freitas (BA)</span>
              </div>
            </div>
          </div> 

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/cashtime.png" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://www.cashtimepay.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">CashTime Pay</Link>
                </h4>
                <span className="team-card_desig">Cuiabá (MT)</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="team-card">
              <div className="team-card_wrapp">
                <div className="team-card_img">
                  <img src="assets/img/team/cartwave2.jpeg" alt="img" />
                </div>
                <div className="team-social">
                  <div className="plus-btn">
                    <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                  </div>
                  <div className="global-social">
                    <Link to="https://www.checkoutcartwave.com.br/" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                      <i className="far fa-eye" />
                    </Link>
                    <Link to="#">
                      <img src="assets/img/icon/angles-right.svg" alt="X4PAY Assessoria" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_content">
                <h4 className="team-card_title">
                  <Link to="#">CartWave</Link>
                </h4>
                <span className="team-card_desig">Cuiabá (MT)</span>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default TeamOne;
