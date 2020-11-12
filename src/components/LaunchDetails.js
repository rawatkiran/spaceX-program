import React from "react";
import "./LaunchDetails.css";

function LaunchDetails({ details }) {
  const {
    flight_number,
    mission_name,
    mission_id,
    launch_year,
    launch_success,
    links,
    rocket,
  } = details;
  const imgSrc = links.mission_patch_small;
  const land_success = rocket.first_stage.cores[0].land_success;

  return (
      <div key={flight_number}>
        <div>
          <img
            src={imgSrc}
            width={300}
            height={210}
            alt="img not available on api"
            className="Launch-mission-image"
          />
        </div>
        <div className="Launch-mission-name-flight-number">
          {mission_name} #{flight_number}
        </div>
        <div className="Launch-detail-label">
          Mission Ids:{" "}
          <ul>
            {" "}
            <li className="Launch-detail-value">{mission_id}</li>
          </ul>
        </div>
        <div className="Launch-detail-label">
          Launch Year:{" "}
          <span className="Launch-detail-value">{launch_year}</span>
        </div>
        <div className="Launch-detail-label">
          Successful Launch:{" "}
          <span className="Launch-detail-value">
            {launch_success ? "true" : "false"}
          </span>
        </div>
        <div className="Launch-detail-label">
          Successful Landing:{" "}
          <span className="Launch-detail-value">
            {land_success ? "true" : "false"}
          </span>
        </div>
      </div>
  );
}

export default LaunchDetails;
