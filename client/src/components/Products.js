import React, { useState } from 'react'

export function Products() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [file, setFile] = useState('')

  const onChangeTitle = event => setTitle(event.target.value)
  const onChangeDescription = event => setDescription(event.target.value)
  const onChangePrice = event => setPrice(event.target.value)
  const onChangeDiscount = event => setDiscount(event.target.value)
  const onChangeFile = event => setFile(event.target.files[0])

  const onSubmitProduct = async (event) => {
    event.preventDefault()

    let product = {
      title,
      description,
      price,
      discount,
      file
    }

    let formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('discount', discount)
    formData.append('myFile', file)

    let response = await fetch(`http://localhost:5000/api/product`, {
      method: 'POST',
      body: formData
    })

    if (response.ok) {      
      let data = await response.json()
      console.log(data)
    }
  }

  return <>
      <h1>Products</h1>
      <form action='/product' method='POST' encType='multipart/form-data' onSubmit={onSubmitProduct}>
            <label htmlFor='title'>The product title</label>
            <input type='text' value={title} name='title' id='title' onChange={onChangeTitle}/>
            <br />
            <label htmlFor='description'>The product description</label>
            <input type='text' value={description} name='description' id='description' onChange={onChangeDescription}/>
            <br />
            <label htmlFor='price'>The product price</label>
            <input type='number' value={price} name='price' id='price' onChange={onChangePrice}/>
            <br />
            <label htmlFor='discount'>The product discount</label>
            <input type='number' value={discount} name='discount' id='discount' onChange={onChangeDiscount} min={1} max={100}/>
            <br />
            <label htmlFor='myFile'>The product image</label>
            <input type='file' name='myFile' id='image' onChange={onChangeFile}/>
            <br /><br />
            <input type='submit' value='submit' name='submit'/>
        </form>
    </>
}
