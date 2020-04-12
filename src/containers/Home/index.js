import React, { useState } from 'react'
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import openSocket from 'socket.io-client';

import { createGame } from '../../actions/Game'

import './styles.scss'
const io = require('socket.io')
const  socket = openSocket('http://localhost:8080');

export const Home = ({ games, createGame }) => {
  let history = useHistory();
  const [newName, setNewName] = useState('')

  const handleCreateGame = () => {
    socket.emit('create game', 'newName');
    io.emit('create game', newName);
    createGame(newName, () =>
      history.push(`/game/${newName}`)
    )
  }

  return (
    <div className="container">
      <div className="col-5" />
      <div className="col-2 new-game padded-v--lg">
        <div>
          Maak een nieuwe game
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <div
            className="button margin-top block"
            onClick={handleCreateGame}
          >
            Start
          </div>
        </div>
        <br /><br />
        <br /><br />
        <div className="existing-game">
          Join een bestaande game
          <hr style={{ color: 'white', width: 'calc(100% - 6px)'}} />
          <div>
            {
              games && games.length > 0
                ? games.map((game, i) =>
                    <Link
                      key={i}
                      to={`/game/${game.name}`}
                    >
                      {game.name}
                    </Link>
                  )
                : 'Er zijn nog geen bestaande games'
            }
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps({ game }) {
  return {
    games: game.games
  };
}

export default connect(
  mapStateToProps, {
    createGame
  }
)(Home)
