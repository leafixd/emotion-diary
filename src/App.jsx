import { useReducer, useRef, createContext, useMemo } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

const mockData = [
  {id:1,
  createdDate: new Date("2024-06-22").getTime(),
  emotionId:1,
  content:"6/22 일기 내용"},
  {id:2,
    createdDate: new Date("2024-06-21").getTime(),
    emotionId:2,
    content:"6/21 일기 내용"},
  {id:3,
    createdDate: new Date("2024-05-12").getTime(),
    emotionId:3,
    content:"5/12 일기 내용"}]

function reducer(state, action) {
  switch(action.type){
    case 'CREATE': return [...state,action.data];
    case 'UPDATE': return state.map((item) =>
      String(item.id) === String(action.data.id)
      ? action.data : item);
    case 'DELETE': return state.filter((item)=>String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

  

function App() {
  // 일기데이터를 관리하기 위해 state객체 생성 reducer-상태관리함수, mockData-state초기값
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

  //새로운 일기 추가기능 - new페이지에서 제출버튼 눌렀을때
  const onCreate = (createdDate, emotionId, content) =>{
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content},
      });
  };

  //기존 일기 수정기능 - edit페이지에서 제출버튼 눌렀을때
  const onUpdate = (id,createdDate, emotionId, content) =>{
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content},
      });
  };

  //기존 일기 삭제기능 - home페이지에서 삭제버튼 눌렀을때
  const onDelete = (id) =>{
    dispatch({
      type: "DELETE",
      id,
      });
  };

  return (
    <>
    <DiaryStateContext.Provider value={data}>
    <DiaryDispatchContext.Provider value={{
      onCreate, onUpdate, onDelete}}>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/new" element={<New />}/>
      <Route path="/diary/:id" element={<Diary />}/>
      <Route path="/edit/:id" element={<Edit/>}/>
      <Route path="*" element={<Notfound/>}/>
    </Routes>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
    </>
    
  )
}

export default App
