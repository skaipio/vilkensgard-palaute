import React, { Component } from 'react';
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
import './App.css';
import { getAllFeedback, validateToken } from './api';
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

  isTokenValid = async (token) => {
    const response = await validateToken(token);
    return response.valid;
  }

  async componentDidMount() {
    const query = window.location.search;
    const matches = query.match(/[&?]token=(.+)[&]?/i);
    let token = localStorage.getItem(localStorageKeys.token);
    if (matches && matches[1]) {
      token = matches[1];
      localStorage.setItem(localStorageKeys.token, token);
    }
    const tokenValid = await this.isTokenValid(token);
    if (tokenValid) {
      this.setState({
        tokenValid,
        feedbacks: await getAllFeedback()
      })
    } else {
      this.setState({
        tokenValid
      })
    }
  }

  render() {
    const Body = ({ tokenValid }) => {
      if (!tokenValid) return null;
      const setFeedbackToState = async () => {
        this.setState({
          ...this.state,
          feedbacks: await getAllFeedback()
        })
      }
      return (
        <div className="container">
          <FeedbackForm onFeedbackSubmit={setFeedbackToState} />
          <FeedbackList feedbacks={this.state.feedbacks} />
        </div>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Vilkensgard</h2>
          { this.state.tokenValid ? null : <h4>Sinulla ei ole pääsyä palveluun</h4> }
        </div>
        <Body tokenValid={ this.state.tokenValid } />
      </div>
    );
  }
}

export default App;
