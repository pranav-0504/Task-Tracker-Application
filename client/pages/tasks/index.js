import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import api from "../../utils/api";
import Navbar from "../../components/Navbar";

export default function Tasks() {

  const router = useRouter();  // IMPORTANT

  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    search: ""
  });

  const loadTasks = async () => {
    const res = await api.get("/tasks", {
      params: filters
    });
    setTasks(res.data);
  };

  // AUTH + LOAD TASKS
  useEffect(() => {
    const token = typeof window !== "undefined" 
      ? localStorage.getItem("token") 
      : null;

    if (!token) {
      router.push("/auth/login");
      return;
    }

    loadTasks();
  }, [filters]);

  return (
    <>
      <Navbar />

      <div className="p-6">
      
        <h1 className="text-3xl font-semibold mb-4">My Tasks</h1>

        <div className="flex gap-2 mb-4">
          <select
            className="border p-2 text-white bg-black"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option className="text-black bg-white" value="">Filter by status</option>
            <option className="text-black bg-white" value="To Do">To Do</option>
            <option className="text-black bg-white" value="In Progress">In Progress</option>
            <option className="text-black bg-white" value="Done">Done</option>
          </select>

          <input
            className="border p-2"
            placeholder="Search"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="grid gap-3">
          {tasks.map((t) => (
            <div
              key={t._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{t.title}</h2>
                <p>{t.description}</p>
                <p className="text-sm text-gray-500">{t.status}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/tasks/edit/${t._id}`)}
                  // className="px-3 py-1 bg-yellow-500 text-white rounded cursor-pointer"
                  className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer transition-transform duration-300 transform hover:scale-155 hover:bg-blue-400 "
                >
                  Edit
                </button>

                <button
                  onClick={async () => {
                    await api.delete(`/tasks/${t._id}`);
                    loadTasks();
                  }}
                  // className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                  className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer transition-transform duration-300 transform hover:scale-155 hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
