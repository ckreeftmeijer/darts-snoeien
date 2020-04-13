import React from 'react'
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";

import Player from '../Player'
import Calculator from '../../components/Calculator'

import { fetchGame, updateGameSocket, resetGame, updateGame } from '../../actions/Game'

import './styles.scss'

let socket

class Home extends React.Component {
  constructor(props) {
    super(props)
    socket = io.connect("http://localhost:8080");

    socket.on("gameUpdated", res => {
      this.props.updateGame(res)
    });
  }

  componentDidMount() {
    const name = this.props.match.params.name
    if (name) this.props.fetchGame(name)
  }

  componentWillUnmount() {
    socket.disconnect()
    alert("Disconnecting Socket as component will unmount")
  }

  handleScoreUpdate = (score) => {
    const { game } = this.props
    let current = game.currentPlayer
    const currentPlayer = game.players[current]
    if (!currentPlayer) return
    const newScore = currentPlayer.score - score
    if (newScore < 0) return
    if (newScore === 0) this.finishGame()
    game.players[current].score = newScore
    if (current === 1) {
      current = 0
    } else {
      current = 1
    }
    game.currentPlayer = current
    this.props.updateGameSocket(socket, game)
  }

  finishGame = () => {
    alert('doner')
  }

  render() {
    const { game } = this.props

    return (
      <div className="container">
        <div className="col-5 col-sm-4" />
        <div className="col-2 col-sm-4 new-game padded-v--lg">
          {game ? game.name : 'No game found'}
          <div className="game-container container">
            {
              game
                ?
                  game.players.map((player, i) =>
                    <div key={i} className={`col-${12 / game.players.length}`}>
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
              <Calculator setScore={(score) => this.handleScoreUpdate(score)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
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
    updateGameSocket,
    resetGame,
    updateGame
  })
)(Home);
