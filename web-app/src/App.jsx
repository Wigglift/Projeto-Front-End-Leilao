import "./assets/scss/Reset.scss";
import "./assets/scss/Common.scss";
import "./assets/scss/Container.scss";

import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { AuthProvider } from "./contexts/auth/AuthContext";
import Profile from "./pages/profile/Profile";
import LiveAuction from "./pages/liveAuction/LiveAuction";
import AuctionDetails from "./pages/auctionDetails/AuctionDetails";


function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/liveAuction" element={<ProtectedRoute><LiveAuction /></ProtectedRoute>} />
          <Route path="/auctionDetails" element={<ProtectedRoute><AuctionDetails /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
