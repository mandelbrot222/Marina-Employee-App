import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import BoatSchedule from './pages/BoatSchedule';
import Maintenance from './pages/Maintenance';
import MoveOuts from './pages/MoveOuts';
import StaffSchedule from './pages/StaffSchedule';
import Logs from './pages/Logs';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/schedule" element={<BoatSchedule />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/moveouts" element={<MoveOuts />} />
        <Route path="/staff" element={<StaffSchedule />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  );
}
