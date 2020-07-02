import React from "react";

const JobsListItem = ({ title, location, company, type }) => {
  return (
    <div className="list-group-item">
      <div className="left-item">
        <h5 className="font-weight-bolder">{title}</h5>
        <h6>
          {company} - {type}
        </h6>
      </div>
      <div className="right-item">
        <h6>{location}</h6>
      </div>
    </div>
  );
};

export default JobsListItem;
