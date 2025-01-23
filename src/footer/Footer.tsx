import "./Footer.css";
import StatusCount from "./StatusCount";
import { useAsset } from "../context/AssetContext";
import { useAuth } from "../auth/AuthContext";
import { useAppContext } from "../context/AppContext";


export default function Footer() {
  const {statusCount} = useAppContext()
  const { token } = useAuth(); 

  return(
    <div className="footer">
      {token &&
        <div className="d-flex justify-content-center">
          <StatusCount status="down-unscheduled" count={statusCount["down_unscheduled"]} />
          <StatusCount status="down-scheduled" count={statusCount["down_scheduled"]} />
          <StatusCount status="down-waiting" count={statusCount["down_waiting"]} />
          <StatusCount status="pending" count={statusCount["pending"]} />
        </div>
      }
      <hr className="footer-divider" />
    </div>
  );
}
