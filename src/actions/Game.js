export const FETCH_GAME = "FETCH_GAME";
export const FETCH_GAMES = "FETCH_GAMES";
export const CREATE_GAME = "CREATE_GAME";
export const DELETE_GAME = "DELETE_GAME";
export const RESET_GAME = "RESET_GAME";

export const UPDATE_PLAYER_SCORE = "UPDATE_PLAYER_SCORE";

export const fetchGame = name => ({
  type: FETCH_GAME,
  payload: name
});

export const fetchGames = () => ({
  type: FETCH_GAMES,
});

export const createGame = (name, cb) => dispatch => {
  dispatch({
    type: CREATE_GAME,
    payload: name
  });
  cb && setTimeout(() => cb(), 1000)
};


export const deleteGame = id => ({
  type: DELETE_GAME,
  payload: id
});

export const resetGame = id => ({
  type: RESET_GAME,
  payload: id
});


export const updatePlayerScore = (player, index) => ({
  type: UPDATE_PLAYER_SCORE,
  payload: {player, index}
})
