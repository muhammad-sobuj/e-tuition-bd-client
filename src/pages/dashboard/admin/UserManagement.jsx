
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const UserManagement = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return res.data;
    },
  });

  const handleRoleChange = async (email, newRole) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${email}`,
      { role: newRole },
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    toast.success("Role updated");
    refetch();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge badge-primary">{u.role}</span>
                </td>
                <td>
                  <select
                    defaultValue={u.role}
                    onChange={(e) => handleRoleChange(u.email, e.target.value)}
                    className="select select-sm select-bordered"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
