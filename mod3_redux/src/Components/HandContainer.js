import React, { Component } from 'react';
import Card from "./Card";

export default class HandContainer extends Component {


componentDidMount(){
  
}

  render(){
    return(
      <div className="hand-div">
        {this.props.hand.map(card => 
          <Card 
            className="card-slot"
            key={card.code}
            card={card}
            cardImage={card.image} 
            cardAlt={card.code} 
            handleHitClick={this.props.handleHitClick} 
          />
        )}
      </div>
    )
  }
}