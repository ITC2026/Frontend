import "./ClientCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
interface Props {
  clientName: string;
  imgURL?: string;
  clientDescription: string;
}

const ClientCard = (prop: Props) => {

  return (
    <div className = "client-tab">
      
      <div className="contenido">
      <button className="btn btn-secondary dropdown-toggle">
        <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      <div className="client-img">
        <img src={prop.imgURL} alt={prop.imgURL} />
      </div>
      <div className="textito">
      <div className="clientName">{prop.clientName}</div> 
      <div className="clientDesc">{prop.clientDescription}</div>
      </div>
      </div>
      
    </div>
  );
};

export default ClientCard;
