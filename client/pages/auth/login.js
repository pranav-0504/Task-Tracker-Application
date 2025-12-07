import { useState } from "react";
import api from "../../utils/api";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", user);
    localStorage.setItem("token", res.data.token);

    router.push("/tasks");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <input className="w-full p-2 border mb-3"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input className="w-full p-2 border mb-3"
          placeholder="Password"
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
