import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Gigs from "./pages/gigs/Gigs";
import Dashboard from "./pages/dashboard/Dashboard";
import GigDetails from "./pages/gigs/GigDetails";
import Orders from "./pages/orders/Orders";
import CreateGig from "./pages/gigs/CreateGig";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import MyGigs from "./pages/gigs/MyGigs";
import EditGig from "./pages/gigs/EditGig";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrapper */}
        <Route element={<MainLayout />}>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/gig/:id" element={<GigDetails />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/chat/:orderId" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-gigs" element={<MyGigs />} />
            <Route path="/edit-gig/:id" element={<EditGig />} />

          </Route>

        </Route>

        {/* Auth Pages (No Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
