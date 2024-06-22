import { useState, useContext } from 'react';
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from '../App';

const getMonthlyData = (pivotDate, data) =>{
    // 이번달의 시작- 1일 0시 0분 0초 지정& 비교하기 쉽게 숫자값으로
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    // 이번달의 끝 = 다음달의 시작보다 하루전 - 0일 23시 59분 59초 지정 &비교하기 쉽게 숫자값으로
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();

    return data.filter((item)=> beginTime <= item.createdDate && item.createdDate <=endTime);
}

const Home = () =>{
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate]= useState(new Date());

    const onDecreaseMonth = () =>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() -1 ));
    };
    const onIncreaseMonth = () =>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() +1 ));
    };

    const monthlyData = getMonthlyData(pivotDate, data);
    return (<div>
        <Header 
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"}/>}
        rightChild={<Button onClick={onIncreaseMonth} text={">"}/>}/>
        <DiaryList data={monthlyData}/>
    </div>);
};

export default Home;