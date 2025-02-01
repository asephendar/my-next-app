"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Team"); // Default ke Team
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", { email, password, role });

      if (response.status === 201) {
        router.push("/"); // Redirect ke halaman login setelah sukses
      } else {
        setErrorMessage("Failed to register. Please try again.");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Register</h2>
          {errorMessage && <div className="alert alert-error text-center">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email */}
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

            {/* Password */}
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

            {/* Role Selection */}
            <div className="form-control mb-4">
              <label className="label font-bold">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="Lead">Lead</option>
                <option value="Team">Team</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
