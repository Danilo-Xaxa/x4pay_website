import React, { useState } from "react";
import { API_ENDPOINTS } from '../config/api';
import './EmailCapture.css';

/**
 * EmailCapture Component
 * Reusable email capture form for newsletter/contact purposes
 * Consolidates Newsletter.jsx and BlogOne.jsx functionality
 */
const EmailCapture = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success", "error", ou null

  const handleChange = (e) => {
    setEmail(e.target.value);
    setStatus(null); // Permite enviar novamente se o usuário modificar o e-mail
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch(API_ENDPOINTS.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: null,
          email: email,
          phone: null,
          subject: null,
          message: null
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail(""); // Limpa o campo após envio
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="footer-top-1 bg-theme">
        <div className="footer-top-content">
          <h3 className="footer-top-title text-white">Entre em contato</h3>
          <p className="footer-top-text">
            Sua empresa está apenas a um clique de distância dessa evolução
          </p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Seu e-mail"
              required
              value={email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`global-btn ${status === "success" ? "success" : status === "error" ? "error" : ""}`}
              disabled={isLoading}
            >
              {status === "success"
                ? "Enviado!"
                : status === "error"
                ? "Erro."
                : isLoading
                ? "Enviando..."
                : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailCapture;
