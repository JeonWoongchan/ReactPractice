import { configureStore, createSlice } from '@reduxjs/toolkit'

let cartList = createSlice({//상품 목록
    name : 'cartList',
    initialState : '',
    reducers : {
        setCartList(state, action){
            return action.payload
        },

        addProduct(state, action){
            const obj = action.payload;
            const found = state.find((e) => e.id == obj.id); //found는 find 조건에 맞는 요소의 참조->found 그대로 수정하면 원본도 수정->불변성원칙 깨짐
            if(found){
                const updateItem = {...found, count : found.count += 1}
                const updateCartList = [...state, updateItem]
                setCartList(updateCartList)
            }else{
                const newItem = { ...obj, count: 1 };
                return [...state, newItem];
            }
        },
        // addProduct나 deleteProduct 처럼 아예 객체 하나를 추가하거나 삭제할 때는 return 해줘야됨
        deleteProduct(state, action){
            const copy = [...state];
            const obj = action.payload;
            const found = copy.filter((e) => e.id != obj.id);  
            return found
        },
        // addCount 처럼 수정만 하는 경우는 변경함수인 setCartList를 써도됨 -> 아직 이해안되는데 걍 알아두자
        // 객체를 추가하거나 삭제하는 경우:
        //     addProduct나 deleteProduct와 같이 Redux 상태에서 객체를 추가하거나 삭제할 때는 새로운 상태를 반환하는 것이 중요합니다. 
        //     불변성을 유지하기 위해 새로운 객체나 배열을 만들어서 이를 반환하는 것이 일반적인 방법입니다.
        // 객체를 수정하는 경우:
        //     addCount와 같이 기존 객체의 일부를 수정할 때는 상태를 직접 변경하는 것이 아니라, 새로운 수정된 객체를 생성하고 
        // 이를 Redux 상태에 설정하는 것이 좋습니다. 이때는 setCartList나 유사한 변경 함수를 사용하여 새로운 객체를 설정합니다.
        //     이러한 방법으로 Redux 상태를 변경하면 Redux가 상태 변경을 감지하고 관련된 컴포넌트를 업데이트할 수 있습니다. 
        // 불변성을 유지하면서 상태를 변경하는 것이 Redux에서 중요한 원칙 중 하나이며, 이를 준수하면 예측 가능하고 안정적인 상태 관리를 할 수 있습니다.

        addCount(state, action){
            const obj = action.payload
            const found = state.find((e) => e.id == obj.id);
            const updateItem = {...found, count : found.count += 1}
            setCartList(updateItem)
        },

        subtractCount(state, action){
            const obj = action.payload
            const found = state.find((e) => e.id == obj.id);
            let updateItem = '';
            if(found.count > 1){
                updateItem = {...found, count : found.count -= 1}
            }
            setCartList(updateItem)
        }
    }
    
})

export let { setCartList, addProduct, deleteProduct, addCount, subtractCount } = cartList.actions

export default cartList