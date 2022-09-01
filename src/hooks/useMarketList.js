import { useReducer } from "react";
import nextId from "react-id-generator";

const initialState = [];

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD':
      return [...state, action.item];
    case 'CHECK':
      return state.map(item => {
        if(item.id === action.id){
          return {...item, check: !item.check};
        } else {
          return item;
        }
      });
    case 'REMOVE':
      return state.filter(item => {
        return item.id !== action.id;
      });
    default:
      return state; 
  }
}

const useMarketList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (title) => {
    const hashId = nextId();

    dispatch({type: 'ADD', item: {
      id: hashId,
      title: title,
      check: false
    }})
  };

  const removeItem = (id) => {
    dispatch({type: 'REMOVE', id: id});
  };

  const checkItem = (id) => {
    dispatch({type: 'CHECK', id: id})
  };

  return [state, addItem, removeItem, checkItem];
}

export default useMarketList;

