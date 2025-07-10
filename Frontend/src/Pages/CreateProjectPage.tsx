import CreProjectForm from "../Components/CreateProjectForm";
import projectpic from '../assets/create-project.png'

export default function CreateProject() {
  return (
    <div className="flex md:flex-row min-h-screen overflow-x-hidden justify-between mx-32 items-center" >
      <div className="">
        <img src={projectpic} className="sm:w-xl sm:block hidden"></img>
      </div>
      <CreProjectForm/>
    </div>
  );
}