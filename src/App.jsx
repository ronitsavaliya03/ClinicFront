import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LoginPage from './pages/Login';
import { AuthProvider } from './context/AuthProvider';
import Appointments from './pages/Appointments';
import Prescription from './pages/Prescription';
import MyPrescription from './pages/MyPrescription';
import DoctorQueue from './pages/Doctor';
import Report from './pages/Report';
import Queue from './pages/Queue';
import Reports from './pages/Reports';
import Users from './pages/Users';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute allowRoles={["admin", "doctor", "receptionist", "patient"]}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            {/* Admin */}
            <Route
              path="admin"
              element={
                <ProtectedRoute allowRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute allowRoles={["admin"]}>
                  <Users />
                </ProtectedRoute>
              }
            />

            {/* Patient */}
            <Route
              path="appointments"
              element={
                <ProtectedRoute allowRoles={["patient"]}>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="prescriptions"
              element={
                <ProtectedRoute allowRoles={["patient"]}>
                  <MyPrescription />
                </ProtectedRoute>
              }
            />
            <Route
              path="reports"
              element={
                <ProtectedRoute allowRoles={["patient"]}>
                  <Reports />
                </ProtectedRoute>
              }
            />

            {/* Doctor */}
            <Route
              path="doctor-queue"
              element={
                <ProtectedRoute allowRoles={["doctor"]}>
                  <DoctorQueue />
                </ProtectedRoute>
              }
            />
            <Route
              path="prescriptions/:appointmentId"
              element={
                <ProtectedRoute allowRoles={["doctor"]}>
                  <Prescription />
                </ProtectedRoute>
              }
            />
            <Route
              path="report/:appointmentId"
              element={
                <ProtectedRoute allowRoles={["doctor"]}>
                  <Report />
                </ProtectedRoute>
              }
            />

            {/* Receptionist */}
            <Route
              path="queue"
              element={
                <ProtectedRoute allowRoles={["receptionist"]}>
                  <Queue />
                </ProtectedRoute>
              }
            />

          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;