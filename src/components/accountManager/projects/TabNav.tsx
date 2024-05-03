import "./TabNav.css"
interface PropTab {
  selected: string;
  setSelected: (selected: string) => void;
}

export const TabNav = (props: PropTab) => {
  const projectTypeList = [
    "Proyectos en Preparación",
    "Proyectos Activos",
    "Proyectos Cerrados",
  ];

  return (
    <div className="ajuste">
    <ul className="nav nav-pills nav-fill">
      {projectTypeList.map((type: string, index: number) => (
        <li key={index} className="nav-item">
          <a
            key={index}
            className={`nav-link ${props.selected === type ? "encora-purple active text-light" : "text-body"}`}
            onClick={() => props.setSelected(type)}
          >
            {type}
          </a>
        </li>
      ))}
    </ul>
    </div>
  );
};
