import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupButton } from 'reactstrap';
import { postFeedback } from './api';

export default class FeedbackForm extends Component {
  state = {}

  sendFeedback = async (event) => {
    event.preventDefault();
    const result = await postFeedback(this.state.feedback);   
    if (result) {
      this.props.onFeedbackSubmit()
    } else {
      console.error("Couldn't send feedback");
    }    
  }

  setFeedback = (e) => {
    const feedback = e.target.value;
    this.setState({ feedback });
  }

  render() {
    const { onFeedbackSubmit, ...rest } = this.props;
    return (
      <Form {...rest} onSubmit={ this.sendFeedback }>
        <FormGroup>
          <InputGroup>
            <Input placeholder="palaute" type="text" value={this.state.feedback} onChange={ this.setFeedback } />
            <InputGroupButton><Button type="submit" color="primary">Lähetä</Button></InputGroupButton>
          </InputGroup> 
        </FormGroup>
      </Form>
    )
  }
}