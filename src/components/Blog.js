import React, { Component } from 'react';

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      message: "Class Components state",
      transformedMessage: "Class Components state", // Separate state for the transformed message
    };
  }

  changeState(state) {
    const newState = this.changeStateNew(state); // Use changeStateNew to transform the state
    this.setState({
    //   message: state,
      transformedMessage: newState, // Update the transformed message in state
    });
  }

  changeStateNew(state) {
    return `Updated: ${state}`; // Modify or transform the state
  }

  render() {
    return (
      <>
        <h4>{this.state.transformedMessage}</h4> {/* Display transformed message */}
        Blog Component: <b>{this.state.message}</b>
        <button onClick={() => this.changeState("Class Components state Updated")}>
          Update State
        </button>
      </>
    );
  }
}

export default Blog;
