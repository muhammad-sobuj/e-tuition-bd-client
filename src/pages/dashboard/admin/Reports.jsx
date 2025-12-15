
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

const Reports = () => {
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/reports`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-xl text-center my-10"><LoadingSpinner/></p>;

  if (isError)
    return (
      <p className="text-xl text-center text-red-500 my-10">
        Failed to load reports!
      </p>
    );

  const pieData = [
    { name: "Total Earnings", value: data?.totalEarnings || 0 },
    { name: "Platform", value: 1000 }, // Just example (can be replaced)
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Reports & Analytics</h2>

      {/* Stats  */}
      <div className="stats shadow w-full mb-10">
        <div className="stat">
          <div className="stat-title">Total Earnings</div>
          <div className="stat-value text-primary">
            ${data.totalEarnings || 0}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Transactions</div>
          <div className="stat-value">{data.transactionCount || 0}</div>
        </div>
      </div>

      {/* Pie Chart  */}
      <div className="flex justify-center">
        <PieChart width={300} height={260}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Transactions Table  */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions?.map((t) => (
                <tr key={t.transactionId}>
                  <td>{t.studentEmail}</td>
                  <td>৳{t.amount}</td>
                  <td>{new Date(t.paidAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.transactions?.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No transactions found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
