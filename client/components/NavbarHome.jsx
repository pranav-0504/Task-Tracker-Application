import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 
      bg-black/30 backdrop-blur-md border-b border-white/10
      flex items-center justify-between px-8 py-4"
    >
      {/* Logo */}
      <h1
        onClick={() => router.push("/")}
        className="text-white text-xl font-semibold cursor-pointer"
      >
        TaskTracker
      </h1>

      {/* Right Navigation */}
      <div className="flex items-center gap-4">

        {/* Home Button */}
        <button
          onClick={() => router.push("/")}
          className="px-4 py-1 text-white border border-white/40 rounded 
          hover:bg-white/20 transition cursor-pointer"
        >
          Home
        </button>

        <button
          onClick={() => router.push("/auth/login")}
          className="px-4 py-1 text-white border border-white/40 rounded 
          hover:bg-white/20 transition cursor-pointer"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/auth/signup")}
          className="px-4 py-1 bg-blue-600 text-white rounded 
          hover:bg-blue-700 transition cursor-pointer"
        >
          Sign Up
        </button>

      </div>
    </nav>
  );
}
