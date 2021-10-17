import { React, Component } from 'react';
import '../App.css'

export default class ResultContainer extends Component{


  render(){
    return (
      <div>
        <h4 className="result-container">{
          this.props.evaluateHand(this.props.finalHand, this.props.straightHands)}
        </h4>
        {this.props.numHands === 0 ?
          <div>GAME OVER</div> :
          <button className='next-hand-button' onClick={() => this.props.newHand()}>NEXT HAND</button>
      }

      </div>
    )
  }

}