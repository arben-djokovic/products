
export var productsAction = (name) => {
    return {
        type: 'changeProducts',
        playload: name,
    }
}
export var deleteProductAction = (name) => {
    return {
        type: 'deleteProduct',
        playload: name,
    }
}