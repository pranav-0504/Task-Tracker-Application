import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="w-full bg-gray-900 text-white p-4 flex justify-between">
      <h1
        className="font-bold cursor-pointer"
        onClick={() => router.push("/tasks")}
      >
        Task Tracker
      </h1>

      <div className="flex gap-4">
        <button
          className="hover:underline cursor-pointer hover:bg-blue-700 transition"
          onClick={() => router.push("/tasks/create")}
        >
          Add A New Task 
        </button>

        <button className="hover:underline cursor-pointer" 
            onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
