import { useParams } from "react-router-dom"; 


const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { type } = useParams<{ type: string }>();
  
    return (
      <>
        <h1>id: {id}</h1>
        <h2> type: {type}</h2>
      </>
    );
  };

  export default ProjectDetail;