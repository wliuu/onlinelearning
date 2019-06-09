import React, { Component } from 'react';
import "./App.css"

class CourseListingsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
    };
  }

  onCourseClick(course) {
    this.props.courseClickHandler(course);
  }

  renderCourseListings() {
    const liStyle = {
      width: "40%",
      listStyleType: "none",
      marginRight: "55px",
      marginLeft: "15px",
      marginTop: "15px",
      backgroundColor: "rgb(237, 237, 237)",
      color: "#000",
      marginBottom: "40px",
      boxShadow: "0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.12), 0 1px 8px 0 rgba(0,0,0,.2)"
    };

    const headingStyle = {
      backgroundColor: "#fa6900",
      color: "white",
      height: "25%",
      fontSize: "22px",
      fontFamily: "'Mukta', sans-serif",
      textAlign: "center"
    };

    const bodyStyle = {
      padding: "10px",
    };

    let listOfCourses = [];
    for (let theCourse of this.props.coursesForTopic) {
      listOfCourses.push(
        <li style={liStyle} key={theCourse.record_id}>
          <div style={headingStyle}>{theCourse.class_id}</div>
          <div style={bodyStyle}>
            <p>{theCourse.short_summary}</p>
            <button className="course-number-button"
              onClick={() => this.onCourseClick(theCourse)}>Details ...</button>
          </div>
        </li>
      );
    }
    return listOfCourses;
  }

  render() {
    const ulStyle = {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: "70px",
      padding: "50"
    };

    return (
      <ul style={ulStyle}>
        {this.renderCourseListings()}
      </ul>
    );
  }
}

export default CourseListingsTable;
