import React from "react";
import CartProducts from './CartList'

import { setCartList, addProduct, changeCount } from './store/cartListSlice';
import { useSelector, useDispatch } from 'react-redux';


function Cart(props){
    let cartList = useSelector((state)=> state.cartList);
    let dragProduct = useSelector((state)=> state.dragProduct);
    let dispatch = useDispatch();

    const drop = (e)=>{
        if(cartList.length === 0){
            const updateDragProduct = {...dragProduct, count:1} // count 추가
            const updatedCartList = [...cartList, updateDragProduct]; // count 추가한거 cartList 복사본이랑 합치기
            dispatch(setCartList(updatedCartList))            
        }else{
            // 아래는 redux 안쓸때 했던 방법임
            // const found = cartList.find((e) => e.id == dragProduct.id); //object형
            //cartList 라는 state에 들어있는 배열에서 find 한거임 -> found값을 변경하면 cartList에 들어있는 배열값이 수정되는거임
            //-> 여기서 cartList라는 state를 수정하려면 setCartList(수정된 배열값) 이용해야됨
            // if(!cartList.find((e) => e.id == dragProduct.id)){
            //     const updateDragProduct = {...dragProduct, count:1} // count 추가
            //     const updatedCartList = [...cartList, updateDragProduct]; // count 추가한거 cartList 복사본이랑 합치기
            //     dispatch(setCartList(updatedCartList))
            // }else{
            //     const copy = [...cartList]   
            //     found.count += 1;
            //     const updatedCartList = [...copy]
            //     //dispatch(setCartList([...cartList]))// cartList를 직접 수정하는 코드 -> 불변성 원칙 어김
            //     // 애초에 cartList 변경하는게 state 변경하는거니까 그냥 state변경함수로 처리하는게 맞는듯(redux에서는)
            // }
            dispatch(addProduct(dragProduct));
        }
    }

    return(
        <div>
            <p className='cartTitle'>장바구니</p>
            <div className="area" 
                onDragEnter={props.dragEnter} onDrop={(e) => drop(e)} onDragOver={(e) => props.dragOver(e)}>
                    {!cartList ? 
                        <h3 id="cartText">여기로 드래그</h3> :  
                        <CartProducts searchText={props.searchText} dragStart={props.dragStart}/>
                    }
            </div>
            <div className="result">
            <h5>최종가격</h5>
            <h6>{`합계 : ${props.totalPrice()} 원`}</h6>
            <button className="buy btn btn-dark" onClick={()=>{props.setModal(true)}}>구매하기</button>
            </div> 
        </div>
    )
}

export default Cart;