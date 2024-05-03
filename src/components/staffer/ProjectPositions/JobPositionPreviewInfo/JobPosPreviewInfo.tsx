import { getPositionById } from "../../../../api/PositionAPI";
import { useState, useEffect } from "react";

interface Props {
  id: number;
  demandCuration?: string;
}

export const JobPositionPreviewInfo = (prop: Props) => {
  const [positionTitle, setPositionTitle] = useState<string>("");
  const [techStack, setTechStack] = useState<string>("");
  const [division, setDivision] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [billRate, setBillRate] = useState<string>("0");
  const [hourRate, setHourRate] = useState<string>("0");
  const [postingType, setPostingType] = useState<string>("");
  const [demandCuration, setDemandCuration] = useState<string>("");

  useEffect(() => {
    getPositionById(prop.id).then((position) => {
      if (!position) {
        return;
      }
      setTechStack(position.tech_stack);
      setDivision(position.division);
      setRegion(position.region);
      setBillRate(String(position.bill_rate));
      setHourRate(String(position.working_hours));
      setPostingType(position.posting_type);
      setPositionTitle(position.position_title);
      setDemandCuration(prop.demandCuration ? prop.demandCuration : "No");
    });
  }, [prop.demandCuration, prop.id]);

  return (
    <div>
      <div className="detail-column">
        <h2>{positionTitle}</h2>
        <div className="detail-row">
          {techStack && (
            <h3>
              <b>Tech Stack:</b> {techStack}
            </h3>
          )}
          {division && (
            <h3>
              <b>Division:</b> {division}
            </h3>
          )}
        </div>
        <div className="detail-row">
          {demandCuration && (
            <h3>
              <b>Demand Curation:</b> {demandCuration}
            </h3>
          )}

          {region && (
            <h3>
              <b>Region:</b> {region}
            </h3>
          )}
          {billRate !== "0" && (
            <h3>
              <b>Tarifa:</b> {billRate}
            </h3>
          )}
          {postingType && (
            <h3>
              <b>Posting Type:</b> {postingType}
            </h3>
          )}
          {hourRate !== "0" && (
            <h3>
              <b>Horas:</b> {hourRate}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};
