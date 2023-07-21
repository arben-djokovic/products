import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './addProductStyle/addProductStyle.css'
import { addProductAction, productsAction } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct() {
  // const { store } = useContext(ReactReduxContext)
  // let products = useSelector(store => store.products);
  let navigate = useNavigate()
  let [allImages, setAllImages] = useState([])
  let [categories, setCategories] = useState([])
  let items = useSelector(store => store.products)
  let item = { images: [], thumbnail: "", title: "", description: "", rating: "", price: "", stock: "", brand: "", category: "" }
  let dispatch = useDispatch()

  let fetchCategories = () => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(res1 => { setCategories(res1); });
  }
  let fetchAddNewItem = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: item.title,
        thumbnail: item.thumbnail,
        price: item.price,
        stock: item.stock,
        rating: item.rating,
        images: item.images,
        brand: item.brand,
        category: item.category,
        description: item.description,
      })
    })
      .then(res => res.json())
  }
  let changeItem = (e) => {
    if (e.target.name == 'thumbnail') {
      item.thumbnail = e.target.value
      if(e.target.value.length == 0){
        e.target.classList.add("errorInput")
      }else{
        e.target.classList.remove("errorInput")
      }
    } else if (e.target.name == 'title') {
      item.title = e.target.value
      if(e.target.value.length == 0){
        e.target.classList.add("errorInput")
      }else{
        e.target.classList.remove("errorInput")
      }
    } else if (e.target.name == 'price') {
      item.price = e.target.value
      if(e.target.value.length == 0){
        e.target.classList.add("errorInput")
      }else{
        e.target.classList.remove("errorInput")
      }
    } else if (e.target.name == 'stock') {
      item.stock = e.target.value
    } else if (e.target.name == 'rating') {
      if (e.target.value > 5 || e.target.value < 0) {
        toast.warning("Mora biti izmedju 0.0 i 5.0")
        e.target.value = item.rating
      } else {
        item.rating = e.target.value
      }
    } else if (e.target.name == 'brand') {
      item.brand = e.target.value
    } else if (e.target.name == 'description') {
      item.description = e.target.value
    } else if (e.target.name == "addImage") {
      setAllImages([...allImages, e.target.parentElement.children[0].value])
      e.target.parentElement.children[0].value = ""
    } else if (e.target.name == 'categories') {
      item.category = e.target.value
    }
  }

  let saveChanges = () => {

    if(item.title.length <= 0 || item.price.length <= 0 || item.thumbnail.length <= 0){
      toast.error("Title, thumbnail and price are required !! ")
    }else{

      item.images = allImages.filter(function (el) {
        return el != null;
      });
      fetchAddNewItem()
  
      dispatch(addProductAction(item))
      toast.success("Adden new product")
      navigate("/")
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories()
    if(items.length < 10){
      fetch('https://dummyjson.com/products?limit=100')
            .then(res => res.json())
            .then(res1 => dispatch(productsAction(res1.products)));
    }
  }, [])
  return (
    <div className='addProduct'>
      <ToastContainer />
      <div className="container">
        <h2>Add new item</h2>
        <div className="inputs">
          <div className="images">
            {allImages.length > 0 ? <p>Remove added images</p> : <></>}
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
            <p>Thumbnail*</p>
            <input onChange={changeItem} type="text" name="thumbnail" defaultValue={item.thumbnail} />
          </div>
          <div className="title">
            <p>Title*</p>
            <input onChange={changeItem} type="text" name="title" defaultValue={item.title} />
          </div>
          <div className="price">
            <p>Price*</p>
            <input onChange={changeItem} step=".01" type="number" name="price" defaultValue={item.price} />
          </div>
          <div className="stock">
            <p>Stock</p>
            <input onChange={changeItem} type="number" name="stock" defaultValue={item.stock} />
          </div>
          <div className="rating">
            <p>Rating</p>
            <input onChange={changeItem} step=".01" max={5.0} min={0.0} type="number" name="rating" defaultValue={item.rating} />
          </div>
          <div className="brand">
            <p>Brand</p>
            <input onChange={changeItem} type="text" name="brand" defaultValue={item.brand} />
          </div>
          <div className="category">
            <p>Category</p>
            <select onChange={changeItem} name="categories" id="categories">
              {categories.map((categorie, i) => {
                if (i == 0) { item.category = categorie }
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
            <p>Description</p>
            <textarea onChange={changeItem} name="description" id="description" defaultValue={item.description} cols="30" rows="10"></textarea>
          </div>
        </div>
        <button onClick={saveChanges} className="submit">Save changes</button>
      </div>
    </div>
  )
}
