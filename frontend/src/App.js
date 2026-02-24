import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./elements/RouteScrollToTop";
import ScrollToTop from "react-scroll-to-top";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ErrorBoundary from "./components/ErrorBoundary";
import Preloader from "./elements/Preloader";

const HomeOne = lazy(() => import("./pages/HomeOne"));
const About = lazy(() => import("./pages/About"));
const Service = lazy(() => import("./pages/Service"));
const Project = lazy(() => import("./pages/Project"));
const Contact = lazy(() => import("./pages/Contact"));
const Error = lazy(() => import("./pages/Error"));

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RouteScrollToTop />
        <ScrollToTop smooth color="#196164" />
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route exact path="/" element={<HomeOne />} />
            <Route exact path="/sobre" element={<About />} />
            <Route exact path="/servicos" element={<Service />} />
            <Route exact path="/clientes" element={<Project />} />
            <Route exact path="/contato" element={<Contact />} />
            <Route exact path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <WhatsAppFloat />
    </ErrorBoundary>
  );
};

export default App;
