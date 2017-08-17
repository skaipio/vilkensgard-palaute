import React, { Component } from 'react';
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
import './App.css';
import { getAllFeedback } from './api';
import FeedbackForm from './FeedbackForm';
import { localStorageKeys } from './config';

const FeedbackList = ({ feedbacks = [] }) =>
  <ListGroup>
  {
    feedbacks.map(feedback => <ListGroupItem className="justify-content-between" key={feedback.key}>
      {feedback.feedback}
      <Badge color="info">{ new Date(feedback.timestamp).toLocaleDateString('fi') }</Badge>
    </ListGroupItem>)
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
    const query = window.location.search;
    const matches = query.match(/[&?]token=(.+)[&]?/i);
    if (matches && matches[1]) {
      localStorage.setItem(localStorageKeys.token, matches[1]);
    }
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
