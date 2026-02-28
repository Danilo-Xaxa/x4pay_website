import React from "react";

const PaymentEcosystemSVG = () => {
  return (
    <svg
      className="ecosystem-svg"
      viewBox="0 0 520 520"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagrama do ecossistema de pagamentos: subadquirente conectando lojistas, adquirentes, bandeiras e registradoras"
      textRendering="optimizeLegibility"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA9010" />
          <stop offset="100%" stopColor="#F4C260" />
        </linearGradient>

        <linearGradient id="hubRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA9010" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F4C260" stopOpacity="0.2" />
        </linearGradient>

        <radialGradient id="nodeHoverGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EA9010" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#EA9010" stopOpacity="0" />
        </radialGradient>

        <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      {/* ===== CAMADA 1: Fundo decorativo ===== */}
      <circle cx="260" cy="260" r="252" fill="rgba(255,255,255,0.015)" />

      {/* ===== CAMADA 2: Aneis orbitais ===== */}
      <circle
        className="ecosystem-orbit"
        cx="260" cy="260" r="160"
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
        strokeDasharray="3 16"
      />
      <circle
        cx="260" cy="260" r="115"
        fill="none"
        stroke="rgba(255,255,255,0.025)"
        strokeWidth="0.5"
      />

      {/* ===== CAMADA 3: Glow das conexoes ===== */}
      <g filter="url(#softGlow)" opacity="0.35">
        <line x1="300" y1="220" x2="345" y2="175" stroke="#EA9010" strokeWidth="4" />
        <line x1="300" y1="300" x2="345" y2="345" stroke="#EA9010" strokeWidth="4" />
        <line x1="220" y1="300" x2="175" y2="345" stroke="#EA9010" strokeWidth="4" />
        <line x1="220" y1="220" x2="175" y2="175" stroke="#EA9010" strokeWidth="4" />
      </g>

      {/* Linhas de conexao animadas */}
      <line className="ecosystem-connection" x1="300" y1="220" x2="345" y2="175"
        stroke="#EA9010" strokeWidth="1.5" strokeOpacity="0.6" />
      <line className="ecosystem-connection" x1="300" y1="300" x2="345" y2="345"
        stroke="#EA9010" strokeWidth="1.5" strokeOpacity="0.6" />
      <line className="ecosystem-connection" x1="220" y1="300" x2="175" y2="345"
        stroke="#EA9010" strokeWidth="1.5" strokeOpacity="0.6" />
      <line className="ecosystem-connection" x1="220" y1="220" x2="175" y2="175"
        stroke="#EA9010" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* ===== CAMADA 4: Pontos decorativos ===== */}
      <circle className="ecosystem-dot ecosystem-dot--1" cx="195" cy="115" r="2.5" fill="#EA9010" fillOpacity="0.35" />
      <circle className="ecosystem-dot ecosystem-dot--2" cx="390" cy="275" r="2" fill="#EA9010" fillOpacity="0.25" />
      <circle className="ecosystem-dot ecosystem-dot--3" cx="135" cy="295" r="1.5" fill="white" fillOpacity="0.15" />
      <circle className="ecosystem-dot ecosystem-dot--4" cx="345" cy="425" r="2" fill="#EA9010" fillOpacity="0.25" />
      <circle className="ecosystem-dot ecosystem-dot--1" cx="105" cy="210" r="1.5" fill="white" fillOpacity="0.1" />
      <circle className="ecosystem-dot ecosystem-dot--3" cx="415" cy="155" r="1.5" fill="white" fillOpacity="0.1" />

      {/* ===== CAMADA 5: Nos satelites ===== */}

      {/* --- Lojistas (top-left) --- */}
      <g className="ecosystem-node ecosystem-node--1">
        <circle className="ecosystem-node__outer" cx="147" cy="147" r="44" />
        <circle className="ecosystem-node__inner" cx="147" cy="147" r="31" />
        <g className="ecosystem-node__icon" transform="translate(147, 145)">
          <path d="M-13,-2 L-9,-11 L9,-11 L13,-2Z" />
          <path d="M-13,-2 L-13,12 L13,12 L13,-2" />
          <line x1="-13" y1="-2" x2="13" y2="-2" />
          <path d="M-4,12 L-4,4 L4,4 L4,12" />
        </g>
        <text className="ecosystem-label" x="147" y="204" textAnchor="middle">Lojistas</text>
      </g>

      {/* --- Adquirentes (top-right) --- */}
      <g className="ecosystem-node ecosystem-node--2">
        <circle className="ecosystem-node__outer" cx="373" cy="147" r="44" />
        <circle className="ecosystem-node__inner" cx="373" cy="147" r="31" />
        <g className="ecosystem-node__icon" transform="translate(373, 147)">
          <path d="M0,-13 L-14,-4 L14,-4Z" />
          <line x1="-14" y1="-4" x2="14" y2="-4" />
          <line x1="-9" y1="-4" x2="-9" y2="8" />
          <line x1="-3" y1="-4" x2="-3" y2="8" />
          <line x1="3" y1="-4" x2="3" y2="8" />
          <line x1="9" y1="-4" x2="9" y2="8" />
          <line x1="-14" y1="8" x2="14" y2="8" />
          <line x1="-15" y1="12" x2="15" y2="12" />
        </g>
        <text className="ecosystem-label" x="373" y="204" textAnchor="middle">Adquirentes</text>
      </g>

      {/* --- Bandeiras (bottom-right) --- */}
      <g className="ecosystem-node ecosystem-node--3">
        <circle className="ecosystem-node__outer" cx="373" cy="373" r="44" />
        <circle className="ecosystem-node__inner" cx="373" cy="373" r="31" />
        <g className="ecosystem-node__icon" transform="translate(373, 373)">
          <rect x="-14" y="-10" width="28" height="20" rx="3" />
          <line x1="-14" y1="-3" x2="14" y2="-3" />
          <rect x="-9" y="1" width="7" height="5" rx="1" />
        </g>
        <text className="ecosystem-label" x="373" y="430" textAnchor="middle">Bandeiras</text>
      </g>

      {/* --- Registradoras (bottom-left) --- */}
      <g className="ecosystem-node ecosystem-node--4">
        <circle className="ecosystem-node__outer" cx="147" cy="373" r="44" />
        <circle className="ecosystem-node__inner" cx="147" cy="373" r="31" />
        <g className="ecosystem-node__icon" transform="translate(147, 373)">
          <path d="M-9,-13 L5,-13 L11,-7 L11,13 L-9,13Z" />
          <path d="M5,-13 L5,-7 L11,-7" />
          <line x1="-4" y1="-2" x2="6" y2="-2" />
          <line x1="-4" y1="3" x2="6" y2="3" />
          <line x1="-4" y1="8" x2="2" y2="8" />
        </g>
        <text className="ecosystem-label" x="147" y="430" textAnchor="middle">Registradoras</text>
      </g>

      {/* ===== CAMADA 6: Hub central ===== */}
      <g className="ecosystem-hub">
        {/* Anel externo */}
        <circle
          cx="260" cy="260" r="62"
          fill="none"
          stroke="url(#hubRingGradient)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* Glow de fundo */}
        <circle cx="260" cy="260" r="54" fill="#EA9010" fillOpacity="0.06" />

        {/* Circulo principal */}
        <circle
          className="ecosystem-hub__circle"
          cx="260" cy="260" r="48"
          fill="url(#hubGradient)"
          filter="url(#hubGlow)"
        />

        {/* Icone de rede */}
        <g transform="translate(260, 257)">
          <circle cx="0" cy="0" r="5" fill="white" />
          <circle cx="-15" cy="-11" r="3" fill="white" />
          <circle cx="15" cy="-11" r="3" fill="white" />
          <circle cx="-17" cy="8" r="3" fill="white" />
          <circle cx="17" cy="8" r="3" fill="white" />
          <circle cx="0" cy="17" r="3" fill="white" />
          <line x1="0" y1="0" x2="-15" y2="-11" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="0" y1="0" x2="15" y2="-11" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="0" y1="0" x2="-17" y2="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="0" y1="0" x2="17" y2="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="0" y1="0" x2="0" y2="17" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
          {/* Conexoes externas entre nos */}
          <line x1="-15" y1="-11" x2="15" y2="-11" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" />
          <line x1="15" y1="-11" x2="17" y2="8" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" />
          <line x1="17" y1="8" x2="0" y2="17" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" />
          <line x1="0" y1="17" x2="-17" y2="8" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" />
          <line x1="-17" y1="8" x2="-15" y2="-11" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" />
        </g>

        {/* Label */}
        <text
          className="ecosystem-hub__label"
          x="260" y="325"
          textAnchor="middle"
        >
          Subadquirente
        </text>
      </g>
    </svg>
  );
};

export default PaymentEcosystemSVG;
