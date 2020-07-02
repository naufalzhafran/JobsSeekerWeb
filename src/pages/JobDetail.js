import React, { Component } from "react";
import axios from "axios";

export class JobDetail extends Component {
  state = {
    job_detail: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/jobs.github.com/positions/${id}.json`
      )
      .then((response) => {
        const data = response.data;
        this.setState({
          job_detail: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { job_detail } = this.state;

    return (
      <div className="detail-page">
        <a className="back-btn btn-primary btn" href="/jobs">
          {" "}
          Back to Jobs
        </a>
        {job_detail ? (
          <div className="job-detail">
            <div className="job-detail-title-group">
              <h6>
                {job_detail.type} / {job_detail.location}
              </h6>
              <h1>{job_detail.title}</h1>
            </div>
            <hr className="solid"></hr>
            <div className="job-detail-content-group">
              <div
                dangerouslySetInnerHTML={{ __html: job_detail.description }}
                className="job-desc"
              />
              <div className="job-other-info">
                <div className="company-identity">
                  <a href={job_detail.company_url} className="font-weight-bold">
                    {job_detail.company}
                  </a>
                  <img src={job_detail.company_logo} alt="logo" />
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: job_detail.how_to_apply }}
                  className="job-apply"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="job-detail">Loading...</div>
        )}
      </div>
    );
  }
}

export default JobDetail;
