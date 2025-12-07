import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import api from "../utils/api";

import Navbar from "../components/Navbar";
import protect from "../utils/protect";

export default function Tasks() {

  const router = useRouter(); 

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

  useEffect(() => {
    loadTasks();
  }, [filters]);

  useEffect(() => {
    protect(router);
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-4">My Tasks</h1>

        <div className="flex gap-2 mb-4">
          <select
            className="border p-2"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Filter by status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
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
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={async () => {
                    await api.delete(`/tasks/${t._id}`);
                    loadTasks();
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded"
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



//! Original default Home page code Landing NEXT JS:

// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function Home() {
//   return (
//     <div
//       className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
//     >
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the index.js file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs/pages/getting-started?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
