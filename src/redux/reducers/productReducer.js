export var products = (state = [], action) => {
    console.log(state)
    if (action.type === 'changeProducts') {
        return action.playload
    }
    else {
        return state
    }
}