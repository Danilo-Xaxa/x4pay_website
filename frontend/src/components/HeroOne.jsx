import React from "react";
import { handleAnchorClick } from "../hooks/useSmoothScroll";

const HeroOne = () => {
  return (
    <div
      className="hero-wrapper hero-1"
      id="hero"
      style={{
        background: "linear-gradient(135deg, #0B1D3A 0%, #1A3A6B 50%, #0B1D3A 100%)",
        position: "relative",
      }}
    >
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-6">
            <div className="hero-style1">
              <span className="sub-title" style={{ color: "#EA9010" }}>
                <img src="assets/img/icon/title_left.svg" alt="shape" />
                Seja subadquirente!
              </span>
              <h1 className="hero-title" style={{ color: "#ffffff" }}>
                Subadquirência sem complicação
              </h1>
              <p className="hero-text" style={{ color: "rgba(255,255,255,0.8)" }}>
                Estruturamos sua subadquirente, facilitando sua evolução no mercado de pagamentos com um processo eficiente e ágil.
              </p>
              <div className="btn-group">
                <a
                  href="#contato"
                  onClick={(e) => handleAnchorClick(e, "contato")}
                  className="global-btn style3"
                >
                  Entre em contato <img src="assets/img/icon/right-icon.svg" alt="X4PAY Assessoria" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="hero-image-wrapp">
              <div className="hero-thumb text-center">
                <img src="assets/img/hero/hero_thumb_1_1.png" alt="Consultoria especializada em subadquirência e pagamentos - X4PAY Assessoria" />
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
            <div
              className="hero-card"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
              }}
            >
              <div className="hero-card_icon">
                <img src="assets/img/icon/1.svg" alt="Ícone de subadquirência" />
              </div>
              <div className="hero-card_content">
                <h4 className="box-title" style={{ color: "#ffffff" }}>Subadquirência</h4>
                <p className="hero-card_text" style={{ color: "rgba(255,255,255,0.7)" }}>Com nossos especialistas</p>
              </div>
            </div>
            <div
              className="hero-card"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
              }}
            >
              <div className="hero-card_icon">
                <img src="assets/img/icon/2.svg" alt="Ícone de compliance" />
              </div>
              <div className="hero-card_content">
                <h4 className="box-title" style={{ color: "#ffffff" }}>Compliance</h4>
                <p className="hero-card_text" style={{ color: "rgba(255,255,255,0.7)" }}>Serviços completos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroOne;
