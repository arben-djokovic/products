import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsAction } from './../../redux/actions';
import './homeStyle/homeStyle.css'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    let items = useSelector(store => store.products);
    let dispatch = useDispatch()
    let [maxNo, setMaxNo] = useState(9);

    let fetchFunction = () => {
        fetch('https://dummyjson.com/products?limit=100')
            .then(res => res.json())
            .then(res1 => dispatch(productsAction(res1.products)));
    }
    if (items.length < 1) {
        fetchFunction()
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        // fetchFunction()
    }, [])

    let loadMore = () => {
        setMaxNo(maxNo => maxNo + 9)
    }


    return (
        <div className='home'>
            {/* <select name="select1" id="1">
            <option value="all">All</option>
            {categories.map(categorie => {
                return(<option value={categorie}>{categorie}</option>)
            })}
        </select> */}
            <br />
            <div className='items'>
                <p style={{ color: "black" }}>NAKON REFRESHA, PONOVO SE FETCHUJE IZ BASE PODATAKA, TAKO DA SE SVE PROMJENE (EDITOVANJE I BRISANJE) VRACA NA POCETNU VRIJEDNOST
                    JER NEMAMO MOGUCNOST MIJENJANJA PODATAKA U BAZI STO ZNACI DA SE I U REDUXU ITEMS VRACAJU NA POCETNU VRIJEDNOST</p>
                {(items.length > 0) ? items.map((item, i) => {
                    if (i + 1 <= maxNo) {
                        return (<Link key={i} to={'/item/' + item.id} ><div className='item'>
                            <img src={item.thumbnail} alt="thumbnail" />
                            <div className="text">
                                <h2 className='title'>{item.title}</h2>
                                <p className='price'>{item.price}$</p>
                            </div>
                        </div></Link>)
                    }
                }) : <img className='loadingImg' src="./assets/loading-spinner.gif" alt="Loading..." />}
            </div>
            {(items.length > maxNo) ? <p onClick={loadMore} className='loadMore'>Load more...</p> : ""}
        </div>
    )
}
