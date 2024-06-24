import { useReducer, useRef, createContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';


function reducer(state, action) {
  let nextState;
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE': {
      nextState = [...state,action.data]; 
      break;}
    case 'UPDATE': { state.map((item) =>
      String(item.id) === String(action.data.id)
      ? action.data : item); 
      break;} 
    case 'DELETE': {
      nextState = state.filter((item)=>String(item.id) !== String(action.id));
      break;}
    default:
      nextState = state;
  }
  //일기 데이터가 바뀔때마다 로컬스토리지에 저장
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

  

function App() {
  // 일기데이터를 관리하기 위해 state객체 생성 reducer-상태관리함수, mockData-state초기값
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const storedData = localStorage.getItem("diary");
    if(!storedData){
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    if(!Array.isArray(parsedData)){
      setIsLoading(false);
      return ; //forEach- data가 배열 아닐때 오류처리
    }
    
    //ref값을 그때그때 데이터 중 가장큰값을 찾아 +1 해주게 하기
    let maxId = 0;
    parsedData.forEach((item) => {
      if(Number(item.id) > maxId){
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId +1;

    dispatch({
      type:"INIT",
      data: parsedData
    });
    setIsLoading(false);
  }, []);

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
  if(isLoading){
    return <div>데이터 로딩중입니다 ...</div>;
  }

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
