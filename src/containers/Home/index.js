import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { createGame, fetchGames } from '../../actions/Game'

import './styles.scss'

export const Home = ({ games, createGame, fetchGames }) => {
  let history = useHistory();
  const [newName, setNewName] = useState('')

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  const handleCreateGame = () => {
    createGame(newName, () =>
      history.push(`/game/${newName}`)
    )
  }

  return (
    <div className="container padded text-center">
      <div className="col-5 col-sm-1 col-md-4" />
      <div className="col-2 col-sm-12 col-md-4 new-game padded-v--lg">
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
              games && games.length > 0 && Array.isArray(games)
                ? games.map((game, i) =>
                    <Link
                      key={i}
                      className="block"
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
    createGame,
    fetchGames
  }
)(Home)
