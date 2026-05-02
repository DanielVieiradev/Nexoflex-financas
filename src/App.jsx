import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Pages/Home";
import Contato from "./Components/Pages/Contato";
import Empresa from "./Components/Pages/Empresa";
import Projetos from "./Components/Pages/Projetos";
import CriarProjeto from "./Components/Pages/CriarProjeto";
import Pricing from "./Components/Pages/Pricing";
import Checkout from "./Components/Pages/Checkout";
import Login from "./Components/Pages/Login";
import Container from "./shared/ui/layout/Container";
import Navbar from "./shared/ui/layout/Navbar";
import Footer from "./shared/ui/layout/Footer";
import EditarProjeto from "./Components/Pages/EditarProjeto";
import DetalhesProjeto from "./Components/Pages/DetalhesProjeto";
import DashboardBasico from "./Components/Pages/DashboardBasico";
import ProtectedRoute from "./shared/ui/layout/ProtectedRoute";

import CookieBanner from "./shared/ui/layout/CookieBanner";

function App() {
  return (
    <Router>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login isRegister={true} />} />
        </Routes>

        <Container customClass="min-height">
          <Routes>
            <Route path="/empresa" element={<Empresa />} />

            {/* Rotas Protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/Projetos" element={<Projetos />} />
              <Route path="/Projetos/Criar" element={<CriarProjeto />} />
              <Route path="/editar-projeto/:id" element={<EditarProjeto />} />
              <Route path="/projeto/:id" element={<DetalhesProjeto />} />
              <Route path="/dashboard" element={<DashboardBasico />} />
            </Route>
          </Routes>
        </Container>
      </main>

      <CookieBanner />
      <Footer />
    </Router>
  );
}

export default App;
