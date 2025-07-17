import CreProjectForm from "../Components/CreateProjectForm";
import projectpic from '../assets/create-project.png'

export default function CreateProject() {
  return (
    <div className="flex md:flex-row min-h-screen overflow-x-hidden md:justify-between justify-center md:mx-32 p-5 items-center" >
      <div className="">
        <img src={projectpic} className="md:w-xl md:block hidden"></img>
      </div>
      <CreProjectForm/>
    </div>
  );
}