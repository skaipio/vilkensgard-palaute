import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './App.css';
import { getAllFeedback } from './api';
import FeedbackForm from './FeedbackForm';

const FeedbackList = ({ feedbacks = [] }) =>
  <ListGroup>
  {
    feedbacks.map(feedback => <ListGroupItem key={feedback.key}>{feedback.feedback}</ListGroupItem>)
  }
  </ListGroup>


class App extends Component {
  state = {
    feedbacks: []
  }

  getFeedbackToState = async () => {
    const feedbacks = await getAllFeedback();
    this.setState({
      feedbacks
    })
  }

  componentDidMount() {
    this.getFeedbackToState();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Vilkensgard</h2>
        </div>
        <div className="container">
          <FeedbackForm onFeedbackSubmit={this.getFeedbackToState} />
          <FeedbackList feedbacks={this.state.feedbacks} />
        </div>
      </div>
    );
  }
}

export default App;
