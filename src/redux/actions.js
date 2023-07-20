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
export var editProductAction = (name) => {
    return {
        type: 'editProduct',
        playload: name,
    }
}