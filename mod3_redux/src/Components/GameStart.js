import React, { Component } from 'react';
import GameStartPhoto from '../Images/gameStartPhoto.png';
import '../App.css';


export default class GameStart extends Component {

render(){
  return (
    <div>
        <img id='game-start-photo' src={GameStartPhoto} alt='Revolver'></img>
        <form className='game-start-form' action="/newGame">
          <label className='game-start-text'>How many hands would you like to play?</label>
          <select className='game-start-select' name='numHands'>
              <option value='1'>1</option>
              <option value='3'>3</option>
              <option value='5'>5</option>
          </select>
          <input className='game-start-submit' type='submit' value='Play!' />
        </form>
    </div>
  )
}


}

// for='numHands'