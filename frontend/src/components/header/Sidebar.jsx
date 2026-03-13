import React from "react";
import { CONTACT } from "../../config/contact";
import { handleAnchorClick } from "../../hooks/useSmoothScroll";

const Sidebar = ({ open, onClose }) => {
  return (
    <div className={`sidemenu-wrapper sidemenu-info ${open ? "show" : ""}`}>
      <div className="sidemenu-content">
        <button
          className="closeButton sideMenuCls"
          onClick={onClose}
          aria-label="Fechar painel lateral"
        >
          <i className="fas fa-times" aria-hidden="true" />
        </button>
        <div className="widget">
          <div className="th-widget-about">
            <div className="about-logo">
              <a
                href="#inicio"
                onClick={(e) => handleAnchorClick(e, "inicio")}
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
  );
};

export default Sidebar;
