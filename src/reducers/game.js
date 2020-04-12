import {
  FETCH_GAME, CREATE_GAME, DELETE_GAME, RESET_GAME,
  UPDATE_PLAYER_SCORE
} from "../actions/Game";

const INITIAL_STATE = {
  games: [
    {
      name: 'league',
      currentPlayer: 0,
      players: [
        {name: 'Player 1', score: 501},
        {name: 'Player 2', score: 501},
      ]
    }
  ],
  game: undefined,
  err: undefined,
};

const startGame = {
  currentPlayer: 0,
  players: [
    {name: 'Player 1', score: 501},
    {name: 'Player 2', score: 501},
  ]
}

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case FETCH_GAME:
      let game, err
      const games = state.games

      if (games && games.length) {
        game = games.find(g => g.name === action.payload)
        if (!game) {
          err = 'Er is geen spel met deze naam gevonden'
        } else {
          err = undefined
        }
      } else {
        err = 'Geen spellen gevonden'
      }
       return {
         ...state,
         game,
         err
       };

     case CREATE_GAME:
      let error
      const name = action.payload
      const gamesList = [...state.games]
      const gameIdx = gamesList.findIndex(x => x.name === name)
      if (gameIdx === -1) {
        gamesList.push({
          name,
          ...startGame
        })
        error = undefined
      } else {
        error = 'Deze naam bestaat al'
      }

       return {
         ...state,
         games: gamesList,
         err: error
       };

     case DELETE_GAME:
       const updatedList = state.games.filter(x => x.name !== action.payload.id)
       return {
         ...state,
         games: updatedList,
       };

      case RESET_GAME:

        return {
          ...state,
        }

      case UPDATE_PLAYER_SCORE:
        const { player, index } = action.payload
        let current = state.game.currentPlayer
        const players = [...state.game.players]
        players[index] = player
        if (current === 1) {
          current = 0
        } else {
          current = 1
        }
        return {
          ...state,
          game: {
            ...state.game,
            players,
            currentPlayer: current
          }
        }

    default:
      return state;
  }
}
