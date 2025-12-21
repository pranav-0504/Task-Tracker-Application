import { useState } from "react";
import { useEffect } from "react";
import api from "../../utils/api";
import { useRouter } from "next/router";
import NavbarHome from "@/components/NavbarHome";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");         // Error message state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic field validation
    if (!user.email || !user.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", user);

      //! Local storage me token save krdia hai:
      localStorage.setItem("token", res.data.token);
      
      //! Now redirect to tasks page: After sucesfully logging in
      router.push("/tasks");      //? page will direct to tasks/index.js Page (Sucesfull Logged in user)
    } 
    
    catch (err) {
      // Backend error handling
      const msg = err.response?.data?.message || "Invalid email or password.";
      setError(msg);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarHome />

      <div className="min-h-screen flex flex-col justify-center items-center 
        bg-linear-to-b from-gray-900 via-black to-gray-900 p-6">

        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white/10 backdrop-blur-md shadow-xl 
          rounded-xl w-80 border border-white/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Login
          </h2>

          {/* 🔥 Error Message */}
          {error && (
            <div className="mb-3 p-2 text-sm text-red-300 bg-red-900/40 
              border border-red-500 rounded">
              {error}
            </div>
          )}  

          <input
            className="w-full p-2 bg-white/20 text-white border border-white/30 
            rounded mb-3 placeholder-gray-300"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            className="w-full p-2 bg-white/20 text-white border border-white/30 
            rounded mb-3 placeholder-gray-300"
            placeholder="Password"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-gray-300 mt-4">
          Not registered?{" "}
          <span
            onClick={() => router.push("/auth/signup")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>

      </div>
    </>
  );
}
