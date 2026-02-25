import React, { useState } from 'react';
import InputMask from "react-input-mask";
import { API_ENDPOINTS } from '../config/api';
import useScrollAnimation from "../hooks/useScrollAnimation";

const ContactInner = () => {
    const { ref, isVisible } = useScrollAnimation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [errors, setErrors] = useState({});

    const validate = (data) => {
        const newErrors = {};

        if (!data.name || data.name.trim().length < 2) {
            newErrors.name = "Nome deve ter pelo menos 2 caracteres.";
        } else if (data.name.trim().length > 100) {
            newErrors.name = "Nome deve ter no máximo 100 caracteres.";
        }

        if (!data.email || data.email.trim() === "") {
            newErrors.email = "E-mail é obrigatório.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
            newErrors.email = "E-mail inválido.";
        }

        if (data.phone && data.phone.trim() !== "") {
            const cleanPhone = data.phone.replace(/\D/g, '');
            if (cleanPhone.length !== 11) {
                newErrors.phone = "Telefone inválido. Use o formato (99) 99999-9999";
            }
        }

        if (data.message && data.message.trim().length > 1000) {
            newErrors.message = "Mensagem deve ter no máximo 1000 caracteres.";
        }

        return newErrors;
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: value
      }));

      if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: null
        }));
      }

      if (feedback) {
        setFeedback(null);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setFeedback(null);
      setErrors({});

      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }

      const processedData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() === "" ? null : formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
      };

      try {
          const response = await fetch(API_ENDPOINTS.contact, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(processedData)
          });

          if (response.ok) {
              setFeedback({ type: "success", message: "Mensagem enviada com sucesso! Entraremos em contato em breve." });
              setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
          } else {
              const errorData = await response.json().catch(() => null);
              const errorMessage = errorData?.detail || "Erro ao enviar mensagem. Verifique os dados e tente novamente.";
              setFeedback({ type: "error", message: errorMessage });
          }
      } catch (error) {
          setFeedback({ type: "error", message: "Erro de conexão. Tente novamente ou contate o suporte." });
      } finally {
          setIsLoading(false);
      }
    };

    return (
        <div className="space" ref={ref}>
            <div className="container">
                <div className={`row gy-40 justify-content-between fade-in-up${isVisible ? " visible" : ""}`}>
                    <div className="col-lg-4">
                        <div className="title-area mb-0">
                            <span className="sub-title">
                                <img src="assets/img/icon/title_left.svg" alt="shape" />
                                Entre em contato
                            </span>
                            <h2 className="sec-title style2">Solicite um orçamento!</h2>
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
                                        <label htmlFor="contact-name" className="visually-hidden">Nome</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            placeholder="Nome"
                                            className={`form-control style-border ${errors.name ? 'is-invalid' : ''}`}
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            aria-required="true"
                                            aria-describedby={errors.name ? "name-error" : undefined}
                                        />
                                        {errors.name && (
                                            <small id="name-error" className="text-danger">{errors.name}</small>
                                        )}
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="contact-email" className="visually-hidden">E-mail</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            placeholder="E-mail"
                                            className={`form-control style-border ${errors.email ? 'is-invalid' : ''}`}
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            aria-required="true"
                                            aria-describedby={errors.email ? "email-error" : undefined}
                                        />
                                        {errors.email && (
                                            <small id="email-error" className="text-danger">{errors.email}</small>
                                        )}
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="contact-phone" className="visually-hidden">Telefone</label>
                                        <InputMask
                                            id="contact-phone"
                                            mask="(99) 99999-9999"
                                            name="phone"
                                            placeholder="Telefone (opcional)"
                                            className={`form-control style-border ${errors.phone ? 'is-invalid' : ''}`}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            aria-describedby={errors.phone ? "phone-error" : undefined}
                                        />
                                        {errors.phone && (
                                            <small id="phone-error" className="text-danger">{errors.phone}</small>
                                        )}
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="subject" className="visually-hidden">Assunto</label>
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
                                        <label htmlFor="contact-message" className="visually-hidden">Mensagem</label>
                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            placeholder="Mensagem (opcional)"
                                            className={`form-control style-border ${errors.message ? 'is-invalid' : ''}`}
                                            value={formData.message}
                                            onChange={handleChange}
                                            aria-describedby={errors.message ? "message-error" : undefined}
                                        />
                                        {errors.message && (
                                            <small id="message-error" className="text-danger">{errors.message}</small>
                                        )}
                                    </div>
                                    <div className="col-12 form-group mb-0">
                                        <button type="submit" className="global-btn w-100" disabled={isLoading}>
                                            {isLoading ? "Enviando..." : "Enviar"}
                                            <img src="assets/img/icon/right-icon.svg" alt="X4PAY Assessoria" />
                                        </button>
                                    </div>
                                    {feedback && (
                                        <div className="col-12 mt-3">
                                            <div
                                                className={`alert ${feedback.type === "success" ? "alert-success" : "alert-danger"} text-center`}
                                                role="alert"
                                            >
                                                {feedback.message}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInner;
