import { BAY_GROUPS } from "../../constants/GeneralConstants";
import BaySection from "./BaySection";

export const createBaySections = (bayGroup: BAY_GROUPS, bayNumbers: number[]) => {
  const baySections = [];
  const rowsPerColumn = bayNumbers.length > 10 ? 4 : 2;

  for (let i = 0; i < bayNumbers.length; i += rowsPerColumn) {
    const bayElements = [];
    for (let j = i; j < i + rowsPerColumn; j++) {
      if (bayNumbers[j] !== undefined) {
        bayElements.push(
          <BaySection key={j} id={bayNumbers[j]} group={bayGroup} />
        );
      }
    }

    baySections.push(
      <div key={i} className="col-md-2">
        {bayElements}
      </div>
    );
  }

  return baySections;
};
