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
    getProjectById(project_id).then((project) => {
      if (!project) {
        return;
      }
      setProject(project);
    });
  }, [project_id]);

  return (
    <div className = "job-container">
      {project?.positions.map((position) => (
        <JobPreview key={position.id} setId={setId} position={position} />
      ))}
    </div>
  );
};
