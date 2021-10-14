import React, { Component } from 'react';
import '../App.css';


export default class GameStart extends Component {

render(){
  return (
    <div>
        <form action="/newGame">
          <label for='numHands'>How many hands would you like to play?</label>
          <select name='numHands'>
              <option value='1'>1</option>
              <option value='3'>3</option>
              <option value='5'>5</option>
            </select>
            <input type='submit' value='Play!' />
        </form>
    </div>
  )
}


}

// for='numHands'