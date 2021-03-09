import React from "react";
import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router-dom";

import "../Styling/CaseCard.css";

export default function CaseCard(info) {
  const history = useHistory();

  const onClickHandler = (c) => {
    history.push(`/case/${c}`);
  };

  return (
    <div className="card">
      <h3 className="cardHeader">
        {ReactHtmlParser(info.case.acf.case_heading)}
      </h3>
      {info.case.acf.case_logo.link ? (
        <img
          src={info.case.acf.case_logo.link}
          alt={info.case.acf.case_logo.title}
          width="100px"
          max-heigth="100px"
        />
      ) : (
        <img
          src={info.case.acf.cases_content[0].case_banner_image.link}
          alt={info.case.acf.cases_content[0].case_banner_image.title}
          width="100px"
          max-heigth="100px"
        />
      )}
      <div className="cardContent">
        <>
          {info.case.acf.cases_content[3].case_right_column
            ? ReactHtmlParser(info.case.acf.cases_content[3].case_right_column)
            : ReactHtmlParser(
                info.case.acf.cases_content[3].case_3_right_column
              )}
        </>
      </div>
      <button className="btn" onClick={() => onClickHandler(info.case.id)}>
        <>Bekijk de case</>
      </button>
    </div>
  );
}
