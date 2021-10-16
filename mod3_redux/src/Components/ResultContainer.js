import { React, Component } from 'react';

export default class ResultContainer extends Component{


  render(){
    return (
      <h4 className="result-container">{
        this.props.evaluateHand(this.props.finalHand, this.props.straightHands)}
      </h4>
    )
  }

}