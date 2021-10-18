import React, { Component } from 'react';
import '../App.css';
import HandContainer from './HandContainer';
import ResultContainer from './ResultContainer';
import ScoreDiv from './ScoreDiv';


export default class Game extends Component {

  state = {
    deckId: "",
    hand: [],
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
    finalHandResult: "",
    numHands: undefined,
    gameInProgress: false,
    score: 0

  }
  
  componentDidMount(){
    this.newHand()
  }
  
  newHand = () => {
    
    if (!this.state.gameInProgress){
      fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=5")
      .then(response => response.json())
      .then(({ deck_id, cards }) => {
        let params = new URLSearchParams(window.location.search);
        let numHands = params.get('numHands')
        
          return this.setState({
            numHands: +numHands - 1,
            deckId: deck_id,
            hand: cards,
            gameInProgress: true
          })
        })    
    } else {
      let handsLeft = this.state.numHands;
      handsLeft--

      fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/shuffle/`)
        .then(response => response.json())
        .then(newDeck => console.log(newDeck))
      
      fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=5`)
        .then(response => response.json())
        .then(({ cards }) => {
          return this.setState({
            numHands: handsLeft,
            hand: cards,
            buttonClicked: !this.state.buttonClicked,
            cardsToSwap: [],
          })
        });



    }
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

        let handOutcome = this.evaluateHand(this.state.hand, this.state.straightHands);


        this.setState({
          buttonClicked: !this.state.buttonClicked,
          score: this.state.score + handOutcome[1],
          finalHandResult: handOutcome[0]

          
        })

        
      })
  }

  evaluateHand = (hand, straightHands) => {
    let handResult = "";
    let valueArray = [];
    let valueBreakdown = {};
    let suitArray = [];
    let handScore = 0;

    console.log(hand)
    
    hand.forEach(card => {
      valueArray.push(card.code[0])
      suitArray.push(card.code[1])
    })

    let flushCheckSuit = suitArray[0];
    let forStraightCheck = valueArray.sort();
    console.log(forStraightCheck)
    let flush = checkForFlush(flushCheckSuit, suitArray);
    let valueFrequencies = breakdownValues(valueArray, valueBreakdown);
    let valueEvaluation = pairTwoPairTripsBoatCheck(valueFrequencies, forStraightCheck, straightHands);
  

    if (flush && valueEvaluation === "STRAIGHT"){
      handScore = 25;
      handResult = "STRAIGHT FLUSH (+25 PTS)"
    } else if (flush) {
      handScore = 7;
      handResult = "FLUSH (+7 PTS)"
    } else {
      handResult = valueEvaluation
    } 
  return [handResult, handScore];


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
      handScore = 20;
      return "QUADS (+20 PTS)";
    } else if (trips === 1) {
      if (pairs === 1) {
        handScore = 10;

        return "FULL HOUSE (+10 PTS)";
      } else {
        handScore = 3;

        return "TRIPS (+3 PTS)";
      }
    } else if (pairs === 2){
        handScore = 2;
        return "TWO PAIR (+2 PTS)"
    } else if (pairs === 1){
        handScore = 1;
        return "PAIR (+1 PT)"
    } else {
        return straightCheck(forStraightCheck, straightHands);
    }

  }
    
  function straightCheck(array, straightHands){    
    if (straightHands.find(hand => hand === array.toString())) {
      handScore = 5;

      return "STRAIGHT (+5 PTS)"
    } else {
      return "NO HAND"
    }
  }

}

// nextHand = () => {
//   let presentHand = this.state.numHands;
//   presentHand--;
//   console.log(presentHand)
//   return this.setState({ 
//     numHands: presentHand,
//     buttonClicked: false,
//     hand: [],
//    });
// }


  render(){
    return(
      <div className="App">
        <HandContainer 
          deckId={this.state.deckId} 
          hand={this.state.hand} 
          handleHitClick={this.handleHitClick}             
          buttonClicked={this.state.buttonClicked}
        />
        <ScoreDiv score={this.state.score} />
        <button 
          className="hit-button" 
          style={ this.state.buttonClicked ? 
                  { display: 'none' } : 
                  { display: 'block'}
                }
          onClick={() => {
            this.takeHit();
          }
          }
        >
          HIT FOR {this.state.cardsToSwap.length} CARDS
        </button>
        {this.state.buttonClicked
          ? <ResultContainer 
              evaluateHand={this.evaluateHand} 
              finalHand={this.state.hand} 
              straightHands={this.state.straightHands} 
              numHands={this.state.numHands}
              newHand={this.newHand}
              finalHandResult= {this.state.finalHandResult}
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

