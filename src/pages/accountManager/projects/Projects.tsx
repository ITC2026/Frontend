import "./Projects.css";
import Table from "react-bootstrap/Table";

interface Props {
  categories: string[];
}

const ProjectPage = (prop: Props) => {
  return (
    <div>
      <h1>Proyectos</h1>

      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th className="bg-custom-encora text-light">#</th>
            {prop.categories.map((category: string, index: number) => (
              <th key={index} className="bg-tr-custom-encora text-light">
                {category}
              </th>
            ))}
            <th className="bg-tr-custom-encora text-light">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td> a </td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectPage;
