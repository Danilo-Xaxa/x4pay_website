import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONTACT } from "../config/contact";

const HeaderOne = () => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenu = () => {
    setActive(!active);
  };

  const searchControl = (active) => {
    setSearch(active);
  };

  const sidebarControl = (active) => {
    setSidebar(active);
  };

  return (
    <>
      <div
        className={`sidemenu-wrapper sidemenu-info ${sidebar ? "show" : ""} `}
      >
        <div className="sidemenu-content">
          <button
            className="closeButton sideMenuCls"
            onClick={() => sidebarControl(false)}
          >
            <i className="fas fa-times" />
          </button>
          <div className="widget  ">
            <div className="th-widget-about">
              <div className="about-logo">
                <Link to="/">
                  <img src="assets/img/logo.svg" alt="X4PAY Assessoria" />
                </Link>
              </div>
              <br />
              <p className="about-text">
                Com a X4PAY Assessoria, sua empresa tem o suporte especializado para crescer e operar com segurança no setor de pagamentos.
                Nós oferecemos soluções completas para empresas que desejam atuar como subadquirentes.
              </p>
            </div>
          </div>
          <div className="side-info mb-30">
            <div className="contact-list mb-20">
              <h4>Telefone/WhatsApp</h4>
              {CONTACT.phones.map((p, i) => (
                <p key={p.raw} className={i === 0 ? "mb-0" : undefined}>{p.label}</p>
              ))}
            </div>
            <div className="contact-list mb-20">
              <h4>E-mail</h4>
              {CONTACT.emails.map((email, i) => (
                <p key={email} className={i === 0 ? "mb-0" : undefined}>{email}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`popup-search-box ${search === true ? "show" : ""} `}>
        <button className="searchClose" onClick={() => searchControl(false)}>
          <i className="fas fa-times" />
        </button>
        <form>
          <input type="text" placeholder="What are you looking for?" />
          <button type="submit">
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
      {/*==============================
    Mobile Menu
    ============================== */}
      <div className={`mobile-menu-wrapper ${active ? "body-visible" : ""}`}>
        <div className="mobile-menu-area">
          <div className="mobile-logo">
            <Link to="/">
              <img src="assets/img/logo.svg" alt="X4PAY Assessoria" />
            </Link>
            <button className="menu-toggle" onClick={mobileMenu}>
              <i className="fa fa-times" />
            </button>
          </div>
          <div className="mobile-menu">
            <ul id="offcanvas-navigation">
              <li className="menu-item-has-children submenu-item-has-children">
                <Link to="/">Início</Link> 
              </li>
              <li>
                <Link to="/contato">Contato</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Header Area */}

      <header className="nav-header header-layout1">
        <div className={`sticky-wrapper ${scroll && "sticky"}`}>
          {/* Main Menu Area */}
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="header-logo">
                  <Link to="/">
                    <img src="assets/img/logo.svg" alt="X4PAY Assessoria" />
                  </Link>
                </div>
              </div>
              <div className="col-auto ms-xl-auto">
                <nav className="main-menu d-none d-lg-inline-block">
                  <ul>
                    <li>
                      <Link to="/">Início</Link>
                    </li>
                    <li>
                      <Link to="/contato">Contato</Link>
                    </li>
                    <li>
                      <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Siga a X4PAY Assessoria no Instagram">
                        <i className="fab fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Siga a X4PAY Assessoria no LinkedIn">
                        <i className="fab fa-linkedin-in" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="navbar-right d-inline-flex d-lg-none">
                  <button
                    type="button"
                    className="menu-toggle icon-btn"
                    onClick={mobileMenu}
                  >
                    <i className="fas fa-bars" />
                  </button>
                </div>
              </div>
              <div className="col-auto ms-xxl-4 d-xl-block d-none">
                <div className="header-wrapper">
                  <div className="header-button">
                    <button
                      onClick={() => sidebarControl(true)}

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
