import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import AddProduct from './components/addProduct/AddProduct';
import { Provider, ReactReduxContext } from 'react-redux';
import { store } from './redux/combineReducers';
import ItemPage from './components/itemPage/ItemPage';
import Header from './components/header/Header';
import Edit from './components/edit/Edit';


function App() {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <Router>
        <Routes>
          <Route path="/" element={<><Header page={"home"} /><Home /></>} />
          <Route path="/addProduct" element={<><Header page={"addProduct"} /><AddProduct /></>} />
          <Route path="/item/:id" element={<><Header page={"item"} /><ItemPage /></>} />
          <Route path="/edit/:id" element={<><Header page={"edit"} /><Edit /></>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
