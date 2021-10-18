import { React, Component } from 'react';
import '../App.css'

export default class ResultContainer extends Component{


  render(){
    return (
      <div>
        <h4 className="result-container">{
          this.props.finalHandResult}
        </h4>
        {this.props.numHands === 0 ?
          <form  className='new-game-button' action='/'>
            <input type='submit' value='Play Again?' />
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


// this.props.evaluateHand(this.props.finalHand, this.props.straightHands)