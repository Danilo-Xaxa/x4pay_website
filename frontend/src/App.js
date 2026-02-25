import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ErrorBoundary from "./components/ErrorBoundary";
import Preloader from "./elements/Preloader";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Error = lazy(() => import("./pages/Error"));

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop smooth color="#0B1D3A" />
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <WhatsAppFloat />
    </ErrorBoundary>
  );
};

export default App;
