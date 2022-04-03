import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./components/Category";
import Signup from "./pages/Signup";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchbar" element={<SearchBar />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/footer" element={<Footer />} />

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/category/:categoryType" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
