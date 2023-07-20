
let state1 = []

export var products = (state = [], action) => {
    if (action.type === 'changeProducts') {
        state1 = action.playload
        return action.playload
    }else if(action.type === 'deleteProduct'){
        let stateFinished = state1.filter((el) => el.id != action.playload)
        state1 = stateFinished
        return stateFinished
    }else {
        return state
    }
}