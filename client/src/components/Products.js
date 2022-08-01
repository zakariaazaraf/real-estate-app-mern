import React, { useState } from 'react'

export function Products() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')

  const OnChangeTitle = event => setTitle(event.target.value)
  const OnChangeDescription = event => setDescription(event.target.value)
  const OnChangePrice = event => setPrice(event.target.value)
  const OnChangeDiscount = event => setDiscount(event.target.value)

  return <>
      <h1>Products</h1>
      <form action='/product' method='POST' enctype='multipart/form-data' >
            <label for='title'>The product title</label>
            <input type='text' value={title} name='title' id='title' onChange={OnChangeTitle}/>
            <br />
            <label for='description'>The product description</label>
            <input type='text' value={description} name='description' id='description' onChange={OnChangeDescription}/>
            <br />
            <label for='price'>The product price</label>
            <input type='number' value={price} name='price' id='price' onChange={OnChangePrice}/>
            <br />
            <label for='discount'>The product discount</label>
            <input type='number' value={discount} name='discount' id='discount' onChange={OnChangeDiscount} min={1} max={100}/>
            <br />
            <label for='myFile'>The product image</label>
            <input type='file' name='myFile' id='image' />
            <br /><br />
            <input type='submit' value='submit' name='submit'/>
        </form>
    </>
}
