import React, { useEffect, useState, useCallback } from "react";
import { CONTACT } from "../config/contact";
import useActiveSection from "../hooks/useActiveSection";
import { handleAnchorClick } from "../hooks/useSmoothScroll";

const SECTION_IDS = ["inicio", "clientes", "servicos", "faq", "contato"];

const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "clientes", label: "Clientes" },
  { id: "servicos", label: "Serviços" },
  { id: "faq", label: "FAQ" },
  { id: "contato", label: "Contato" },
];

const HeaderOne = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e, sectionId) => {
      handleAnchorClick(e, sectionId);
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* Sidebar Info Panel */}
      <div
        className={`sidemenu-wrapper sidemenu-info ${sidebar ? "show" : ""}`}
      >
        <div className="sidemenu-content">
          <button
            className="closeButton sideMenuCls"
            onClick={() => setSidebar(false)}
          >
            <i className="fas fa-times" />
          </button>
          <div className="widget">
            <div className="th-widget-about">
              <div className="about-logo">
                <a
                  href="#inicio"
                  onClick={(e) => handleNavClick(e, "inicio")}
                >
                  <img src="assets/img/logo.svg" alt="X4PAY Assessoria" />
                </a>
              </div>
              <br />
              <p className="about-text">
                Com a X4PAY Assessoria, sua empresa tem o suporte especializado
                para crescer e operar com segurança no setor de pagamentos. Nós
                oferecemos soluções completas para empresas que desejam atuar
                como subadquirentes.
              </p>
            </div>
          </div>
          <div className="side-info mb-30">
            <div className="contact-list mb-20">
              <h4>Telefone/WhatsApp</h4>
              {CONTACT.phones.map((p, i) => (
                <p key={p.raw} className={i === 0 ? "mb-0" : undefined}>
                  {p.label}
                </p>
              ))}
            </div>
            <div className="contact-list mb-20">
              <h4>E-mail</h4>
              {CONTACT.emails.map((email, i) => (
                <p key={email} className={i === 0 ? "mb-0" : undefined}>
                  {email}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu-wrapper ${mobileOpen ? "body-visible" : ""}`}>
        <div className="mobile-menu-area">
          <div className="mobile-logo">
            <a href="#inicio" onClick={(e) => handleNavClick(e, "inicio")}>
              <img src="assets/img/logo.svg" alt="X4PAY Assessoria" />
            </a>
            <button className="menu-toggle" onClick={() => setMobileOpen(false)}>
              <i className="fa fa-times" />
            </button>
          </div>
          <div className="mobile-menu">
            <ul id="offcanvas-navigation">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={activeSection === item.id ? "active" : ""}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="nav-header header-layout1">
        <div className={`sticky-wrapper ${scrolled ? "sticky" : ""}`}>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="header-logo">
                  <a
                    href="#inicio"
                    onClick={(e) => handleNavClick(e, "inicio")}
                  >
                    <img src="assets/img/logo.svg" alt="X4PAY Assessoria" />
                  </a>
                </div>
              </div>
              <div className="col-auto ms-xl-auto">
                <nav className="main-menu d-none d-lg-inline-block">
                  <ul>
                    {NAV_ITEMS.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => handleNavClick(e, item.id)}
                          className={activeSection === item.id ? "active" : ""}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href={CONTACT.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Siga a X4PAY Assessoria no Instagram"
                      >
                        <i className="fab fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={CONTACT.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Siga a X4PAY Assessoria no LinkedIn"
                      >
                        <i className="fab fa-linkedin-in" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="navbar-right d-inline-flex d-lg-none">
                  <button
                    type="button"
                    className="menu-toggle icon-btn"
                    onClick={() => setMobileOpen(true)}
                  >
                    <i className="fas fa-bars" />
                  </button>
                </div>
              </div>
              <div className="col-auto ms-xxl-4 d-xl-block d-none">
                <div className="header-wrapper">
                  <div className="header-button">
                    <button
                      onClick={() => setSidebar(true)}
                      className="simple-icon sideMenuToggler d-none d-lg-block"
                    >
                      <img src="assets/img/icon/bars.svg" alt="X4PAY Assessoria" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderOne;
