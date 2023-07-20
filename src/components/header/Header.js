import React from 'react'
import './headerStyle/headerStyle.css'
import { Link } from 'react-router-dom'


export default function Header({ page }) {

  return (
    <div className='header'>
      <Link to="/" className={(page == "home") ? 'link linkSelected' : 'link'}>Home</Link>
      <Link to="/addProduct" className={(page == "addProduct") ? 'link linkSelected' : 'link'}>Add Product</Link>
    </div>
  )
}
