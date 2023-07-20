import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductItem({ item }) {
    return (<Link to={'/product/' + item.id} >
        <div className='item'>
            <img src={item.thumbnail} alt="thumbnail" />
            <div className="text">
                <h2 className='title'>{item.title}</h2>
                <p className='price'>{item.price}$</p>
            </div>
        </div>
    </Link>
    )
}
