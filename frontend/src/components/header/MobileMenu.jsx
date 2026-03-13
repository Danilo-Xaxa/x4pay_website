import React from "react";
import { handleAnchorClick } from "../../hooks/useSmoothScroll";

const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "clientes", label: "Clientes" },
  { id: "servicos", label: "Serviços" },
  { id: "faq", label: "FAQ" },
  { id: "contato", label: "Contato" },
];

const MobileMenu = ({ open, onClose, activeSection }) => {
  const handleNavClick = (e, sectionId) => {
    handleAnchorClick(e, sectionId);
    onClose();
  };

  return (
    <div className={`mobile-menu-wrapper ${open ? "body-visible" : ""}`}>
      <div className="mobile-menu-area">
        <div className="mobile-logo">
          <a href="#inicio" onClick={(e) => handleNavClick(e, "inicio")}>
            <img src="assets/img/logo.svg" alt="X4PAY Assessoria" />
          </a>
          <button
            className="menu-toggle"
            onClick={onClose}
            aria-label="Fechar menu de navegação"
          >
            <i className="fa fa-times" aria-hidden="true" />
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
  );
};

export default MobileMenu;
