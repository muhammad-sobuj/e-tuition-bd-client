
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const TuitionManagement = () => {
  const { data: tuitions = [], refetch } = useQuery({
    queryKey: ["admin-tuitions"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/tuitions`,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return res.data;
    },
  });

  const handleStatus = async (id, status) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/admin/tuitions/${id}/status`,
      { status },
      {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    toast.success(`Tuition ${status}!`);
    refetch();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Tuition Moderation</h2>
      <div className="grid gap-4">
        {tuitions.map((t) => (
          <div key={t._id} className="card bg-base-100 shadow">
            <div className="card-body flex-row justify-between items-center">
              <div>
                <h3 className="font-bold">
                  {t.subject} - Class {t.class}
                </h3>
                <p>
                  {t.location} | ৳{t.budget}
                </p>
              </div>
              <div className="space-x-2">
                <span
                  className={`badge ${
                    t.status === "approved"
                      ? "badge-success"
                      : t.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {t.status}
                </span>
                {t.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatus(t._id, "approved")}
                      className="btn btn-success btn-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatus(t._id, "rejected")}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TuitionManagement;
