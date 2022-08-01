import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home'
import { Products } from './components/Products'
import { Categories } from './components/Categories'
import { Product } from './components/Product'
import { Category } from './components/Category'
import { Image } from './components/Image.js'
import { NotFound } from './components/NotFound'

function App() {
  return <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/categories' element={<Categories />}/>
        <Route path='/product/:productId' element={<Product />}/>
        <Route path='/category/:categoryId' element={<Category />}/>
        <Route path='/images/:imageId' element={<Image />}/>
        <Route path='/*' element={<NotFound />}/>
      </Routes>
  </Router>
}

export default App;
