import React, { Component } from 'react';
import "./App.css"

class TopicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '*'};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.submitHandler(event.target.value);
  }

  render() {
    const labelStyle = {
      "fontSize": "32px",
      color: "white",
      textAlign: "center",
    };

    const selectStyle = {
      "fontSize": "20px",
    };

    return (
      <div className="topic-selector">
        <label style={labelStyle}>
          Browse course listings by topic:&nbsp;
          <select style={selectStyle} value={this.state.value} onChange={this.handleChange}>
            <option value="">Select a topic</option>
            <option value="art">Art</option>
            <option value="math">Math</option>
            <option value="pe">Physical Education</option>
            <option value="technology">Technology</option>
            <option value="writing">Writing</option>
          </select>
        </label>
      </div>
    );
  }
}

export default TopicForm;