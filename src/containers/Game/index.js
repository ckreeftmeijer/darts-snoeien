import React from 'react'
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import Confetti from 'react-dom-confetti';

import Player from '../Player'
import Calculator from '../../components/Calculator'
import Reset from './reset.svg'
import Loader from '../../images/loader.svg'

import showFinishes from '../../utils/showFinishes'
import { getFinish } from '../../data/dartsCheckouts'

import { fetchGame, updateGameSocket, resetGame, updateGame } from '../../actions/Game'

import './styles.scss'

let socket

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfetti: false,
      changingPlayer: false,
      currentFinish: 'No outs possible'
    }
    socket = io.connect(
      window.location.hostname === 'localhost'
        ? "http://localhost:8080"
        : window.location.hostname,
      { secure: true }
    );

    socket.on("gameUpdated", res => {
      this.props.updateGame(res)
    });
  }

  componentDidMount() {
    const name = this.props.match.params.name
    if (name) {
      this.props.fetchGame(name)
      socket.emit('joinRoom', name)
    }
  }

  componentDidUpdate(prevProps) {
    const { game } = this.props;

    if (!prevProps.game && game) {
      this.setState({ currentFinish: getFinish(game.players[game.currentPlayer].score) })
    }
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
    if (newScore > 1) {
      game.players[current].score = newScore
    }
    if (newScore === 0) return this.finishGame()
    if (current === 1) {
      current = 0
    } else {
      current = 1
    }

    this.setState({ currentFinish: getFinish(game.players[current].score) })

    game.currentPlayer = current
    this.props.updateGameSocket(socket, game)
    this.setState({ changingPlayer: true}, () => {
      setTimeout(() => this.setState({ changingPlayer: false }), 100)
    })
  }

  finishGame = () => {
    this.setState({ showConfetti: true}, () =>
      setTimeout(() => this.setState({ showConfetti: true}),100)
    )
    this.resetGame()
  }

  resetGame = () => {
    const { game } = this.props
    game.players.forEach((player, i) => {
      const updatedPlayer = {...player}
      updatedPlayer.score = 501
      game.players[i] = updatedPlayer
    })
    game.currentPlayer = 0
    this.props.updateGameSocket(socket, game)
  }

  render() {
    const { showConfetti, currentFinish } = this.state
    const { game, loading } = this.props

    return (
      <div className="container">
        <div className="col-4 col-xs-1 col-sm-2 col-lg-3" />
        <div className="col-4 col-xs-12 col-sm-8 col-lg-6  new-game padded-v--lg">
          {game
            ?
              <div className="larger bold">
                {game.name}
                <span onClick={() => this.resetGame()}>
                  <img
                    className="reset-icon"
                    src={Reset}
                    alt="reset game icon"
                  />
                </span>
              </div>
            : loading
              ? <img src={Loader} width="30px" alt="spinning loader" />
              : 'No game found'}
          <div className="game-container container">
            {
              game
                ?
                  game.players.map((player, i) =>
                    <div key={i} className={`col-${12 / game.players.length}`}>
                      <Confetti active={game.currentPlayer === i && showConfetti} />
                      <Player
                        name={player.name}
                        isCurrentPlayer={game.currentPlayer === i}
                        score={player.score}
                      />
                    </div>
                  )
                : <div style={{height: "60px"}} />
            }
            <hr className="col-12" style={{ color: 'white', width: 'calc(100% - 6px)'}} />
            <div className="col-12 text-center" style={{ height: '30px' }}>
              {
                  game ? currentFinish : ''
              }
            </div>
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
    game: game.game,
    loading: game.loading.game
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
)(Game);
