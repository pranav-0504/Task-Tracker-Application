import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Navbar from "../../../components/Navbar";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "To Do",
  });

  // Load task data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (id) {
      api.get(`/tasks/${id}`).then((res) => {
        setTask(res.data);
      });
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/tasks/${id}`, task);
    router.push("/tasks");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-gray-900 via-black to-gray-900 text-center p-6">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20">
          <h1 className="text-4xl font-bold text-center text-white mb-6 tracking-wide">
            Edit Task
          </h1>

          <form onSubmit={submit}>
            <input
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />

            <textarea
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />

            <select
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option className="text-black" value="low">Low</option>
              <option className="text-black" value="medium">Medium</option>
              <option className="text-black" value="high">High</option>
            </select>

            <select
              className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => router.push("/tasks")}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
