import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Home from './pages/home';
import Register from './pages/register';
import Initial from './pages/initial';
import AccountVerification from './pages/accountVerification';
import DashboardLayout from './DashboardLayout';
import Profile from './pages/Profile';
import Login from './pages/login';
import Manager from './pages/manager';

function MyRoutes() {
  // Integrar Back
  const Logged = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* DashBoard */}
        <Route element={<DashboardLayout />}>
          <Route path="/inicio" index element={<Initial />} />
          <Route path="/perfil" element={<Profile />} />
          <Route
            path="/account-verification"
            element={<AccountVerification />}
          />
          <Route path="/gestor" element={<Manager />} />
        </Route>

        {/* Redireciona em caso de não encontrar pagina */}
        <Route path="*" element={<Navigate to={Logged ? '/inicio' : '/'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
