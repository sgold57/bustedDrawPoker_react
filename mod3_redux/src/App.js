import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';


export default class App extends Component {


  render(){
    return(
      <div>
        <h1 className='title-header'>BUSTED DRAW POKER</h1>
        <form>
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