import React from "react";
import { handleAnchorClick } from "../hooks/useSmoothScroll";
import useScrollAnimation from "../hooks/useScrollAnimation";
import PaymentEcosystemSVG from "./PaymentEcosystemSVG";

const HeroOne = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      className="hero-wrapper hero-1"
      id="hero"
      style={{
        background: "linear-gradient(135deg, #0B1D3A 0%, #122B54 40%, #1A3A6B 60%, #0B1D3A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <div className="hero-bg-decoration">
        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="container" ref={ref}>
        <div className="row align-items-center">
          <div className="col-xl-6">
            <div className={`hero-style1 fade-in-up${isVisible ? " visible" : ""}`}>
              <span className="hero-badge">
                <span className="hero-badge__dot" />
                Assessoria em Subadquirência
              </span>
              <h1 className="hero-title" style={{ color: "#ffffff" }}>
                Subadquirência
                <span className="hero-title__accent"> sem complicação</span>
              </h1>
              <p className="hero-text" style={{ color: "rgba(255,255,255,0.75)" }}>
                Estruturamos sua subadquirente de ponta a ponta, facilitando sua evolução no mercado de pagamentos com um processo eficiente e ágil.
              </p>
              <div className="btn-group hero-btn-group">
                <a
                  href="#contato"
                  onClick={(e) => handleAnchorClick(e, "contato")}
                  className="global-btn style3"
                >
                  Entre em contato
                  <img src="assets/img/icon/right-icon.svg" alt="X4PAY Assessoria" />
                </a>
                <a
                  href="#servicos"
                  onClick={(e) => handleAnchorClick(e, "servicos")}
                  className="global-btn style-border3"
                >
                  Nossos serviços
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className={`hero-image-wrapp fade-in-up delay-2${isVisible ? " visible" : ""}`}>
              <div className="hero-thumb text-center">
                <PaymentEcosystemSVG />
              </div>
              <div className="hero-shape1" />
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className={`hero-features fade-in-up delay-3${isVisible ? " visible" : ""}`}>
          <div className="row g-3 g-lg-4">
            <div className="col-sm-6 col-lg-3">
              <div className="hero-feature-card">
                <div className="hero-feature-card__icon">
                  <i className="fas fa-handshake" />
                </div>
                <div className="hero-feature-card__content">
                  <h4>Adquirentes</h4>
                  <p>Negociação e contratos</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="hero-feature-card">
                <div className="hero-feature-card__icon">
                  <i className="fas fa-credit-card" />
                </div>
                <div className="hero-feature-card__content">
                  <h4>Bandeiras</h4>
                  <p>Visa, Master, Elo, Amex</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="hero-feature-card">
                <div className="hero-feature-card__icon">
                  <i className="fas fa-file-contract" />
                </div>
                <div className="hero-feature-card__content">
                  <h4>Registradoras</h4>
                  <p>B3, CERC e Núclea</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="hero-feature-card">
                <div className="hero-feature-card__icon">
                  <i className="fas fa-cogs" />
                </div>
                <div className="hero-feature-card__content">
                  <h4>Softwares</h4>
                  <p>Captura e processamento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroOne;
