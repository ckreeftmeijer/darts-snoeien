import React from 'react'
import { connect } from "react-redux";

import { fetchGame } from '../../actions/Game'

import './styles.scss'

export const Player = ({ isCurrentPlayer, name, score }) => {
  return (
    <div className="player">
      <div>
        {name}
        <span className={`player__current ${isCurrentPlayer ? 'player__current--active' : ''}`} />
      </div>
      {score}
    </div>
  )
}

function mapStateToProps({ game }) {
  return {
    game: game.game
  };
}

export default connect(mapStateToProps, {
    fetchGame
  })
(Player);
