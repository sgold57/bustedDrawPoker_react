import React, { Component } from 'react';
import './App.css';
import HandContainer from "./Components/HandContainer";
import ResultContainer from "./Components/ResultContainer";



export default class App extends Component {

  state = {
    deckId: "",
    hand: [],
    dealCards: false,
    buttonClicked: false,
    cardsToSwap: [],
    straightHands: [
      '2,3,4,5,A',
      '2,3,4,5,6',
      '3,4,5,6,7',
      '4,5,6,7,8',
      '5,6,7,8,9',
      '0,6,7,8,9',
      '0,7,8,9,J',
      '0,8,9,J,Q',
      '0,9,J,K,Q',
      '0,A,J,K,Q'
    ],
    finalHand: ""

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

  handleHitClick = (cardCode, card) => {

    if (this.state.cardsToSwap.find(card => card.code === cardCode)){
      return this.setState({
        cardsToSwap: this.state.cardsToSwap.filter(card => card.code !== cardCode)
      })
    } else {
      return this.setState({
        cardsToSwap: [...this.state.cardsToSwap, card]
      })
    }
    
  }

  takeHit = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=${this.state.cardsToSwap.length}`)
      .then(response => response.json())
      .then(({ cards }) => {
        let newCardsIndex = 0
        this.state.cardsToSwap.forEach(oldCard => {
          let cardIndex = this.state.hand.findIndex(card => card === oldCard) 
          this.state.hand.splice(cardIndex, 1, cards[newCardsIndex]);
    
          
          newCardsIndex++;
        })

        this.setState({
          buttonClicked: !this.state.buttonClicked,
        })

        
      })
  }

  evaluateHand = (hand, straightHands) => {
    let handResult = "";
    let valueArray = [];
    let valueBreakdown = {};
    let suitArray = [];
    
    hand.forEach(card => {
      valueArray.push(card.code[0])
      suitArray.push(card.code[1])
    })

    let flushCheckSuit = suitArray[0];
    let forStraightCheck = valueArray.sort();
    let flush = checkForFlush(flushCheckSuit, suitArray);
    let valueFrequencies = breakdownValues(valueArray, valueBreakdown);
    let valueEvaluation = pairTwoPairTripsBoatCheck(valueFrequencies, forStraightCheck, straightHands);
  

    if (flush && valueEvaluation === "STRAIGHT"){
      handResult = "STRAIGHT FLUSH"
    } else if (flush) {
      handResult = "FLUSH"
    } else {
      handResult = valueEvaluation
    }
  return handResult;


  function checkForFlush(suit, cardHand) {
    for (let i = 1; i < cardHand.length; i++){
      if(suit !== cardHand[i]){
        return false;
      }      
    }
    return true;
  }

  function breakdownValues(valueArray, valueBreakdown){
    valueArray.forEach(value => {
      Object.keys(valueBreakdown).find(element => element === value)
        ? valueBreakdown[value]++
        : valueBreakdown[value] = 1;   
      })
      
    return valueBreakdown;
  }

  function pairTwoPairTripsBoatCheck(valueFrequencies, forStraightCheck, straightHands){
    let pairs = Object.values(valueFrequencies).filter(value => value === 2).length;
    let trips = Object.values(valueFrequencies).filter(value => value === 3).length;
    let quads = Object.values(valueFrequencies).filter(value => value === 4).length;
    
    if (quads === 1){
      return "QUADS";
    } else if (trips === 1) {
      if (pairs === 1) {
        return "FULL HOUSE";
      } else {
        return "TRIPS";
      }
    } else if (pairs === 2){
      return "TWO PAIR"
    } else if (pairs === 1){
        return "PAIR"
    } else {
      return straightCheck(forStraightCheck, straightHands);
    }

  }
    
  function straightCheck(array, straightHands){    
    if (straightHands.find(hand => hand === array.toString())) {
      return "STRAIGHT"
    } else {
      return "NO HAND"
    }
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
              buttonClicked={this.state.buttonClicked}
            />
          : null 
        } 
        <button 
          className="hit-button" 
          style={ this.state.buttonClicked ? { display: 'none' } : { display: 'block'}} 
          onClick={() => this.takeHit()}
            // let handResult = this.evaluateHand(this.state.hand, this.state.straightHands);

            // console.log(handResult)
            // console.log(this.state)
        >
          HIT FOR {this.state.cardsToSwap.length} CARDS
        </button>
        {this.state.buttonClicked
          ? <ResultContainer 
              evaluateHand={this.evaluateHand} 
              finalHand={this.state.hand} 
              straightHands={this.state.straightHands} 
            />
          : null}
      </div>
  );
  }
}




  // MAYBE DON'T NEED THIS BECAUSE OF HOW SORT FUNCTION WORKS W/ DEFAULT VALUES

  // function numerateFaceCards(cardHand) {
  //   let numeratedFaceCards = []
  //   cardHand.forEach(value => {
  //     if(value === "0") {
  //       value = 10
  //     }else if (value === "J"){
  //       value = 11
  //     }else if(value === "Q"){
  //       value = 12
  //     }else if(value === "K"){
  //       value = 13
  //     }else if(value === "A"){
  //       value = 1
  //     } else {
  //       value = parseInt(value)
  //     }
  //     numeratedFaceCards.push(value)
      
  //   })
  //   let sortedNumeratedCards = numeratedFaceCards.sort()
  //   return sortedNumeratedCards;
  // }

  // let straightCheck = numerateFaceCards(valueArray);