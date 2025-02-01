"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Status } from "@prisma/client"; // Import enum Status dari Prisma

interface User {
  id: string;
  email: string;
  role: "Team"; // Hanya role Team yang akan ditampilkan
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Komponen untuk menambahkan task baru.
 *
 * Komponen ini menampilkan form modal yang berisi input untuk title, description, assigned to, dan status.
 * Saat submit, komponen ini akan membuat request POST ke API untuk membuat task baru.
 *
 * @returns {React.ReactElement}
 */
/******  14e976f5-115b-4125-9a9f-6a5b9462711f  *******/const AddTasks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigned_to_id, setAssigned_to_id] = useState("");
  const [status, setStatus] = useState<Status>(Status.NotStarted);
  const [created_by_id, setCreated_by_id] = useState("aebdb715-083f-4c73-a67a-494bbf967f29");
  const [users, setUsers] = useState<User[]>([]); // List user role Team
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // Fetch daftar users dengan role "Team"
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users?role=Team");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/tasks", {
        title: title,
        description: description,
        status: status,
        assigned_to_id: assigned_to_id,
        created_by_id: created_by_id,
      });
      setIsLoading(false);
      setTitle("");
      setDescription("");
      setAssigned_to_id("");
      setStatus(Status.NotStarted);
      setCreated_by_id("");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Failed to add task, please try again.");
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
    setErrorMessage(""); // Reset error saat modal dibuka/tutup
  };

  return (
    <div>
      <button className="btn btn-primary btn-sm" onClick={handleModal}>
        Add New Task
      </button>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-lg">
            <h3 className="font-bold text-lg mb-4 text-center">Add New Task</h3>
            {errorMessage && (
              <div className="alert alert-error mb-4">
                <span>{errorMessage}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {/* Task Title */}
              <div className="form-control w-full mb-4">
                <label className="label font-bold">Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter task title"
                  required
                />
              </div>

              {/* Task Description */}
              <div className="form-control w-full mb-4">
                <label className="label font-bold">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter task description"
                />
              </div>

              {/* Assigned To (Dropdown - Hanya Role "Team") */}
              <div className="form-control w-full mb-4">
                <label className="label font-bold">Assign To (Team Only)</label>
                <select
                  value={assigned_to_id}
                  onChange={(e) => setAssigned_to_id(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select a team member</option>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.email}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No team members available
                    </option>
                  )}
                </select>
              </div>

              {/* Status (Dropdown) */}
              <div className="form-control w-full mb-4">
                <label className="label font-bold">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="select select-bordered w-full"
                >
                  {Object.values(Status).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modal Actions */}
              <div className="modal-action space-x-2">
                <button type="button" className="btn btn-sm" onClick={handleModal}>
                  Close
                </button>
                {!isLoading ? (
                  <button type="submit" className="btn btn-primary btn-sm">
                    Save
                  </button>
                ) : (
                  <button type="button" className="btn loading btn-sm">
                    Saving...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTasks;
