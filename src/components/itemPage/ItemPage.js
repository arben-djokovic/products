import React, { useEffect, useState } from 'react'
import "./itemPageStyle/itemPagaStyle.css"
import { useParams } from 'react-router-dom'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAction, productsAction } from '../../redux/actions';

export default function ItemPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let { id } = useParams();
  let [item, setItem] = useState({ rating: 1,images: [],thumbnail: "",title: "Loading...", price: 0 })
  let dispatch = useDispatch()
  let items = useSelector(store => store.products);



  let fetchFunction = () => {
    fetch('https://dummyjson.com/products/' + id)
      .then(res => res.json())
      .then(res1 => { setItem(res1); console.log(res1) });
  }

  let deleteItem = () => {
    //Delete from base
    fetch('https://dummyjson.com/products/'+id, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log);


    //Delete from redux
    let newArray = items
    items.forEach((element, i) => {
      console.log(element.id)
      if(element.id == item.id){
        console.log("Izbrisano iz reduxa")
        newArray = newArray.slice(i,1)
      }
    });
    setTimeout(() => {
      dispatch(productsAction(newArray))
    }, 100);

  }

  useEffect(() => {
    console.log(items)
    fetchFunction()
  }, [])
  return (
    <div className='itemPage'>
      <div className="content">
        <div className="swiperDiv">
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {item.images.map((imageItem, i) => {
          return(<SwiperSlide key={i}>
            <img src={imageItem} alt="imageItem" />
          </SwiperSlide>)
          })}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {item.images.map((imageItem, i) => {
          return(<SwiperSlide key={i}>
            <img src={imageItem} alt="imageItem" />
          </SwiperSlide>)
          })}
        </Swiper>
        </div>

        <div className='right'>
          <h2>{item.title}</h2>

          <div className="priceDiv">
            <p className="price">${item.price}</p>
            <p className='stock'>{item.stock} left</p>
          </div>
          <p className="brand"><b>Brand: </b>{item.brand}</p>
          <p className="category"><b>Category: </b>{item.category}</p>

          <p className="ratingText">{item.rating} rating</p>
          <div className="star-ratings" style={{ width: (item.rating * 100) }}>
            <div className="fill-ratings" style={{ width: "50%" }}>
              <span>★★★★★</span>
            </div>
            <div className="empty-ratings">
              <span>★★★★★</span>
            </div>
          </div>
          <p className="description">{item.description}</p>

          <div className="buttons">
            <button className='editBtn'>Edit item</button>
            <button className='deleteBtn' onClick={deleteItem}>Delete item</button>
          </div>

        </div>

      </div>
    </div>
  )
}
