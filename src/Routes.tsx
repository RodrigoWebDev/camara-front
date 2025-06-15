import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Register from './pages/register';
import Initial from './pages/initial';
import AccountVerification from './pages/accountVerification';
import DashboardLayout from './DashboardLayout';
import ServiceCatalog from './pages/serviceCatalog';
import Profile from './pages/Profile';
import Login from './pages/login';
import Manager from './pages/manager';
import Recover from './pages/recover';
import NewPassword from './pages/newPassword';
import NewService from './pages/newService';
import Solicitacion from './pages/solicitacion';
import PageError from './pages/pageError';
import ServicesManagement from './pages/servicesManagement';
import AttendantDashboard from './pages/attendantDashboard';
import AttendantService from './pages/attendantService';
import ServiceSolicitacion from './pages/serviceSolicitation';
import ServiceDetails from './pages/serviceDetails';
import AttendantServicesPage from './pages/attendantServicesPage';
import PermissionsPage from './pages/permissions';
import { useAuth } from './hooks/useAuth';
import Schedule from './pages/schedule'; // Agenda - Atendente e Gestor
import AttendantSchedule from './pages/attendantSchedule'; // Novo Agendamento - Atendente
import Schedules from './pages/schedules'; // Agendamentos - Cidadão
import SolicitacionDetails from './pages/solicitacionDetails';

type PrivateRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

type PublicOnlyRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const user = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.roleName ?? '')) {
    return <Navigate to="/nao-encontrado" replace />;
  }

  return <>{children}</>;
};

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const user = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/inicio" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function MyRoutes() {
  const roleName = localStorage.getItem('roleName') ?? undefined;

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth & Public routes */}
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/login"
          index
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/cadastro"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/recuperacao"
          element={
            <PublicOnlyRoute>
              <Recover />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/criar-nova-senha"
          element={
            <PublicOnlyRoute>
              <NewPassword />
            </PublicOnlyRoute>
          }
        />
        <Route path="/nao-encontrado" element={<PageError />} />

        {/* Cidadão - trocar allowedRoles depois para cidadao */}
        <Route
          element={
            <PrivateRoute allowedRoles={['cliente']}>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/inicio" index element={<Initial />} />
          <Route path="/catalogo-servicos" element={<ServiceCatalog />} />
          <Route path="/minhas-solicitacoes" element={<Solicitacion />} />
          <Route path="/agendamentos" element={<Schedules />} />
          <Route path="/verificacao-conta" element={<AccountVerification />} />
          <Route path="/detalhes-servico" element={<ServiceDetails />} />
          <Route
            path="/detalhes-solicitacao"
            element={<SolicitacionDetails />}
          />
          <Route path="/solicitacao/:name" element={<ServiceSolicitacion />} />
          <Route path="/dados-pessoais" element={<Profile />} />
        </Route>

        {/* Rotas comum entre Atendente e Gestor */}
        <Route
          element={
            <PrivateRoute allowedRoles={['administrador', 'atendente']}>
              <DashboardLayout role={roleName} />
            </PrivateRoute>
          }
        >
          <Route path="/agenda" element={<Schedule />} />
          <Route path="/detalhes-servicos" element={<ServiceDetails />} />
          <Route path="/atendimentos" element={<AttendantServicesPage />} />
          <Route path="/novo-atendimento" element={<AttendantService />} />
          <Route path="/novo-agendamento" element={<AttendantSchedule />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>

        {/* Atendente */}
        <Route
          element={
            <PrivateRoute allowedRoles={['atendente']}>
              <DashboardLayout role="atendente" />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<AttendantDashboard />} />
        </Route>

        {/* Gestor */}
        <Route
          element={
            <PrivateRoute allowedRoles={['administrador']}>
              <DashboardLayout role="administrador" />
            </PrivateRoute>
          }
        >
          <Route path="/dashboards" element={<Manager />} />
          <Route path="/novo-servico" element={<NewService />} />
          <Route path="/permissoes" element={<PermissionsPage />} />
          <Route path="/servicos" element={<ServicesManagement />} />
        </Route>

        {/* Redireciona em caso de não encontrar pagina */}
        <Route path="*" element={<Navigate to="/nao-encontrado" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
