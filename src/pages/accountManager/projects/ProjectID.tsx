import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <h1>id: {id}</h1>
    </>
  );
};

export default ProjectDetail;
