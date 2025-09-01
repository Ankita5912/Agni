import { useNavigate } from "react-router-dom";
import Navbar2 from "../Components/Navbar2";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { BarChart, Users, Folder, Timer, CheckSquare, Brain } from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border bg-white dark:bg-gray-900 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}


function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-start">
        {icon}
        <h4 className="mt-3 font-bold">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.mode.mode);
  return (
    <div className="relative overflow-hidden">
      <Navbar2 />
      <main className="flex flex-col w-full items-center justify-center px-3">
        <div className="relative max-w-4xl w-full text-center mt-32">
          <h1
            className={`sm:text-6xl/tight text-3xl sm:font-extrabold font-bold font-josphin mb-6 ${
              mode ? "text-black" : "text-white"
            }`}
          >
            <span className="font-normal tracking-tighter z-20">
              Welcome to your Kanban Board
            </span>{" "}
            Flow with{" "}
            <span className="font-extrabold font-poppins text-[var(--primary-color)]">
              Agni
            </span>
          </h1>
          <div className="absolute -mt-40 ml-115 z-1">
            <img src="/just.png" className="h-50" />
          </div>
          <div className="absolute -mt-30 ml-118 h-fit w-fit rotate-26">
            <img src="/arrow.png" className="h-62"></img>
          </div>
          
            <button
              className={`sm:text-base text-xs sm:font-semibold font-normal tracking-wide  font-Manrope bg-blend-color-burn sm:h-12 h-10 z-50 max-w-fit py-1 sm:px-5 px-4 cursor-pointer rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white`}
              onClick={() => navigate("/create-project")}
            >
              Create New Project
            </button>
         
          <h1
            className={`sm:text-base text-sm sm:font-bold font-semibold font-Manrope  mt-6 ${
              mode ? "text-[#444950]" : "text-inherit"
            }`}
          >
            Manage Your Projects the Agile Way — Seamlessly
          </h1>
          <section className="py-16 px-6 max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-10">✨ Key Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Users className="w-6 h-6 text-indigo-500" />}
                title="Team Management"
                description="Create teams, invite members, and assign roles easily."
              />
              <FeatureCard
                icon={<Folder className="w-6 h-6 text-indigo-500" />}
                title="Project Organization"
                description="Organize work inside projects with clear goals and milestones."
              />
              <FeatureCard
                icon={<CheckSquare className="w-6 h-6 text-indigo-500" />}
                title="Task Management"
                description="Create, assign, and track tasks with priorities and deadlines."
              />
              <FeatureCard
                icon={<BarChart className="w-6 h-6 text-indigo-500" />}
                title="Reports & Insights"
                description="Track progress with visual reports and workload charts."
              />
            </div>
          </section>

          {/* How To Use Section */}
          <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-center mb-10">📖 How to Use Agni</h3>
            <ol className="space-y-6 max-w-3xl mx-auto text-lg">
              <li><span className="font-semibold">Step 1:</span> Create a Team → Invite your teammates.</li>
              <li><span className="font-semibold">Step 2:</span> Start a Project → Define goals and milestones.</li>
              <li><span className="font-semibold">Step 3:</span> Add Tasks → Break down work into trackable items.</li>
              <li><span className="font-semibold">Step 4:</span> Track Progress → Use Kanban boards and reports.</li>
              <li><span className="font-semibold">Step 5:</span> Complete & Celebrate 🎉</li>
            </ol>
          </section>

          {/* Coming Soon Section */}
          <section className="py-16 px-6 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-10">🚀 Coming Soon</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="opacity-70 border-dashed">
                <CardContent className="p-6 flex flex-col items-start">
                  <Brain className="w-8 h-8 text-indigo-500 mb-3" />
                  <h4 className="font-bold mb-2">AI Integration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Smart task generation, timeline predictions, and productivity insights.
                  </p>
                  <span className="mt-3 text-xs font-semibold text-indigo-500">Coming Soon</span>
                </CardContent>
              </Card>
              <Card className="opacity-70 border-dashed">
                <CardContent className="p-6 flex flex-col items-start">
                  <Timer className="w-8 h-8 text-indigo-500 mb-3" />
                  <h4 className="font-bold mb-2">Sprints</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Plan and track agile sprints with burndown charts and velocity tracking.
                  </p>
                  <span className="mt-3 text-xs font-semibold text-indigo-500">Coming Soon</span>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Agni Section */}
          <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-center mb-10">💡 Why Agni?</h3>
            <ul className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-lg">
              <li>🚀 Easy to use for individuals and teams.</li>
              <li>⚡ Real-time collaboration & updates.</li>
              <li>🎯 Keeps projects organized and on track.</li>
              <li>🔒 Secure authentication and data safety.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="text-center py-6 text-sm text-gray-600 dark:text-gray-400">
            Agni – Empowering teams to build better, faster.
          </footer>

        </div>
      </main>
    </div>
  );
}

