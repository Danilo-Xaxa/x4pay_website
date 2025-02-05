import React from 'react'
import { Link } from 'react-router-dom'
import InputMask from "react-input-mask";

const ContactInner = () => {
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
                                    Marcaremos uma entrevista preliminar para você conhecer melhor os nossos serviços e nós conhecermos melhor o seu negócio. Após isso, a nossa Proposta Comercial será enviada imediatamente para o seu e-mail!{" "}
                                </p>
                                <div className="social-btn style4">
                                    <Link to="https://www.linkedin.com/company/x4pay-assessoria/" target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                                        <i className="fab fa-linkedin-in" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-8">
                            <div className="contact-form">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input
                                            type="text"
                                            placeholder="Nome"
                                            className="form-control style-border"
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <input
                                            type="text"
                                            placeholder="E-mail"
                                            className="form-control style-border"
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <InputMask
                                            mask="(99) 99999-9999"
                                            placeholder="Telefone (opcional)"
                                            className="form-control style-border"
                                            alwaysShowMask={false}
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <select
                                            name="subject"
                                            id="subject"
                                            className="form-select style-border"
                                        >
                                            <option defaultValue={1}>
                                                Assunto (opcional)
                                            </option>
                                            <option value={1}>Subject 01</option>
                                            <option value={2}>Subject 02</option>
                                            <option value={3}>Subject 03</option>
                                        </select>
                                        <i className="fas fa-angle-down" />
                                    </div>
                                    <div className="col-12 form-group">
                                        <textarea
                                            placeholder="Mensagem (opcional)"
                                            className="form-control style-border"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="col-12 form-group mb-0">
                                        <button className="global-btn w-100">
                                            Enviar
                                            <img src="assets/img/icon/right-icon.svg" alt="X4PAY Assessoria" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ContactInner