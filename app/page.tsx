"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("/api/login", { email, password });

      if (response.status === 200) {
        // Simpan token ke localStorage atau cookie
        localStorage.setItem("token", response.data.token);

        // Redirect ke halaman setelah login
        router.push("/tasks"); // atau halaman yang Anda inginkan
      } else {
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "Failed to login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>

          {errorMessage && <div className="alert alert-error text-center">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label font-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Password"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
