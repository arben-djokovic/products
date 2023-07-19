export var products = (state = [], action) => {
    if (action.type === 'changeProducts') {
        console.log(action.playload)
        return action.playload
    }
    else {
        return state
    }
}