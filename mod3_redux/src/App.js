import React, { Component } from 'react';
import './App.css';
import HandContainer from "./Components/HandContainer"


export default class App extends Component {

  state = {
    deckId: "",
    startingHand: [],
    dealCards: false,
    cardsToSwap: []
  }
  
  componentDidMount(){
    fetch("http://localhost:8080/new")
      .then(response => response.json())
      .then(({ deck_id, cards }) => {
        this.setState({
          deckId: deck_id,
          startingHand: cards,
          dealCards: true
        })
      })
  }

  handleHitClick = (cardInfo) => {
    this.setState({
      cardsToSwap: [...this.state.cardsToSwap, cardInfo]
    })
  }


  render(){
    return(
      <div className="App">
        <h1 className="title-header">BUSTED DRAW POKER</h1>
        {this.state.dealCards
          ? <HandContainer 
              deckId={this.state.deckId} 
              startingHand={this.state.startingHand} 
              handleHitClick={this.handleHitClick} 
            />
          : null 
        }
      </div>
  );
  }
}


