import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Loading from "./Loading";
import Header from "./Header";

import "../Styling/Cases.css";

export default function Cases() {
  const [thisCase, set_thisCase] = useState([]);
  const [banner, set_banner] = useState();
  const [twoColumn, set_twoColumn] = useState([]);
  const [threeColumn, set_threeColumn] = useState();
  const [image, set_image] = useState();
  const [fwImage, set_fwImage] = useState([]);

  const params = useParams();
  const caseId = params.caseId;

  const fetchCase = async () => {
    console.log("hello from fetchCase");
    await axios
      .get(`https://www.brutcommunicatie.nl/wp-json/wp/v2/cases/${caseId}`)
      .then((c) => set_thisCase(c.data.acf.cases_content));
  };

  useEffect(() => {
    fetchCase();
    console.log("hello from useEffect");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("hello from useEffect2");
    acfParser();
    // eslint-disable-next-line
  }, [thisCase]);

  const acfParser = () => {
    const twoColumnArray = [];
    const threeColumnArray = [];
    const singleImage = [];
    console.log("cases", thisCase);
    thisCase.forEach((c) => {
      switch (c.acf_fc_layout) {
        case "case_banner":
          set_banner(c.case_banner_image);
          break;
        case "case_two_column_layout":
          twoColumnArray.push(c.case_left_column, c.case_right_column);
          break;
        case "case_three_column_layout":
          threeColumnArray.push(
            c.case_3_left_column,
            c.case_3_middle_column,
            c.case_3_right_column
          );
          break;
        case "single_image":
          singleImage.push(c.case_single_image);
          break;
        case "full_width_image":
          set_fwImage(c.case_full_width_image);
          break;
        default:
      }
      set_twoColumn(twoColumnArray);
      set_threeColumn(threeColumnArray);
      set_image(singleImage);
    });
  };
  console.log("image", image);
  return (
    <div>
      <Header />
      {twoColumn.length > 0 ? (
        <div>
          <div className="banner">
            <img
              alt={banner.title}
              src={banner.url}
              width={banner.width}
              height={banner.height}
            />
          </div>
          {/* <div className="columns"> */}
          <div className="twoColumn">
            {twoColumn.map((c, i) => {
              return (
                <div key={i} className="twoColumnContent">
                  {ReactHtmlParser(c)}
                </div>
              );
            })}
          </div>

          <div className="threeColumn">
            {threeColumn.map((c, i) => {
              return (
                <div key={i} className="threeColumnContent">
                  {ReactHtmlParser(c)}
                </div>
              );
            })}
          </div>
          {/* </div> */}

          <div className="imageContainer">
            <img
              alt={fwImage.title}
              src={fwImage.url}
              className="image"
              width={fwImage.width}
              height={fwImage.height}
            />
            {console.log("image", image)}
            {image.map((img) => {
              return (
                <img
                  key={img.id}
                  alt={img.title}
                  src={img.url}
                  height={img.height}
                  width={img.width}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
