import React from 'react';
import useScrollAnimation from "../hooks/useScrollAnimation";

const TABS = [
  {
    id: "nav-step1",
    label: "Adquirentes",
    active: false,
    items: [
      {
        title: "Negociação de condições comerciais",
        subtitle: "Adiq, Cielo, GetNet, Rede, SafraPay e outros",
        checks: ["Melhores taxas do mercado", "Contratos personalizados"],
      },
      {
        title: "Integração técnica",
        subtitle: "APIs e protocolos de comunicação",
        checks: ["Homologação completa", "Suporte na certificação"],
      },
    ],
  },
  {
    id: "nav-step2",
    label: "Bandeiras",
    active: false,
    items: [
      {
        title: "Arranjo de Pagamentos",
        subtitle: "Visa, Mastercard, Elo e American Express",
        checks: ["Registro junto às bandeiras", "Compliance regulatório"],
      },
      {
        title: "Certificação e homologação",
        subtitle: "Processos de adequação",
        checks: ["PCI-DSS", "Padrões de segurança"],
      },
    ],
  },
  {
    id: "nav-step3",
    label: "Registradoras",
    active: true,
    items: [
      {
        title: "Contratos com registradoras",
        subtitle: "B3, CERC e Núclea",
        checks: ["Registro de recebíveis", "Interoperabilidade"],
      },
      {
        title: "Adequação regulatória",
        subtitle: "Conformidade com o Banco Central",
        checks: ["Agenda de recebíveis", "Gravame e cessão"],
      },
    ],
  },
  {
    id: "nav-step4",
    label: "Softwares",
    active: false,
    items: [
      {
        title: "Captura e processamento",
        subtitle: "Soluções de tecnologia para pagamentos",
        checks: ["Gateway de pagamentos", "Processamento de transações"],
      },
      {
        title: "Liquidação financeira",
        subtitle: "Sistemas de split e conciliação",
        checks: ["Split de pagamentos", "Conciliação automatizada"],
      },
    ],
  },
];

const GoalArea = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="goal-area space" ref={ref}>
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-6">
            <div className={`title-area fade-in-up${isVisible ? " visible" : ""}`}>
              <span className="sub-title">
                <img src="assets/img/icon/title_left.svg" alt="shape" />
                Nossos serviços
              </span>
              <h2 className="sec-title style2">Parceiros para o sucesso da sua operação</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="goal-title-area">
              <p>
                Atuamos em todas as frentes necessárias para estruturar sua
                subadquirente de ponta a ponta, com agilidade e expertise.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="goal-tabs-wrapper">
            <div
              className="nav nav-tabs goal-tabs-tabs"
              id="nav-tab"
              role="tablist"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`nav-link${tab.active ? " active" : ""}`}
                  id={`${tab.id}-tab`}
                  data-bs-toggle="tab"
                  data-bs-target={`#${tab.id}`}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="tab-content" id="nav-tabContent">
              {TABS.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab-pane fade${tab.active ? " active show" : ""}`}
                  id={tab.id}
                  role="tabpanel"
                >
                  <div className="goal-list_wrapper">
                    {tab.items.map((item, idx) => (
                      <div className="goal-content_wrapp" key={idx}>
                        <img src="assets/img/icon/angles-left.svg" alt="X4PAY Assessoria" />
                        <div className="goal-content">
                          <h4 className="box-title">{item.title}</h4>
                          <p>{item.subtitle}</p>
                          <div className="checklist">
                            <ul>
                              {item.checks.map((check, ci) => (
                                <li key={ci}>
                                  <i className="fas fa-check" />
                                  {check}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalArea;
