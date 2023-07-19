import React from 'react'
import "./itemPageStyle/itemPagaStyle.css"
import { useParams } from 'react-router-dom'

export default function ItemPage() {
    let {id} = useParams();
  return (
    <div>{id} ItemPage</div>
  )
}
