import axios from "axios";


export const DELETE_GAME = "DELETE_GAME";
export const RESET_GAME = "RESET_GAME";

export const CREATE_GAME = "CREATE_GAME";
export const CREATE_GAME_SUCCESS = "CREATE_GAME_SUCCESS";
export const CREATE_GAME_FAILURE = "CREATE_GAME_FAILURE";

export const FETCH_GAME = "FETCH_GAME";
export const FETCH_GAME_SUCCESS = "FETCH_GAME_SUCCESS";
export const FETCH_GAME_FAILURE = "FETCH_GAME_FAILURE";

export const FETCH_GAMES = "FETCH_GAMES";
export const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS";
export const FETCH_GAMES_FAILURE = "FETCH_GAMES_FAILURE";

export const UPDATE_GAME = "UPDATE_GAME";

export const fetchGame = (name) => dispatch => {
  dispatch({
    type: FETCH_GAME,
    payload: name
  });
  axios.get(`/api/game/${name}`).then(
    data => {
      dispatch({
        type: FETCH_GAME_SUCCESS,
        payload: data
      })
    },
    err => dispatch({ type: FETCH_GAME_FAILURE, payload: err })
  )
};

export const fetchGames = (name) => dispatch => {
  dispatch({
    type: FETCH_GAMES,
    payload: name
  });
  axios.get(`/api/games`).then(
    data => {
      dispatch({
        type: FETCH_GAMES_SUCCESS,
        payload: data
      })
    },
    err => dispatch({ type: FETCH_GAMES_FAILURE, payload: err })
  )
};

export const createGame = (name, cb) => dispatch => {
  dispatch({
    type: CREATE_GAME,
    payload: name
  });
  axios.post(`/api/game`, { name }).then(
    data => {
      dispatch({
        type: CREATE_GAME_SUCCESS,
        payload: data
      })
      cb && cb(data)
    },
    err => dispatch({ type: CREATE_GAME_FAILURE, payload: err })
  )
};


export const deleteGame = id => ({
  type: DELETE_GAME,
  payload: id
});

export const resetGame = id => ({
  type: RESET_GAME,
  payload: id
});

export const updateGame = (game) => ({
  type: UPDATE_GAME,
  payload: game
})

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */

export const updateGameSocket = (socket, game) => {
	return (dispatch) => {
	    socket.emit('updateGame',game)
	}
}

export const addNewItemSocket = (socket,id,item) => {
	return (dispatch) => {
		let postData = {
				id:id+1,
				item:item,
				completed:false
		     }
	    socket.emit('addItem',postData)
	}
}

export const markItemCompleteSocket = (socket,id,completedFlag) => {
	return (dispatch) => {
		let postData = {
				id:id,
				completed:completedFlag
		     }
		socket.emit('markItem',postData)
	}
}
