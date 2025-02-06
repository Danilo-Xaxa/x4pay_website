import React, { useState } from "react";

const BlogOne = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      const response = await fetch("https://x4paywebsite-production.up.railway.app/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "-",  // Nome genérico
          email: email,
          phone: null,  // Sem telefone
          message: "Contato via formulário simplificado.",
        }),
      });

      if (response.ok) {
        alert("Mensagem enviada com sucesso!");
        setEmail(""); // Limpa o campo após envio
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar contato:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="footer-top-1 bg-theme">
          <div className="footer-top-content">
            <h3 className="footer-top-title text-white">Contate-nos</h3>
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="global-btn">
                Enviar
                <span className="icon">
                  <i className="fa-sharp fas fa-paper-plane ms-2" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogOne;
