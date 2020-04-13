import {
  FETCH_GAME, FETCH_GAME_SUCCESS, FETCH_GAME_FAILURE,
  FETCH_GAMES, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAILURE,
  DELETE_GAME, RESET_GAME,
  CREATE_GAME, CREATE_GAME_SUCCESS, CREATE_GAME_FAILURE,
  UPDATE_GAME
} from "../actions/Game";

const INITIAL_STATE = {
  games: undefined,
  game: undefined,
  err: undefined,
  loading: {
    game: false,
  },
  error: {
    game: false,
    games: false,
  }
};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case FETCH_GAME:
      return {
        ...state,
        loading: {...state.loading, game: true}
      };
    case FETCH_GAME_SUCCESS:
      return {
        ...state,
        game: action.payload.data,
        error: undefined,
        loading: {...state.loading, game: false}
      };
    case FETCH_GAME_FAILURE:
      return {
        ...state,
        game: undefined,
        error: action.payload,
        loading: {...state.loading, game: false}
      };

    case FETCH_GAMES:
      return {
        ...state,
        loading: {...state.loading, games: true}
      };
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        games: action.payload.data,
        error: undefined,
        loading: {...state.loading, games: false}
      };
    case FETCH_GAMES_FAILURE:
      return {
        ...state,
        games: undefined,
        error: action.payload,
        loading: {...state.loading, games: false}
      };


     case CREATE_GAME:
       return {
         ...state,
         game: undefined,
         error: undefined
       };
     case CREATE_GAME_SUCCESS:
       return {
         ...state,
         game: action.payload.data.game,
         error: undefined
       };
     case CREATE_GAME_FAILURE:
       return {
         ...state,
         game: undefined,
         error: action.payload
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

      case UPDATE_GAME:
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
          game: action.payload
        }

    default:
      return state;
  }
}
