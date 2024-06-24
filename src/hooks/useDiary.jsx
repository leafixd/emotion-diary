import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    //일단 Context에서 전체 data 가져오기
    const data = useContext(DiaryStateContext);
    //불러온 Diary를 state에 저장
    const [curDiaryItem, setCurDiaryItem] = useState(); 
    //params 까지 import 할필요는 없고 그냥 인수로 받아오면 됨
    const nav = useNavigate();

    //id값을 조회해서 불러온 data 중에 맞는 아이를 골라내기
    useEffect(()=>{
        const currentDiaryItem = data.find(
            (item)=>String(item.id) === String(id));
        if(!currentDiaryItem){//잘못들어간 경우
            window.alert("존재하지 않는 일기입니다");
            nav('/',{replace:true});
        }
        setCurDiaryItem(currentDiaryItem);
    },[id, data]);

    //최종 반환값
    return curDiaryItem;
};

export default useDiary;