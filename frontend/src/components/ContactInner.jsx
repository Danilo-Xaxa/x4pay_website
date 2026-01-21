import React, { useState } from 'react';
import InputMask from "react-input-mask";

const ContactInner = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    // Manipular mudanças nos inputs
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: value // Agora permite espaços corretamente
      }));
    };

    // Enviar os dados do formulário para o backend
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setFeedback(null);

      // Ajusta os valores antes do envio (trim apenas aqui)
      const processedData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() === "" ? null : formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
      };

      try {
          const response = await fetch("https://x4paywebsite-production.up.railway.app/contact", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(processedData)
          });

          if (response.ok) {
              setFeedback("Mensagem enviada com sucesso!");
              setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
          } else {
              setFeedback("Erro ao enviar mensagem. Tente novamente.");
          }
      } catch (error) {
          setFeedback("Erro de conexão. Verifique sua internet.");
      } finally {
          setIsLoading(false);
      }
    };

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="space-bottom">
                <div className="container">
                    <div className="row gy-40 justify-content-between">
                        <div className="col-lg-4">
                            <div className="title-area mb-0">
                                <span className="sub-title">
                                    <img src="assets/img/icon/title_left.svg" alt="shape" />
                                    Entre em contato
                                </span>
                                <h2 className="sec-title style2">Receba nossa proposta!</h2>
                                <p className="mb-40">
                                    Marcaremos uma entrevista preliminar para você conhecer melhor os nossos serviços e nós conhecermos melhor o seu negócio. Após isso, a nossa Proposta Comercial será enviada imediatamente para o seu e-mail.
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-8">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Nome"
                                                className="form-control style-border"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="E-mail"
                                                className="form-control style-border"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                name="phone"
                                                placeholder="Telefone (opcional)"
                                                className="form-control style-border"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <select
                                                name="subject"
                                                id="subject"
                                                className="form-select style-border"
                                                value={formData.subject}
                                                onChange={handleChange}
                                            >
                                                <option value="">Assunto (opcional)</option>
                                                <option value="Subadquirência">Subadquirência</option>
                                                <option value="Compliance">Compliance</option>
                                                <option value="Outros Assuntos">Outros Assuntos</option>
                                            </select>
                                        </div>
                                        <div className="col-12 form-group">
                                            <textarea
                                                name="message"
                                                placeholder="Mensagem (opcional)"
                                                className="form-control style-border"
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-12 form-group mb-0">
                                            <button type="submit" className="global-btn w-100" disabled={isLoading}>
                                                {isLoading ? "Enviando..." : "Enviar"}
                                                <img src="assets/img/icon/right-icon.svg" alt="X4PAY Assessoria" />
                                            </button>
                                        </div>
                                        {feedback && (
                                            <div className="col-12 mt-3">
                                                <p className="text-center" style={{ color: feedback.includes("Erro") ? "red" : "green" }}>
                                                    {feedback}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactInner;