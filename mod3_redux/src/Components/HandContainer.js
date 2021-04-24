import React, { Component } from 'react';
import Card from "./Card";

export default class HandContainer extends Component {


componentDidMount(){
}

  render(){
    return(
      <div className="hand-div">
        {this.props.startingHand.map(card => 
          <Card 
            key={card.code}
            cardImage={card.image} 
            cardAlt={card.code} 
            handleHitClick={this.props.handleHitClick} 
          />
        )}
      </div>
    )
  }
}