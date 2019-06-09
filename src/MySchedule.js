import React, { Component } from 'react';
import { db } from "./firebase";

class MySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
        myClasses: [],
    };
  }

  componentDidMount() {
    this.refreshItems();
  }

  refreshItems() {
    if (this.props.getUser()) {
      var collectionRef = db.collection("student-classes");
      var query = collectionRef.where("username", "==", this.props.getUser().email);
      let enrolledClasses = [];
      query.get().then((results) => {
        if (results.size > 0) {
          results.docs.map((doc) => {
            enrolledClasses.push({
              record_id: doc.id,
              class_id: doc.data().class_id,
              /* Add code below this comment to also load 
              the short_summary from the database */
              short_summary: doc.data().short_summary,
            });
          });
        }
        this.setState({myClasses: enrolledClasses});
      });
    }
  }

  removeClass(record_id) {
    db.collection("student-classes").doc(record_id).delete().then(() => {
        this.refreshItems();
    }).catch(function(error) {
        console.error("Error removing document: " + record_id, error);
    });
  }

  listClasses() {
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
      backgroundColor: "#57575c",
      color: "white",
      height: "25%",
      fontSize: "22px",
      fontFamily: "'Mukta', sans-serif",
      textAlign: "center"
    };

    const bodyStyle = {
      padding: "10px",
    };

    let listOfClasses = [];
    let id = 0;
    for (let theClass of this.state.myClasses) {
      listOfClasses.push(
        <li style={liStyle} key={theClass.record_id}>
          <div style={headingStyle}>{theClass.class_id}</div>
          <div style={bodyStyle}>
            {/* Add code here to display the short_summary on the schedule*/}
            <p>{theClass.short_summary}</p>
            <button onClick={() => {this.removeClass(theClass.record_id)}}>Remove</button>
          </div>
        </li>
      );
      id++;
    }
    return listOfClasses;
  }

  render() {
    const ulStyle = {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: "70px",
      padding: "50"
    };

    if (this.props.getUser()) {
      return (
        <div>
        <div className="black-page-banner"> My Schedule </div>
        <ul style={ulStyle}>
          {this.listClasses()}
        </ul>
        </div>
      );
    }
    else {
      return (
        <p>Log in to see your classes</p>
      );
    }
  }
}

export default MySchedule;
