import React from "react";
import { Link } from "react-router-dom";

const HeroOne = () => {
  return (
    <div
      className="hero-wrapper bg-smoke hero-1"
      id="hero"
      style={{ backgroundImage: "url(assets/img/hero/hero_bg_1_1.png)" }}
    >
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-6">
            <div className="hero-style1">
              <span className="sub-title">
                <img src="assets/img/icon/title_left.svg" alt="shape" />
                Simples, rápido e seguro
              </span>
              <h1 className="hero-title">
                Subadquirência sem complicação 
              </h1>
              <p className="hero-text">
                Facilitamos sua evolução no mercado de pagamentos com um processo eficiente e ágil
              </p>
              <div className="btn-group">
                <Link to="/contato" className="global-btn">
                  Entre em contato <img src="assets/img/icon/right-icon.svg" alt="X4PAY Assessoria" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="hero-image-wrapp">
              <div className="hero-thumb text-center">
                <img src="assets/img/hero/hero_thumb_1_1.png" alt="img" />
              </div>
              <div className="hero-shape1" />
              <div className="hero-shape2" />
              <div className="hero-shape3" />
              <div className="hero-shape4" />
              <div className="hero-shape5 spin" />
            </div>
          </div>
        </div>
        <div className="hero-item-content">
          <div className="hero-card_wrapper">
            <div className="hero-card">
              <div className="hero-card_icon">
                <img src="assets/img/icon/1.svg" alt="img" />
              </div>
              <div className="hero-card_content">
                <h4 className="box-title">Subadquirência</h4>
                <p className="hero-card_text">Com nossos especialistas</p>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card_icon">
                <img src="assets/img/icon/2.svg" alt="img" />
              </div>
              <div className="hero-card_content">
                <h4 className="box-title">Compliance</h4>
                <p className="hero-card_text">Serviços completos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroOne;
