import { React, Component } from 'react';

export default class ResultContainer extends Component{

  componentDidMount(){
    console.log(this.props.finalHand);
  }

  render(){
    return (
      <h4 className="result-container">{
        this.props.evaluateHand(this.props.finalHand, this.props.straightHands)}
      </h4>
    )
  }

}