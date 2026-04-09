import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VehicleProvider } from './context/VehicleContext';
import { LocationProvider } from './context/LocationContext';
import { Navbar } from './components/Navbar';
import { TopBanner } from './components/TopBanner';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <VehicleProvider>
        <LocationProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <TopBanner />
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home
                  seoTitle="Carros para Motoristas de Aplicativo"
                  heroTitle="Carros para Motoristas de Aplicativo"
                  heroDescription="Encontre o carro ideal para trabalhar como motorista de aplicativos."
                  initialFilters={['ALL']}
                />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/reservar"
                  element={
                    <Home
                      seoTitle="Reserve Agora"
                      heroTitle="Reserve Agora"
                      heroDescription="Reserve seu veículo agora mesmo. Assistência 24h."
                    />
                  }
                />

                <Route
                  path="/motorista-app"
                  element={
                    <Home
                      seoTitle="Carros para Motoristas de Aplicativo"
                      heroTitle="Carros para Motoristas de Aplicativo"
                      heroDescription="Encontre o carro ideal para trabalhar como motorista de aplicativos."
                      initialFilters={['X']}
                    />
                  }
                />

                <Route
                  path="/ofertas"
                  element={
                    <Home
                      seoTitle="Os melhores preços do mercado"
                      heroTitle="Os melhores preços do mercado"
                      heroDescription="Negocie condições exclusivas de desconto no aluguel do seu veículo!"
                    />
                  }
                />

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <footer className="bg-gray-900 text-white py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                  <p>&copy; {new Date().getFullYear()} Mobibi Aluguel de Carros. Todos os direitos reservados.</p>
                </div>
              </footer>
            </div>
          </Router>
        </LocationProvider>
      </VehicleProvider>
    </AuthProvider>
  );
};

export default App;