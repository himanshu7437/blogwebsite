import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

import { Footer, Header, Chatbot } from "./components";
import { Outlet } from "react-router";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="flex flex-wrap content-between min-h-screen bg-white">
      <div className="block w-full">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </div>
  ) : null;
}

export default App;
