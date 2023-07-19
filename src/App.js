import { Link, Route, BrowserRouter as Router , Routes} from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import AddProduct from './components/addProduct/AddProduct';
import { Provider, ReactReduxContext } from 'react-redux';
import { store } from './redux/combineReducers';
import ItemPage from './components/itemPage/ItemPage';


function App() {
  return (
    <Provider store={store} context={ReactReduxContext}>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/item/:id" element={<ItemPage />} />
        </Routes>
    </Router>
  </Provider>
  );
}

export default App;
