import React from 'react'
import "./itemPageStyle/itemPagaStyle.css"
import { useParams } from 'react-router-dom'

export default function ItemPage() {
    let {id} = useParams();
  return (
    <div className='itemPage'> ItemPage
    
    <br />

      <div className="star-ratings">
        <div className="fill-ratings" style={{width: "50%"}}>
          <span>★★★★★</span>
        </div>
        <div className="empty-ratings">
          <span>★★★★★</span>
        </div>
      </div>
    </div>
  )
}
