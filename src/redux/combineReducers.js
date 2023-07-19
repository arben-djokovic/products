import {createStore, combineReducers} from 'redux';
import { products } from './reducers/productReducer';

const rootReducer = combineReducers({
    products,
})

const store = createStore(rootReducer)

export {store}