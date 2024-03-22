import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import reactStringReplace from 'react-string-replace';

import React, {useState, useEffect} from 'react'
import { setCartList, addProduct, changeCount, Add } from './store/cartListSlice';
import { useSelector, useDispatch } from 'react-redux';


function Products(props) {
    let product = useSelector((state)=> state.product)
    let cartList = useSelector((state)=> state.cartList);
    let dispatch = useDispatch();

    const Add = (e)=>{
        if(cartList.length === 0){
            const updateDragProduct = {...e, count:1} // count 추가
            const updatedCartList = [...cartList, updateDragProduct]; // count 추가한거 cartList 복사본이랑 합치기
            dispatch(setCartList(updatedCartList))            
        }else{
            dispatch(addProduct(e));
        }
    }
    
    if (!product || product.length === 0) { // state 비어있으면 map 안돌아감 -> 없으면 실행하지말라고 해줌 
        return null;
    }
    return (
    <> 
        {product.map((a, i) => { // 진짜 개고생함 replace 하는건 product목록 만드는 곳에서 해줘야됨->걍 이렇게 하는구나만 알자
            const highlightedTitle = reactStringReplace(a.title, props.searchText, (match, i) => (
                <span key={i} style={{background : "yellow"}}>
                    {match}
                </span>
            ));
            const highlightedBrand = reactStringReplace(a.brand, props.searchText, (match, i) => (
                <span key={i} style={{background : "yellow"}}>
                    {match}
                </span>
            ));

        return (
            <div className='box' key={a.id}>
                <div className='img-box'>
                    {
                        product !== props.cartList ?
                        <img src={`img/pr${a.id + 1}.JPG`} alt={a.title} id={a.id} draggable onDragStart={props.dragStart}/> :
                        <img src={`img/pr${a.id + 1}.JPG`} alt={a.title} id={a.id} draggable="false"/>
                    } 
                </div>
                <div className="info">
                    {/* 검색어에 형광펜 스타일 적용된 제목 */}
                    <h4 id={`title${a.id}`}>{highlightedTitle}</h4>
                    <p id={`brand${a.id}`}>{highlightedBrand}</p>
                    <p>{a.price}</p>
                </div>
                    {
                        product !== props.cartList ?
                        <button className="add btn btn-primary" onClick={()=>{Add(a)}}>담기</button> :
                        <p id={`count${a.id}`}>
                            <button>+</button>
                            {a.count}
                            <button>-</button>
                        </p>
                    }         
            </div>
        );
        })}
    </>
    );
}

export default Products;