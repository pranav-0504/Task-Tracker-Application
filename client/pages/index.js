import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function Home() {
  const router = useRouter();

  return (
    <>

      <div className="min-h-screen flex flex-col justify-center items-center 
      bg-linear-to-b from-gray-900 via-black to-gray-900 text-center p-6">

        <h1 className="text-4xl font-bold mb-4">Task Tracker App</h1>

        <p className="text-lg text-gray-600 mb-6">
          Manage your tasks efficiently and stay productive.
        </p>

        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded 
             cursor-pointer hover:bg-blue-700 transition"
            onClick={() => router.push("/auth/signup")}
            
          >
            Sign Up
          </button>

          <button
            className="px-6 py-2 bg-green-600 text-white rounded 
             cursor-pointer hover:bg-green-700 transition"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
