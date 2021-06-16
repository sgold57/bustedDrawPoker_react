import React, { Component } from 'react';
import './App.css';
import HandContainer from "./Components/HandContainer"


export default class App extends Component {

  state = {
    deckId: "",
    hand: [],
    dealCards: false,
    buttonClicked: false,
    cardsToSwap: []
  }
  
  componentDidMount(){
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=5")
      .then(response => response.json())
      .then(({ deck_id, cards }) => {
        this.setState({
          deckId: deck_id,
          hand: cards,
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
          let cardIndex = this.state.hand.findIndex(card => card === oldCard) 
          this.state.hand.splice(cardIndex, 1, cards[newCardsIndex]);
          this.setState({
            hand: this.state.hand
          })
          
          newCardsIndex++;
        })

        evaluateHand(this.state.hand);
      })

  function evaluateHand(hand) {
    console.log(hand)
    let valueArray = []
    let suitArray = []
    
    hand.forEach(card => {
      console.log(card)
      valueArray.push(card.code[0])
      suitArray.push(card.code[1])
    })

    let flushCheckSuit = suitArray[0];
    let straightCheck = numerateFaceCards(valueArray);

    console.log(checkForFlush(flushCheckSuit, suitArray))

  console.log(flushCheckSuit);
  console.log(straightCheck);

  

    return hand;

  }

  function numerateFaceCards(cardHand) {
    let numeratedFaceCards = []
    cardHand.forEach(value => {
      if(value === "0") {
        value = 10
      }else if (value === "J"){
        value = 11
      }else if(value === "Q"){
        value = 12
      }else if(value === "K"){
        value = 13
      }else if(value === "A"){
        value = 1
      } else {
        value = parseInt(value)
      }
      numeratedFaceCards.push(value)
      
    })
    let sortedNumeratedCards = numeratedFaceCards.sort()
    return sortedNumeratedCards;
  }

  function checkForFlush(suit, cardHand) {
    for (let i = 1; i < cardHand.length; i++){
      if(suit !== cardHand[i]){
        return false;
      }      
    }
    return true;
  }
    
}



  render(){
    return(
      <div className="App">
        <h1 className="title-header">BUSTED DRAW POKER</h1>
        {this.state.dealCards
          ? <HandContainer 
              deckId={this.state.deckId} 
              hand={this.state.hand} 
              handleHitClick={this.handleHitClick} 
            />
          : null 
        } 
        <button 
          className="hit-button" 
          style={ this.state.buttonClicked ? { display: 'none' } : { display: 'block'}} 
          onClick={() => {
            this.takeHit()
            this.setState({
              buttonClicked: true
            })
          }}
        >
          HIT FOR {this.state.cardsToSwap.length} CARDS
        </button>
      </div>
  );
  }
}


