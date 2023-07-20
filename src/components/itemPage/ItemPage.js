import React, { useEffect, useState } from 'react'
import "./itemPageStyle/itemPagaStyle.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
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
  let [item, setItem] = useState({ rating: 1, images: [], thumbnail: "", title: "Loading...", price: 0 })
  let items = useSelector(store => store.products);
  let dispatch = useDispatch()
  let navigate = useNavigate();



  let fetchFunction = () => {
    fetch('https://dummyjson.com/products/' + id)
      .then(res => res.json())
      .then(res1 => { setItem(res1) });
  }

  let deleteItem = () => {
    //Delete from base
    fetch('https://dummyjson.com/products/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json())


    //Delete from redux
    dispatch(deleteProductAction(id))
    navigate('/')

  }

  useEffect(() => {
    window.scrollTo(0, 0);

    // This is working - fetching from base, but i will get this data from redux because 
    // we maybe changed one item then when we fetch item will be the same like before changing.



    if (items.length < 10) {
      fetch('https://dummyjson.com/products?limit=100')
        .then(res => res.json())
        .then(res1 => dispatch(productsAction(res1.products)));
    }

    items.forEach(element => {
      if (element.id == id) {
        setItem(element)
      }
    });

    setTimeout(() => {
      if (item.description == undefined && items.length < 2) {
        fetchFunction()
      }
    }, 100);
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
            <SwiperSlide>
              <img src={item.thumbnail} alt="imageItem" />
            </SwiperSlide>
            {item.images.map((imageItem, i) => {
              return (<SwiperSlide key={i}>
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
            <SwiperSlide>
              <img src={item.thumbnail} alt="imageItem" />
            </SwiperSlide>
            {item.images.map((imageItem, i) => {
              return (<SwiperSlide key={i}>
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
            <Link to={"/edit/" + id} ><button className='editBtn'>Edit item</button></Link>
            <button className='deleteBtn' onClick={deleteItem}>Delete item</button>
          </div>

        </div>

      </div>
    </div>
  )
}
