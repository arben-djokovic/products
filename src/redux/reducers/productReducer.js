
let state1 = []

export var products = (state = [], action) => {
    if (action.type === 'changeProducts') {
        state1 = action.playload
        return action.playload
    } else if (action.type === 'deleteProduct') {
        let stateFinished = state1.filter((el) => el.id != action.playload)
        state1 = stateFinished
        return stateFinished
    } else if (action.type === 'editProduct') {
        let stateEdited = state1
        state1.forEach((el, i) => {
            if (el.id == action.playload.id) {
                stateEdited[i] = action.playload
            }
        })
        stateEdited = state1
        return stateEdited
    } else {
        return state
    }
}