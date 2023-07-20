import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProductAction, productsAction } from '../../redux/actions';
import './editStyle/editStyle.css'

export default function Edit() {
  let { id } = useParams();
  let [allImages, setAllImages] = useState([])
  let changedItem = {}
  let [item, setItem] = useState({ images: [""] })
  let [categories, setCategories] = useState([])
  let items = useSelector(store => store.products);
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let fetchFunction = () => {
    fetch('https://dummyjson.com/products/' + id)
      .then(res => res.json())
      .then(res1 => { setItem(res1); setAllImages(res1.images) });
  }
  let fetchCategories = () => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(res1 => { setCategories(res1) });
  }



  useEffect(() => {
    window.scrollTo(0, 0);

    // This is working - fetching from base, but i will get this data from redux because 
    // we maybe changed one item then when we fetch item will be the same like before changing 
    //because we can not change base it doesnt allow us.
    // if(item.title == undefined){
    //   fetchFunction()
    // }

    fetchCategories()
    if (items.length < 1) {
      fetch('https://dummyjson.com/products?limit=100')
        .then(res => res.json())
        .then(res1 => dispatch(productsAction(res1.products)));
    }

    items.forEach(element => {
      if (element.id == id) {
        setItem(element)
        setAllImages(element.images)
      }
    });
  }, [])

  let saveChanges = () => {
    var filtered = allImages.filter(function (el) {
      return el != null;
    });


    if (changedItem.thumbnail == undefined) {
      changedItem.thumbnail = item.thumbnail
    }
    if (changedItem.title == undefined) {
      changedItem.title = item.title
    }
    if (changedItem.price == undefined) {
      changedItem.price = item.price
    }
    if (changedItem.stock == undefined) {
      changedItem.stock = item.stock
    }
    if (changedItem.rating == undefined) {
      changedItem.rating = item.rating
    }
    if (changedItem.brand == undefined) {
      changedItem.brand = item.brand
    }
    if (changedItem.category == undefined) {
      changedItem.category = item.category
    }
    if (changedItem.description == undefined) {
      changedItem.description = item.description
    }
    changedItem.images = filtered
    changedItem.id = id

    fetch('https://dummyjson.com/products/' + id, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: changedItem.title,
        thumbnail: changedItem.thumbnail,
        price: changedItem.price,
        stock: changedItem.stock,
        rating: changedItem.rating,
        images: changedItem.images,
        brand: changedItem.brand,
        category: changedItem.category,
        description: changedItem.description,
      })
    })
      .then(res => res.json())

    dispatch(editProductAction(changedItem))
    navigate("/item/" + id)

  }

  let changeItem = (e) => {
    if (e.target.name == 'thumbnail') {
      changedItem.thumbnail = e.target.value
    } else if (e.target.name == 'title') {
      changedItem.title = e.target.value
    } else if (e.target.name == 'price') {
      changedItem.price = e.target.value
    } else if (e.target.name == 'stock') {
      changedItem.stock = e.target.value
    } else if (e.target.name == 'rating') {
      if (e.target.value > 5 || e.target.value < 0) {
        alert("Mora biti izmedju 0.0 i 5.0")
        e.target.value = item.rating
      } else {
        changedItem.rating = e.target.value
      }
    } else if (e.target.name == 'brand') {
      changedItem.brand = e.target.value
    } else if (e.target.name == 'category') {
      changedItem.category = e.target.value
    } else if (e.target.name == 'description') {
      changedItem.description = e.target.value
    } else if (e.target.name == "addImage") {
      setAllImages([...allImages, e.target.parentElement.children[0].value])
      e.target.parentElement.children[0].value = ""
    } else if (e.target.name == 'categories') {
      changedItem.category = e.target.value
    }

  }
  return (
    <div className='edit'>
      <div className="container">
        <h2>Edit item</h2>
        <div className="inputs">
          <div className="images">
            <p>Remove images</p>
            <div className="imagesFlex">
              {allImages.map((image, i) => {
                return (<div key={i} className='image'><img src={image} alt="image" /> <p onClick={(e) => {
                  let testAllImages = allImages
                  testAllImages[i] = null
                  setAllImages(testAllImages)
                  e.target.parentElement.style.cssText += "display: none"
                }} className="remove">REMOVE</p></div>)
              })}
            </div>
          </div>
          <div className="addImage">
            <p>Add new image</p>
            <div>
              <input type="text" name="addImage" defaultValue="" placeholder='image url' />
              <button onClick={changeItem} name="addImage">Add</button>
            </div>
          </div>
          <div className="thumbnail">
            <p>Thumbnail</p>
            <input onChange={changeItem} type="text" name="thumbnail" defaultValue={item.thumbnail} />
          </div>
          <div className="title">
            <p>Title</p>
            <input onChange={changeItem} type="text" name="title" defaultValue={item.title} />
          </div>
          <div className="price">
            <p>Price</p>
            <input onChange={changeItem} type="number" name="price" defaultValue={item.price} />
          </div>
          <div className="stock">
            <p>Stock</p>
            <input onChange={changeItem} type="number" name="stock" defaultValue={item.stock} />
          </div>
          <div className="rating">
            <p>rating</p>
            <input onChange={changeItem} max={5.0} min={0.0} type="number" name="rating" defaultValue={item.rating} />
          </div>
          <div className="brand">
            <p>brand</p>
            <input onChange={changeItem} type="text" name="brand" defaultValue={item.brand} />
          </div>
          <div className="category">
            <p>category</p>
            <select onChange={changeItem} name="categories" id="categories">
              {categories.map((categorie, i) => {
                if (categorie == item.category) {
                  return (
                    <option value={categorie} name={categorie} id={categorie} key={i}>{categorie}</option>
                  )
                } else {
                  return (
                    <option value={categorie} name={categorie} id={categorie} key={i}>{categorie}</option>
                  )
                }
              })}
            </select>
          </div>
          <div className="description">
            <p>description</p>
            <textarea onChange={changeItem} name="description" id="description" defaultValue={item.description} cols="30" rows="10"></textarea>
          </div>
        </div>
        <button onClick={saveChanges} className="submit">Save changes</button>
      </div>
    </div>
  )
}
