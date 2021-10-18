import React, { Component } from 'react';
import '../App.css';

export default class ScoreDiv extends Component {


  render(){
    return(
      <div className='score-div'>{`SCORE: ${this.props.score}`}</div>

    )
  }

}