import logo from './logo.svg';
import data from './store/store.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Products from './Products.js';
import Cart from './Cart.js';
import axios from 'axios'

import { setProduct } from './store/productSlice';
import { setDragProduct } from './store/store';
import React, {useState, useEffect, useRef} from 'react'
import {Container, Nav, Navbar, NavDropdown, Row, Form, Col, Button, InputGroup} from 'react-bootstrap';
import {Route, Routes, Link, useNavigate, Outlet} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

function App() {
  const reactStringReplace = require('react-string-replace'); //React String Replace 라이브러리
  
  let product = useSelector((state)=> state.product)
  let dragProduct = useSelector((state)=> state.dragProduct)
  let [searchText, setSearchText] = useState('');//검색창 텍스트
  let [cartList, setCartList] = useState([]);//장바구니 목록

  let dispatch = useDispatch();
  const dragItem = useRef(); // 리액트 드래그 이벤트 -> 어캐쓰는지 잘모르겠다
  const dragOverItem = useRef();

  let dragData = '';

  // console.log(data.products)

  useEffect(()=>{ // 검색기능
    let arr = [];
    data.products.forEach((a)=>{
      if(a.title.indexOf(searchText) > -1 || a.brand.indexOf(searchText) > -1){
          arr.push(a)
      }
    })
    dispatch(setProduct(arr))
  }, [searchText])

  const dragStart = (e) => {
    product.forEach((a)=> {
      if(a.id ==  e.target.id){
        dispatch(setDragProduct(a))
      }   
    })
    console.log(dragProduct)
  }

  const dragEnter = (e)=>{
  }

  const dragOver = (e)=>{
    e.preventDefault()
  }

  //drop과 dragover는 같이 써줘야 동작함
  

  return (
    <div className="App">
      {/* navbar */}
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">React쇼핑몰</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={
        <>
          <Container fluid>
          <InputGroup className="mb-3 search">
            <Form.Control
              placeholder="검색어를 입력하세요"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  setSearchText(e.target.value)
                }
              }}
            />
          </InputGroup>
          <div className='row'>
              <Products data={product} searchText={searchText} dragStart={dragStart}>
              </Products>
          </div>
        </Container>
        <Container fluid className='cart'>
          <Cart searchText={searchText} dragStart={dragStart} dragEnter={dragEnter} dragOver={dragOver}></Cart>
        </Container>
        </>
      }/> 
    </Routes>
    </div>
  );
}

export default App;
