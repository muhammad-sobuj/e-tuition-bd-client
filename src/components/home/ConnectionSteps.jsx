import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, FileText, FileCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <UserPlus />,
    title: "Create Profile",
    desc: "Create a profile to get more learning benefits from website.",
  },
  {
    icon: <FileText />,
    title: "Submit Requirements",
    desc: "Fill up expected tutor requirements & submit the request.",
  },
  {
    icon: <FileCheck />,
    title: "Get Tutors' CV",
    desc: "On requirements, we will provide some expert tutors' CVs.",
  },
  {
    icon: <CheckCircle />,
    title: "Select Your Tutor",
    desc: "Evaluate tutors & start learning with your favorite one.",
  },
];

const ConnectionSteps = () => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-14">
        The ways <span className="text-green-500">Parents/Students</span> can connect with us.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <Card key={i} className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-500 text-white">
                {step.icon}
              </div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ConnectionSteps;
