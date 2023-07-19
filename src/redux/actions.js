export var productsAction = (name) => {
    return {
        type: 'changeProducts',
        playload: name,
    }
}