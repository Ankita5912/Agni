import { useNavigate } from "react-router-dom";
import Navbar2 from "../Components/Navbar2";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { BarChart, Users, Folder, Timer, CheckSquare, Brain } from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mode = useSelector((state: RootState) => state.mode.mode);
  return (
    <div className={`rounded-2xl  ${mode ? 'backdrop-blur-md  bg-[#f8f9fa]' : ''} ${className}`}>
      {children}
    </div>
  );
}
function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6  ${className}`}>
      {children}
    </div>
  );
}
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  const mode = useSelector((state: RootState) => state.mode.mode);
  return (
    <Card className={` shadow-[0_25px_50px_-12px_var(--primary-color)] border  ${mode ? "bg-white/70 border-gray-200" : "bg-[#1a1b1e]/60 border-gray-800"
      }`}>
      <CardContent className="p-5 w-full h-48 flex gap-3  justify-center flex-col items-center">
        {icon}
        <h4 className={`mt-3 font-serif font-bold `}>{title}</h4>
        <p className={`text-sm  text-center font-Manrope tracking-wide font-normal antialiased ${mode ? "text-[#444950]" : "text-[#676e78]"}`}>{description}</p>
      </CardContent>
    </Card>
  )
}
export default function HomePage() {
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.mode.mode);
  return (
    <div className="relative overflow-x-hidden overflow-y-auto" style={{ scrollbarWidth: "none", scrollbarGutter: "0px" }}>
      <Navbar2 />
      <main className="flex flex-col w-full items-center justify-center xl:px-auto md:px-18 sm:px-15 px-8">
        <div className="relative max-w-4xl w-full text-center sm:mt-32 mt-38">
          <h1
            className={`sm:text-6xl/tight text-5xl  sm:font-extrabold font-bold font-josphin mb-6 ${mode ? 'text-[#24223e]' : 'text-white'}`}
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
            className={`sm:text-base text-sm sm:font-bold font-semibold font-Manrope  mt-6 ${mode ? "" : "text-inherit"
              }`}
          >
            Manage Your Projects the Agile Way — Seamlessly
          </h1>




        </div>
        <section className="flex items-center justify-center max-w-4xl  md:mt-15 mt-10 ">
          <img src="./Kanban.png" alt="agni" className={`shadow-[-2px_-2px_20px_var(--primary-color),2px_-2px_20px_var(--primary-color)] border border-0.5 rounded-2xl   ${mode ? "border-[#f8f9fabe]" : "border-[#242528]"
            }`} />
        </section>
        
      </main>
      <section className="py-16 md:px-20 px-10 md:mt-10 mt-10">
        <div className="mb-10 flex flex-col gap-3">
          <h3 className={`md:text-4xl text-3xl font-semibold font-poppins text-center ${mode ? 'text-[#24223e]' : ''}`}>Plan Smarter, Work Faster, Deliver Better</h3>
          <p className={`md:text-lg text-base font-Manrope text-center  ${mode ? "text-[#444950] ont-semibold" : "text-[#676e78]  font-medium"}`}>Keep projects on track with powerful planning tools</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
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
      <section className="py-16 md:px-30 px-6 flex xl:flex-row justify-center place-items-center flex-col xl:justify-between gap-6">
        <img src="./flowWithAgni.gif" alt="AgniVedio" className={`w-xl border rounded-2xl ${mode ? " border-gray-200" : " border-gray-800"
      }`}/>
        <div className={`font-normal font-poppins ${mode ? " text-[#444950]" : "text-inherit"}`}>
          <h3 className={`text-2xl font-bold mb-10 ${mode ? 'text-[#24223e]' : ''}`}>How to Use Agni</h3>
          <ol className="space-y-6 max-w-3xl mx-auto text-lg font-Manrope ">
            <li><span className="font-semibold">Step 1:</span> Create a Team → Invite your teammates.</li>
            <li><span className="font-semibold">Step 2:</span> Start a Project → Define goals and milestones.</li>
            <li><span className="font-semibold">Step 3:</span> Add Tasks → Break down work into trackable items.</li>
            <li><span className="font-semibold">Step 4:</span> Track Progress → Use Kanban boards and reports.</li>
            <li><span className="font-semibold">Step 5:</span> Complete & Celebrate 🎉</li>
          </ol>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto z-30 relative">
        <h3
          className={`text-4xl font-bold text-center mb-12 font-poppins ${mode ? "text-[#24223e]" : "text-white"
            }`}
        >
          Coming Soon{" "}
          <span className="text-[var(--primary-color)] animate-pulse shadow-2xl"> ●</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Integration */}
          <Card className={`border  rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-md ${mode ? 'border-gray-200' : ''}`}>
            <CardContent className="p-6 flex flex-col items-start">
              <div className="flex gap-2 items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${mode ? 'bg-indigo-100' :'bg-indigo-900'}`}>
                  <Brain className={`w-6 h-6  dark: ${mode ? 'text-indigo-600' : 'text-indigo-300'}`} />
                </div>
                <h4 className={`text-lg font-roboto  mb-2 ${mode ? 'text-gray-900 font-semibold' : 'text-white/80 tracking-wider font-normal'}`}>
                  AI Integration
                </h4>
              </div>
              <p className={`text-sm font-Manrope font-normal leading-relaxed ${mode ? 'text-gray-600' : 'text-gray-400'}`}>
                Generate tasks, predict timelines, and unlock smart productivity insights.
              </p>
              <span className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                Coming Soon
              </span>
            </CardContent>
          </Card>

          {/* Sprints */}
          <Card className={`border  rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-3xl ${mode ?'border-gray-200':''}`}>
            <CardContent className="p-6 flex flex-col items-start">
              <div className="flex gap-2 items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${mode ? 'bg-indigo-100' : 'bg-indigo-900'}`}>
                  <Timer className={`w-6 h-6  dark: ${mode ? 'text-indigo-600' : 'text-indigo-300'}`} />
                </div>
                <h4 className={`text-lg font-roboto mb-2  ${mode ? 'text-gray-900 font-semibold' : 'text-white/80 tracking-wider font-normal'}`}>
                  Sprints
                </h4>
              </div>
              <p className={`text-sm font-Manrope font-normal leading-relaxed ${mode ? 'text-gray-600' :'text-gray-400'}`}>
                Plan, run, and track agile sprints with burndown charts & velocity tracking.
              </p>
              <span className={`mt-4 text-xs font-semibold font-Manrope uppercase tracking-wide ${mode ? 'text-indigo-600' :'text-indigo-400'}`}>
                Coming Soon
              </span>
            </CardContent>
          </Card>
        </div>

      </section>

      {/* Why Agni Section */}
      {/* <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
        <h3 className="text-2xl font-bold text-center mb-10">💡 Why Agni?</h3>
        <ul className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-lg">
          <li>🚀 Easy to use for individuals and teams.</li>
          <li>⚡ Real-time collaboration & updates.</li>
          <li>🎯 Keeps projects organized and on track.</li>
          <li>🔒 Secure authentication and data safety.</li>
        </ul>
      </section> */}

      {/* Footer */}
      <footer className={`text-center relative py-6 text-sm ${mode?'text-gray-800':''}`}>
        <span className="relative font-Manrope font-semibold z-40">Agni – Empowering teams to build better, faster.</span>
        {/* <img src="./Blob.png" alt="blob" className="w-96 absolute -bottom-0 z-10 left-1/3" /> */}
      </footer>
      
    </div>
  );
}

