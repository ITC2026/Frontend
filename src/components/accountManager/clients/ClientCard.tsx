import "./ClientCard.css"

interface Props {
  clientName: string;
  imgURL?: string;
  clientDescription: string;
}

const ClientCard = (prop: Props) => {

  return (
    <div className = "client-tab">
      <div className="client-img">
        <img src={prop.imgURL} alt={prop.imgURL} />
      </div>
      <div className="clientName">{prop.clientName}</div>
      <div className="clientDesc">{prop.clientDescription}</div>
    </div>
  );
};

export default ClientCard;
