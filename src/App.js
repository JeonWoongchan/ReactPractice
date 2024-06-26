import data from './store/store.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Products from './Products.js';
import Cart from './Cart.js';

import { setProduct } from './store/productSlice';
import { setDragProduct } from './store/store';
import React, {useState, useEffect, useRef} from 'react'
import {Container, Nav, Navbar, NavDropdown, Row, Form, Col, Button, InputGroup} from 'react-bootstrap';
import {Route, Routes, Link, useNavigate, Outlet} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

function App() {
  
  let product = useSelector((state)=> state.product)
  let cartList = useSelector((state)=> state.cartList)
  let dragProduct = useSelector((state)=> state.dragProduct)
  let [searchText, setSearchText] = useState('');//검색창 텍스트
  let [modal, setModal] = useState(false); // 모달 출력 여부

  let dispatch = useDispatch();

  // console.log(data.products)

  const totalPrice = ()=>{
    let result = 0;
    if (!cartList || cartList.length === 0) { // state 비어있으면 map 안돌아감 -> 없으면 실행하지말라고 해줌 
        return 0;
    }
    cartList.map((a,i)=>{
        let price = a.count * a.price
        result += price;
    })
    return result;
  }

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
          <Cart modal={modal} setModal={setModal} totalPrice={totalPrice} searchText={searchText} dragStart={dragStart} dragEnter={dragEnter} dragOver={dragOver}></Cart>
        </Container>
        </>
      }/> 
    </Routes>
    {
      modal == true ? <Modal modal={modal} setModal={setModal} totalPrice={totalPrice} ></Modal> : null
    }   
    </div>
  );
}

function Modal(props){
  let cartList = useSelector((state)=> state.cartList)
  let [name, setName] = useState('');
  let [tel, setTel] = useState('');
  let [receipt, setReceipt] = useState(false); // 영수증 출력 여부
  

  return(
    <div className="modal1">
      <div className="white-bg">
        {
          receipt == true ? 
          <form action="#">
              구매자 정보
              <div className="my-3">
                  성함 : {name}
              </div>
              <div className="my-3">
                  연락처 : {tel}
              </div>
              {
                cartList.map((a,i)=>{
                  return (
                    <div>
                      {a.title} {a.price} {a.count}
                    </div>
                  );
                })
              }
              <div>{`합계 : ${props.totalPrice()} 원`}</div>
              
              <button type="button" className="btn btn-danger close" id="close" onClick={()=>{props.setModal(false)}}>닫기</button>
          </form> 
          :
          <form action="#">
            구매자 정보 입력
            <div className="my-3">
                성함<input type="text" id="inputName" className="form-control input1" onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div className="my-3">
                연락처<input type="text" id="inputTel" className="form-control input2" onChange={(e)=>{setTel(e.target.value)}}/>
            </div>
            <button type="submit" className="btn btn-primary" id="send" onClick={()=>{setReceipt(true)}}>입력완료</button>
            <button type="button" className="btn btn-danger close" id="close" onClick={()=>{props.setModal(false)}}>닫기</button>
        </form>
        }
      </div>
  </div>
  )
}

export default App;
