import React, { Component } from "react";

export class JobsSearch extends Component {
  render() {
    const { job_desc, job_loc, handleChange, handleSearch } = this.props;
    return (
      <div className="job-search">
        <div className="form-group fill-form">
          <label className="font-weight-bold">Job Description</label>
          <input
            type="text"
            className="form-control"
            value={job_desc}
            placeholder="Any Description"
            onChange={(e) => handleChange(e.target.value, "job_desc")}
          />
        </div>
        <div className="form-group fill-form">
          <label className="font-weight-bold">Location</label>
          <input
            type="text"
            className="form-control"
            value={job_loc}
            placeholder="City, State or Country"
            onChange={(e) => handleChange(e.target.value, "job_loc")}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input "
            onClick={(e) => handleChange(e.target.checked, "is_full_time")}
          />
          <label className="form-check-label font-weight-bold">Full time Only</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary search-btn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default JobsSearch;
