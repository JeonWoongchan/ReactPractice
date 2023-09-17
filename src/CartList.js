import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import reactStringReplace from 'react-string-replace';


import React, {useState, useEffect} from 'react'
import {Container, Nav, Navbar, NavDropdown, Row, Form, Col, Button, InputGroup} from 'react-bootstrap';
import {Route, Routes, Link, useNavigate, Outlet} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, addCount, subtractCount } from './store/cartListSlice';


function CartList(props) {
    let cartList = useSelector((state)=> state.cartList)
    let dispatch = useDispatch();
    
    if (!cartList || cartList.length === 0) { // state 비어있으면 map 안돌아감 -> 없으면 실행하지말라고 해줌 
        return null;
    }
    return (
    <> 
        {cartList.map((a, i) => { 
        return (
            <div className='box' key={a.id}>
                <div className='img-box'>
                    <img src={`img/pr${a.id + 1}.JPG`} alt={a.title} id={a.id} draggable="false"/>
                </div>
                <div className="info">
                    {/* 검색어에 형광펜 스타일 적용된 제목 */}
                    <h4 id={`title${a.id}`}>{a.title}</h4>
                </div>
                <p id={`count${a.id}`}>
                    <button onClick={()=>{dispatch(addCount(a))}}>+</button>
                    {a.count}
                    <button onClick={()=>{dispatch(subtractCount(a))}}>-</button>
                </p>       
                <p>{calculator(a)}</p>
                <button onClick={()=>{dispatch(deleteProduct(a))}}>삭제</button>
            </div>
        );
        })}
    </>
    );
}

const calculator = (e)=>{
    return e.price * e.count
    //함수 내부에서 해당 변수가 없으면 상위 스코프에서 변수를 찾음 -> 변수 스코프 체인(variable scope chain)
    //여기서 price, count 선언 안해도 함수 쓰는곳에서 선언되어있으면 ㄱㅊ
}

export default CartList;