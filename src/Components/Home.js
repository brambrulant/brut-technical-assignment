import { useEffect, useState } from "react";
import CaseCard from "./CaseCard";
import Loading from "./Loading";
import Header from "./Header";

import "../Styling/App.css";
import "../Styling/Buttons.css";
import "../Styling/Header.css";

const axios = require("axios");

function App() {
  const [cases, set_cases] = useState([]);

  async function getUser() {
    try {
      const response = await axios.get(
        "https://www.brutcommunicatie.nl/wp-json/wp/v2/cases"
      );
      console.log("response", response.data);
      set_cases(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        {cases.length > 0 ? (
          cases.map((c) => {
            return <CaseCard key={c.id} case={c} />;
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default App;
