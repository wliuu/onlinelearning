import React, { Component } from 'react';
import Modal from 'react-modal';
import {db} from './firebase.js';

Modal.setAppElement(document.getElementById('root'));

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.enroll = this.enroll.bind(this);
  }

  close() {
    this.props.hideModalHandler();
  }

  enroll() {
    db.collection("student-classes").add({
        username: this.props.getUser().email,
        class_id: this.props.selectedCourse.class_id,
        /* Add code below this comment to also store the
        short_summary of the selected course in the database */
        short_summary: this.props.selectedCourse.short_summary,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    this.close();
  }

  render() {
    return (
      <Modal overlayClassName='classDetailsDialog' isOpen={this.props.showModal}>
        <div>
          {this.props.selectedCourse ?
            <React.Fragment>
              <h2>
                {this.props.selectedCourse.name}: &nbsp;
                {this.props.selectedCourse.short_summary}
              </h2>
              <b>Instructor: {this.props.selectedCourse.teacher}</b>
              <p>{this.props.selectedCourse.description}</p>
              <div className="btn-holder">
                {this.props.getUser() ?
                  <React.Fragment>
                    <button onClick={this.enroll}>Enroll</button>
                    <div className="divider"/>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <div>Log in to enroll</div>
                    <div className="divider"/>
                  </React.Fragment>
                }
                <button onClick={this.close}>Close</button>
              </div>
            </React.Fragment>
            :
            <React.Fragment><div></div></React.Fragment>
          }
        </div>
      </Modal>
    );
  }
}

export default CourseDetails;
