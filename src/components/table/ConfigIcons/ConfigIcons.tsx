import { OpeningButton } from "../../../components/accountManager/job_positions/table/OpeningButton";


interface Props {
  entity?: string;
  id: number;
}

export const ConfigIcons = (prop: Props) => {
  if (!prop.entity) {
    return;
  }
  switch (prop.entity) {
    case "Position": {
      return <OpeningButton id={prop.id} />;
      break;
    }
    default: {
      console.log(" : ) ");
      break;
    }
  }
};
