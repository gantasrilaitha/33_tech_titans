export const initialState ={
    basket:[],
    user:null,
}

const reducer = (state,action)=>{
    console.log("action>>",action);
    switch(action.type){
        case 'ADD_TO_BASKET':
            return{
                ...state,
                basket:[...state.basket,action.item],
            };
        case 'PRINT_USER':
            return{
                ...state,
                user:action.name,
            };
        default:
            return state;
    }
};

export default reducer;