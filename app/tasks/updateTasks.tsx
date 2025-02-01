"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Status } from "@prisma/client"; // Import enum Status from Prisma

interface User {
  id: string;
  email: string;
  role: "Team"; // Only Team role will be shown
}

type Task = {
  id: string;
  title: string;
  description: string | null;
  assigned_to_id: string | null;
  status: Status;
  created_by_id: string;
  created_at: Date;
};

interface UpdateTasksProps {
  status: Status;
  tasks: Task;
}

const UpdateTasks = ({ status, tasks }: UpdateTasksProps) => {
  const [task, setTask] = useState<Task>(tasks); // Use the passed `tasks` prop
  const [title, setTitle] = useState(tasks.title);
  const [description, setDescription] = useState(tasks.description || "");
  const [assigned_to_id, setAssigned_to_id] = useState(tasks.assigned_to_id || "");
  const [statusState, setStatusState] = useState<Status>(status);
  const [users, setUsers] = useState<User[]>([]); // List of team users
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Fetch users with role "Team"
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
    setErrorMessage("");

    // Validate title
    if (!title.trim()) {
      setErrorMessage("Task title is required.");
      setIsLoading(false);
      return;
    }

    try {
      const taskData = {
        title,
        description: description || null,
        assigned_to_id: assigned_to_id || null,
        status: statusState,
      };

      // Update task with ID passed from the `tasks` prop
      const response = await axios.put(`/api/tasks/${task.id}`, taskData);

      if (response.status === 200) {
        setTimeout(() => {
          setIsLoading(false);
          setIsOpen(false);
          router.refresh();
        }, 500);
      } else {
        setErrorMessage("Failed to update task. Please try again.");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
      setErrorMessage(error.response?.data?.error || "Failed to update task.");
      setIsLoading(false);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
    setErrorMessage(""); // Reset error when modal is opened/closed
  };

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Update
      </button>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-lg">
            <h3 className="font-bold text-lg text-center mb-4">Update Task</h3>
            {errorMessage && <div className="alert alert-error mb-4">{errorMessage}</div>}
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
                  value={statusState}
                  onChange={(e) => setStatusState(e.target.value as Status)}
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

export default UpdateTasks;
