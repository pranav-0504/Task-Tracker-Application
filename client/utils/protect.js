
// To Protect the Routes

export default function protect(router) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    router.push("/auth/login");
  }
}
