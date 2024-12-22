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
const Dashboard = lazy(() => import("./components/layouts/Dashboard"));
const ChangePassword = lazy(() => import("./components/DashPages/users/ChangePassword"));
const Categories = lazy(() => import("./components/DashPages/users/Categories"));
const CreateCategory = lazy(() => import("./components/DashPages/users/CreateCategory"));
const CreateBrand = lazy(() => import("./components/DashPages/users/CreateBrand"));
const CreateProduct = lazy(() => import("./components/DashPages/users/CreateProduct"));
const ListUsers = lazy(() => import("./components/DashPages/users/Users"));
const Brands = lazy(() => import("./components/DashPages/users/Brands"));
const Locations = lazy(() => import("./components/DashPages/users/Locations"));
const Product = lazy(() => import("./components/DashPages/users/Product"));
const OrderShowPage = lazy(() => import("./components/DashPages/users/OrderShowPage"));
const Orders = lazy(() => import("./components/DashPages/users/Orders"));
const UpdateStatus = lazy(() => import("./components/DashPages/users/UpdateStatus"));
const About = lazy(() => import("./pages/About/About"));
const SignIn = lazy(() => import("./pages/Account/SignIn"));
const SignUp = lazy(() => import("./pages/Account/SignUp"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Journal = lazy(() => import("./pages/Journal/Journal"));
const Offer = lazy(() => import("./pages/Offer/Offer"));
const Payment = lazy(() => import("./pages/payment/Payment"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const DashHome = lazy(() => import("./components/DashPages/DashHome"));

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
          path="/"
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

      <Route
        path="/"
          element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
          }
          >
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <DashHome />
                </Suspense>
              }
            ></Route>

            <Route
              path="/change-password"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <ChangePassword />
                </Suspense>
              }
            ></Route>

            <Route
              path="/users"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <ListUsers />
                </Suspense>
              }
            ></Route>

            <Route
              path="/categories"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <Categories />
                </Suspense>
              }
            ></Route>

            <Route
              path="/brands"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <Brands />
                </Suspense>
              }
            ></Route>

            <Route
              path="/locations"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <Locations />
                </Suspense>
              }
            ></Route>

            <Route
              path="/orders"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <Orders />
                </Suspense>
              }
            ></Route>

            <Route
              path="/products"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <Product />
                </Suspense>
              }
            ></Route>

            <Route
              path="/create-category"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <CreateCategory />
                </Suspense>
              }
            ></Route>

            <Route
              path="/create-brand"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <CreateBrand />
                </Suspense>
              }
            ></Route>

            <Route
              path="/create-product"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <CreateProduct />
                </Suspense>
              }
            ></Route>

            <Route
              path="/order/:id"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <OrderShowPage />
                </Suspense>
              }
            ></Route>

            <Route
              path="/edit-order/:id"
              element={
                <Suspense fallback={<div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
                              <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>}>
                  <UpdateStatus />
                </Suspense>
              }
            ></Route>
        </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont relative">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
