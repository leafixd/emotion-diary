import Button from "./Button";
import './DiaryList.css';
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({data}) =>{

    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const onChangeSortType = (e) =>{
        setSortType(e.target.value);
    };
    const getSortedDate = () =>{
        //sort메서드- 반환하지 않고 원본배열을 정렬하는 메소드 toSorted - 원본은 냅두고 새로운 배열 반환해줌
        // 
        return data.toSorted((a,b)=>{
            if(sortType==='oldest'){
                return Number(a.createdDate)-Number(b.createdDate);
            } else {
                return Number(b.createdDate)-Number(a.createdDate);
            }
        });};

    const sortedData = getSortedDate();
    return (<div className="DiaryList">
        <div className="menu_bar">
            <select onChange={onChangeSortType}>
                <option value={"latest"}>최신순</option>
                <option value={"oldest"}>오래된 순</option>
            </select>
            <Button onClick={()=>nav('/new')}text={"새 일기 작성"} type={"POSITIVE"}/>
        </div>
        <div className="list_wrapper">
            {data && sortedData.map((item)=>{
                return (<DiaryItem key={item.id} {...item}/>);
                })}
        </div>
    </div>);
};

export default DiaryList;