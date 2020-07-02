import React, { Component } from "react";
import JobsSearch from "../component/JobsSearch";
import JobsListItem from "../component/JobsListItem";
import axios from "axios";
import ReactPaginate from "react-paginate";

export class JobList extends Component {
  state = {
    jobs_list: false,
    job_desc: "",
    job_loc: "",
    is_full_time: false,
    is_load: false,

    offset: 0,
    data: [],
    perPage: 10,
    currentPage: 0,
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSearch = () => {
    this.receivedData();
    this.setState({ currentPage: 0, offset: 0 });
  };
  receivedData = () => {
    const { job_loc, job_desc, is_full_time } = this.state;
    this.setState({
      is_load: true,
    });
    axios
      .get("https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json")
      .then((response) => {
        let data = response.data;
        if (job_loc !== "") {
          data = data.filter((job) =>
            job.location.toLowerCase().includes(job_loc)
          );
        }
        if (job_desc !== "") {
          data = data.filter((job) =>
            job.description.toLowerCase().includes(job_desc)
          );
        }
        if (is_full_time) {
          data = data.filter((job) => job.type === "Full Time");
        }
        const slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          is_load: false,
          jobs_list: slice,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData();
  }

  render() {
    const { job_desc, job_loc, jobs_list, is_load } = this.state;
    return (
      <div className="job-list">
        <JobsSearch
          job_desc={job_desc}
          job_loc={job_loc}
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
        />
        <div className="list-group">
          <div className="list-group-item active">
            <h4 className="job-list-title">Job List</h4>
          </div>
          {jobs_list && !is_load
            ? jobs_list.map((job) => {
                return (
                  <a href={`/job/${job.id}`} key={job.id}>
                    <JobsListItem
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      type={job.type}
                    />
                  </a>
                );
              })
            : "Loading..."}

          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            initialPage={0}
            forcePage={this.state.currentPage}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

export default JobList;
