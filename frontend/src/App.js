import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./elements/RouteScrollToTop";
import ScrollToTop from "react-scroll-to-top";
//import IndexPage from "./pages/IndexPage";
import HomeOne from "./pages/HomeOne";
//import HomeTwo from "./pages/HomeTwo";
//import HomeThree from "./pages/HomeThree";
//import HomeFour from "./pages/HomeFour";
//import HomeFive from "./pages/HomeFive";
import About from "./pages/About";
import Service from "./pages/Service";
//import ServiceDetails from "./pages/ServiceDetails";
import Project from "./pages/Project";
//import ProjectDetails from "./pages/ProjectDetails";
//import Blog from "./pages/Blog";
//import BlogDetails from "./pages/BlogDetails";
//import Pricing from "./pages/Pricing";
//import Team from "./pages/Team";
//import TeamDetails from "./pages/TeamDetails";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RouteScrollToTop />
        <ScrollToTop smooth color="#196164" />
        <Routes>
          <Route exact path="/" element={<HomeOne />} />
          <Route exact path="/sobre" element={<About />} />
          <Route exact path="/servicos" element={<Service />} />
          <Route exact path="/clientes" element={<Project />} />
          <Route exact path="/contato" element={<Contact />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
