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

      <div className="min-h-screen p-6">
        <h1 className="text-3xl mb-4">Edit Task</h1>

        <form onSubmit={submit} className="max-w-md">
          <input
            className="border p-2 w-full mb-3"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />

          <textarea
            className="border p-2 w-full mb-3"
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />

          <select
            className="border p-2 w-full mb-3"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            className="border p-2 w-full mb-3"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button className="w-full bg-blue-600 text-white p-2 rounded">
            Update Task
          </button>
        </form>
      </div>
    </>
  );
}
