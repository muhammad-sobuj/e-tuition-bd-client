import { UserPlus, FileText, FileCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={24} />,
    title: "Create Profile",
    desc: "Create a profile to get more learning benefits from website.",
  },
  {
    icon: <FileText size={24} />,
    title: "Submit Requirements",
    desc: "Fill up expected tutor requirements & submit the request.",
  },
  {
    icon: <FileCheck size={24} />,
    title: "Get Tutors' CV",
    desc: "On requirements, we will provide some expert tutors' CVs.",
  },
  {
    icon: <CheckCircle size={24} />,
    title: "Select Your Tutor",
    desc: "Evaluate tutors & start learning with your favorite one.",
  },
];

const ConnectionSteps = () => {
  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-14">
        The ways{" "}
        <span className="text-cyan-500">Parents/Students</span> can connect with us.
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-cyan-200 p-6 text-center space-y-4 hover:shadow-md transition"
          >
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-cyan-500 text-white">
              {step.icon}
            </div>

            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConnectionSteps;
