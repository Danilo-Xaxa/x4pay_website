import React, { useEffect, useState, useCallback } from "react";
import { CONTACT } from "../config/contact";
import useActiveSection from "../hooks/useActiveSection";
import { handleAnchorClick } from "../hooks/useSmoothScroll";
import Sidebar from "./header/Sidebar";
import MobileMenu from "./header/MobileMenu";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((e, sectionId) => {
    handleAnchorClick(e, sectionId);
    setMobileOpen(false);
  }, []);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
      />

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
                    aria-label="Abrir menu de navegação"
                    aria-expanded={mobileOpen}
                    aria-controls="offcanvas-navigation"
                  >
                    <i className="fas fa-bars" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="col-auto ms-xxl-4 d-xl-block d-none">
                <div className="header-wrapper">
                  <div className="header-button">
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="simple-icon sideMenuToggler d-none d-lg-block"
                      aria-label="Abrir informações de contato"
                    >
                      <img src="assets/img/icon/bars.svg" alt="Menu" />
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
