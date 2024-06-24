import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";

const Edit = () =>{
    const params = useParams();
    const nav = useNavigate();
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext);
    const curDiaryItem = useDiary(params.id);
    
    const onSubmit = (input) =>{
        if(window.confirm("일기를 정말 수정할까요?")){
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
        nav('/',{replace: true});
        }
    };
    const onClickDelete = () =>{
        //브라우저 내장기능으로 팝업창 생성
        if(window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")){
            // 일기 삭제 로직
            onDelete(params.id);
            nav('/',{replace: true});
        }};
    
    return (<div>
        <Header 
            title={"일기 수정하기"} 
            leftChild={<Button text={"< 뒤로 가기"} onClick={()=> nav(-1)}/>}
            rightChild={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete}/>} /> 
            <Editor onSubmit={onSubmit} initData={curDiaryItem}/>
        </div>);


};

export default Edit;