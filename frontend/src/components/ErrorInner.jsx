import React from 'react'
import { Link } from 'react-router-dom'

const ErrorInner = () => {
    return (
        <section className="error-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="wrapper">
                            <div
                                className="img-file"

                            >
                                <img
                                    className="img-fluid"
                                    src="/assets/img/error.png"
                                    alt="X4PAY Assessoria"
                                />
                            </div>
                            <div className="text-file">
                                <h4 >
                                    Página não encontrada</h4>
                                <p >
                                    Desculpe, não encontramos esta página.
                                </p>
                            </div>
                            <div
                                className="d-adjust"
                            >
                                <Link className="global-btn" to="/">
                                    Voltar ao Início</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ErrorInner