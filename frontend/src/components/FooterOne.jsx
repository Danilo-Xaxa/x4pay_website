import React from "react";
import { Link } from "react-router-dom";

const FooterOne = () => {
  return (
    <footer
      className="footer-wrapper footer-layout1"
      style={{ backgroundImage: "url(assets/img/bg/footer-bg1-1.png)" }}
    >
      <div className="container">
        <div className="widget-area">
          <div className="row justify-content-between">
            <div className="col-md-6 col-xl-5">
              <div className="widget footer-widget widget-about">
                <div className="about-logo">
                  <Link to="/">
                    <img src="assets/img/logo.svg" alt="X4PAY Assessoria" />
                  </Link>
                </div>
                <p className="footer-text mb-30">
                  X4PAY Assessoria | Conectando sua empresa ao futuro dos pagamentos. Simples, rápido e seguro.
                </p>
                <div className="social-btn style3">
                  <Link to="#" tabIndex={-1}>
                    <i className="fab fa-linkedin-in" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Links Úteis</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    <li>
                      <Link to="/sobre">Nossa Empresa</Link>
                    </li>
                    <li>
                      <Link to="/servicos">Nossos Serviços</Link>
                    </li>
                    <li>
                      <Link to="/contato">Entre em contato</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="widget footer-widget me-xl-3">
                <h3 className="widget_title">Contato</h3>
                <div className="widget-contact2">
                  <div className="widget-contact-grid">
                    <i className="fas fa-phone-alt" />
                    <div className="contact-grid-details">
                      <h6>
                        <Link to="#">(81) 98814-3087</Link> <br />
                        <Link to="#">(81) 98733-7747</Link>
                      </h6>
                    </div>
                  </div>
                  <div className="widget-contact-grid">
                    <i className="fas fa-envelope" />
                    <div className="contact-grid-details">
                      <h6>
                        <Link to="#">
                          contato@x4payassessoria.com
                        </Link>
                        <p />
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright-wrap">
          <div className="row gy-3 justify-content-lg-between justify-content-center">
            <div className="col-auto align-self-center">
              <p className="copyright-text text-center">
               © 2025 X4PAY Assessoria LTDA | CNPJ: 59.088.251/0001-12 | Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
