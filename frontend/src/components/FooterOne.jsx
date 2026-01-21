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
                  A X4PAY Assessoria conecta sua empresa ao futuro do mercado de pagamentos.
                </p>
                <div className="social-btn style3">
                  <Link to="https://www.instagram.com/x4pay_assessoria/" target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                    <i className="fab fa-instagram" />
                  </Link>
                  <Link to="https://www.linkedin.com/company/x4pay-assessoria/" target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                    <i className="fab fa-linkedin-in" />
                  </Link>
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
                        <Link to="mailto:contato@x4payassessoria.com">contato@x4payassessoria.com</Link> <br />
                        <Link to="mailto:xaxa@x4payassessoria.com">xaxa@x4payassessoria.com</Link>
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
               © 2026 X4PAY Assessoria LTDA | CNPJ: 59.088.251/0001-12 | Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
