import { PrismaClient } from "@prisma/client";
import AddTasks from "./addTasks";
import DeleteTasks from "./deleteTasks";
import UpdateTasks from "./updateTasks";
const prisma = new PrismaClient();

const getTasks = async () => {
  const res = await prisma.tasks.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      assigned_to_id: true,
      created_by_id: true,
      created_at: true,
    },
  });
  return res;
};

const getStatus = async () => {
  const res = await prisma.tasks.findMany();
  return res;
};

const Tasks = async () => {
  const [tasks, status] = await Promise.all([getTasks(), getStatus()]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-6xl">
        <div className="mb-4">
          <AddTasks key={tasks.length} />
        </div>

        <table className="table-auto w-full text-left text-gray-600">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold">#</th>
              <th className="px-4 py-2 text-sm font-semibold">Title</th>
              <th className="px-4 py-2 text-sm font-semibold">Description</th>
              <th className="px-4 py-2 text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-sm font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.description}</td>
                <td className="px-4 py-2 capitalize">{task.status.toString()}</td>
                <td className="flex px-4 py-2 text-center space-x-2 justify-center">
                  <UpdateTasks status={task.status} tasks={task} />
                  <DeleteTasks tasks={task} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
