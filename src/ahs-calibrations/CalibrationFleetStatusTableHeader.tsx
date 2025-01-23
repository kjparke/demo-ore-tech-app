import "./ahs.css";

export default function CalibrationFleetStatusTableHeader() {
  return (
    <thead className="table-dark">
      <tr>
        <th scope="col">Unit</th>
        <th scope="col">Location</th>
        <th scope="col">Swingable</th>
        <th scope="col">CALS</th>
        <th scope="col" className="fixed-width">Radar</th>
        <th scope="col" className="fixed-width">ARM/Steer Sol.</th>
        <th scope="col" className="fixed-width">Brake Sol.</th>
        <th scope="col" className="fixed-width">GAMS</th>
        <th scope="col" className="fixed-width">Pos./Survey</th>
        <th scope="col" className="fixed-width">Percep. Cals</th>
        <th scope="col" className="fixed-width">Plan. Check SA</th>
        <th scope="col" className="fixed-width">Plan. Check Steer</th>
        <th scope="col" className="fixed-width">Plan. Check Brake</th>
        <th scope="col" className="fixed-width">Plan. Check Incycle</th>
      </tr>
    </thead>
  );
}
