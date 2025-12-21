import { useState } from "react";
import api from "../../utils/api";
import { useRouter } from "next/router";
import NavbarHome from "@/components/NavbarHome";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");   // 🔥 Error message
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    // 🔥 Basic validations
    if (!user.name || !user.email || !user.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!user.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (user.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      await api.post("/auth/signup", user);

      router.push("/auth/login");

    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed. Try again.";
      setError(msg);
    } finally {
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
            Create Account
          </h2>

          {/* Error Box */}
          {error && (
            <div className="mb-3 p-2 text-sm text-red-300 bg-red-900/40 
              border border-red-500 rounded">
              {error}
            </div>
          )}

          <input
            className="w-full p-2 bg-white/20 text-white border border-white/30 
            rounded mb-3 placeholder-gray-300"
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

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
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* 🔽 Login Link */}
        <p className="text-gray-300 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </>
  );
}
