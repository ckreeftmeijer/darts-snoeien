import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import Player from '../Player'
import Calculator from '../../components/Calculator'

import { usePrevious } from "../../hooks";
import { fetchGame, updatePlayerScore, resetGame } from '../../actions/Game'

import './styles.scss'

export const Home = ({ games, createGame, match, game, fetchGame, updatePlayerScore }) => {
  const prevName = usePrevious(match.params.name);
  const name = match.params.name

  useEffect(() => {
    if (name && (prevName !== name)) {
      fetchGame(name)
    }
  }, [name, prevName, fetchGame])

  const handleScoreUpdate = (score) => {
    const currentPlayer = game.players[game.currentPlayer]
    if (!currentPlayer) return
    const newScore = currentPlayer.score - score
    if (newScore < 0) return
    if (newScore === 0) finishGame()
    currentPlayer.score = newScore
    updatePlayerScore(currentPlayer, game.currentPlayer)
  }

  const finishGame = () => {
    resetGame(name)
  }

  return (
    <div className="container">
      <div className="col-5" />
      <div className="col-2 new-game padded-v--lg">
        {game ? game.name : 'No game found'}
        <div className="game-container container">
          {
            game
              ?
                game.players.map((player, i) =>
                  <div className={`col-${12 / game.players.length}`}>
                    <Player
                      name={player.name}
                      isCurrentPlayer={game.currentPlayer === i}
                      score={player.score}
                    />
                  </div>
                )
              : null
          }
          <hr className="col-12" style={{ color: 'white', width: 'calc(100% - 6px)'}} />
          <div className="col-12">
            <Calculator setScore={(score) => handleScoreUpdate(score)} />
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps({ game }) {
  return {
    game: game.game
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, {
    fetchGame,
    updatePlayerScore,
    resetGame
  })
)(Home);
