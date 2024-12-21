import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";

// Lazy-loaded components
const About = lazy(() => import("./pages/About/About"));
const SignIn = lazy(() => import("./pages/Account/SignIn"));
const SignUp = lazy(() => import("./pages/Account/SignUp"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Home = lazy(() => import("./pages/Home/Home"));
const Journal = lazy(() => import("./pages/Journal/Journal"));
const Offer = lazy(() => import("./pages/Offer/Offer"));
const Payment = lazy(() => import("./pages/payment/Payment"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));
const Shop = lazy(() => import("./pages/Shop/Shop"));

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route
          index
          element={
            <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
              <Home />
            </Suspense>
          }
        ></Route>
        <Route
          path="/shop"
          element={
            <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
              <Shop />
            </Suspense>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
              <About />
            </Suspense>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
              <Contact />
            </Suspense>
          }
        ></Route>
        <Route
          path="/journal"
          element={
            <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
              <Journal />
            </Suspense>
          }
        ></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route
          path="/offer"
          element={
            <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
              <Offer />
            </Suspense>
          }
        ></Route>
        <Route
          path="/product/:_id"
          element={
            <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
              <ProductDetails />
            </Suspense>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
              <Cart />
            </Suspense>
          }
        ></Route>
        <Route
          path="/paymentgateway"
          element={
            <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
              <Payment />
            </Suspense>
          }
        ></Route>
      </Route>
      <Route
        path="/signup"
        element={
          <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
            <SignUp />
          </Suspense>
        }
      ></Route>
      <Route
        path="/signin"
        element={
          <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>}>
            <SignIn />
          </Suspense>
        }
      ></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
