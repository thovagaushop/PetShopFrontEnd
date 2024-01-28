import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
// import Footer from "./components/home/Footer/Footer";
// import FooterBottom from "./components/home/Footer/FooterBottom";
import MainFooter from "./components/home/Footer/MainFooter";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import MainHeader from "./components/home/Header/MainHeader";
import Navbar from "./components/home/Header/Navbar";
import Auth from "./pages/Account/Auth";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseJwt } from "./utils";
import { logout } from "./redux/orebiSlice";
import TakeCare from "./pages/Booking/TakeCare";
import Examination from "./pages/Booking/Examination";

const Layout = () => {
  return (
    <div>
      <MainHeader />
      <Navbar />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <MainFooter />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        <Route path="/take-care" element={<TakeCare />}></Route>
        <Route path="/examination" element={<Examination />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/auth" element={<Auth />}></Route>
    </Route>
  )
);

function App() {
  const user = useSelector((state) => state.orebiReducer.userInfo);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkTokenExpiration = () => {
  //     if (user.token) {
  //       try {
  //         const decodedJwt = parseJwt(user.token);
  //         console.log(decodedJwt);

  //         if (decodedJwt.exp * 1000 < Date.now()) {
  //           dispatch(logout());
  //         }
  //       } catch (error) {
  //         console.error("Error decoding JWT:", error);
  //         // Handle error (e.g., logout user)
  //         dispatch(logout());
  //       }
  //     }
  //   };

  //   checkTokenExpiration();
  // }, [user, dispatch]);

  return (
    <div className="font-bodyFont">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
