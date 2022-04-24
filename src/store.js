export const initialState = {
    selectedGames: []
}

export function selectedGamesReducer(state, action) {
    console.log('selectedGamesReducer', action)
    switch(action.type){
        case 'UPDATE_SELECTED_GAMES':
            return {
                selectedGames: action.data,
            }
        default:
            return initialState
    }
}