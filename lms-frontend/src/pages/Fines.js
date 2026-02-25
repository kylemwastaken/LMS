import React, { useEffect, useState } from "react";
import api from "../services/api";

function Fines() {
  const [fines, setFines] = useState([]);

  useEffect(() => {
    api.get("/fines").then(res => setFines(res.data));
  }, []);

  return (
    <div>
      <h2>Fines</h2>
      <ul>
        {fines.map(f => (
          <li key={f.fineId}>
            Borrowing #{f.borrowingId} - ${f.amount} ({f.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fines;
