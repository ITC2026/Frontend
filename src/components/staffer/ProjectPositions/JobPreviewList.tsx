import JobPreview from "./JobPreview";
import { getProjectById } from "../../../api/ProjectAPI";
import { useEffect, useState } from "react";
import "./style/JobPreviewList.css";

interface Props {
  project_id: number;
  setId: (id: number) => void;
}

export const JobPreviewList = ({ project_id, setId}: Props) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    console.log(`It is running, indeed.: project_id: ${project_id}`)
    getProjectById(project_id).then((project) => {
      if (!project) {
        return;
      }
      setProject(project);
    });
  }, [project_id]);

useEffect(() => {
    console.log(`Project: ${JSON.stringify(project)}`);
    project?.positions.forEach((position) => {
        console.log(`Position: ${JSON.stringify(position)}`);
    });
}, [project]);

  return (
    <div className = "job-container">
      {project?.positions.map((position) => (
        <JobPreview key={position.id} setId={setId} position={position} />
      ))}
    </div>
  );
};
