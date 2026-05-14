import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BikeListing from './pages/BikeListing'
import BikeDetail from './pages/BikeDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import BookingConfirmation from './pages/BookingConfirmation'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import RentYourBike from './pages/RentYourBike'
import AdminDashboard from './pages/admin/Dashboard'
import ManageBikes from './pages/admin/ManageBikes'
import ManageBookings from './pages/admin/ManageBookings'
import ManageUsers from './pages/admin/ManageUsers'
import ManageInquiries from './pages/admin/ManageInquiries'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bikes" element={<BikeListing />} />
          <Route path="/bikes/:id" element={<BikeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rent-your-bike" element={<RentYourBike />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/booking-confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/bikes" element={<AdminRoute><ManageBikes /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
          <Route path="/admin/inquiries" element={<AdminRoute><ManageInquiries /></AdminRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
