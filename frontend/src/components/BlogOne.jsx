import React from "react";
//import { Link } from "react-router-dom";
//import Slider from "react-slick";

const BlogOne = () => {
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
          <form className="newsletter-form">
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Seu e-mail"
                required=""
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
