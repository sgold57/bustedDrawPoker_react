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
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=5")
      .then(response => response.json())
      .then(({ deck_id, cards }) => {
        this.setState({
          deckId: deck_id,
          startingHand: cards,
          dealCards: true
        })
      })
  }

  handleHitClick = (cardInfo, card) => {
    return this.state.cardsToSwap.find(card => card === cardInfo)
    ? null
    : this.setState({
        cardsToSwap: [...this.state.cardsToSwap, card]
      })
  }

  takeHit = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=${this.state.cardsToSwap.length}`)
      .then(response => response.json())
      .then(({ cards }) => {
        let newCardsIndex = 0
        this.state.cardsToSwap.forEach(oldCard => {
          console.log(oldCard)
          let cardIndex = this.state.startingHand.findIndex(card => card === oldCard) 
          this.state.startingHand.splice(cardIndex, 1, cards[newCardsIndex]);
          this.setState({
            startingHand: this.state.startingHand
          })
          
          newCardsIndex++;
        })
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
        <button className="hit-button" onClick={() => this.takeHit()}>
          HIT FOR {this.state.cardsToSwap.length} CARDS
        </button>
      </div>
  );
  }
}


