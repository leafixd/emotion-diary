export const getStringedDate = (targetDate) => {
    //날짜-> YYYY-MM-DD 형태
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth()+1;
    let date = targetDate.getDate();
    //1~9 -> 09 이런식으로 바꿔줘야함
    if(month <10) {
        month = `0${month}`;
    }
    if(date <10) {
        date = `0${date}`;
    }

    return `${year}-${month}-${date}`;
}