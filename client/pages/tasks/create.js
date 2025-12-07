import { useState } from "react";
import api from "../../utils/api";
import { useRouter } from "next/router";
import protect from "../../utils/protect";

export default function CreateTask() {
  const router = useRouter();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "To Do"
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", task);
    router.push("/tasks");
  };

  useEffect(() => {
    protect(router);
  }, []);

  return (

    <>
      <Navbar />

      <div className="min-h-screen p-6">
        <h1 className="text-3xl mb-4">Create Task</h1>

        <form onSubmit={submit} className="max-w-md">
          <input
            className="border p-2 w-full mb-3"
            placeholder="Title"
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            />

          <textarea
            className="border p-2 w-full mb-3"
            placeholder="Description"
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />

          <select
            className="border p-2 w-full mb-3"
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button className="bg-green-600 text-white p-2 rounded w-full">
            Save
          </button>
        </form>
      </div>

    </>
  );
}
