import { React, Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.css'

export default class ResultContainer extends Component{


  render(){
    return (
      <div>
        <h4 className="result-container">{
          this.props.evaluateHand(this.props.finalHand, this.props.straightHands)}
        </h4>
        {this.props.numHands === 0 ?
          <form action='/'>
            <input type='submit' value='play again' />
          </form> :
          // <button className='next-hand-button'>
          //   <Link to='/'>GAME OVER...Play again?</Link> 
          // </button> :
          <button className='next-hand-button' onClick={() => this.props.newHand()}>NEXT HAND</button>
      }

      </div>
    )
  }

}