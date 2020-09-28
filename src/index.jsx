import React from "react";
import ReactDOM from "react-dom";
//載入react component
//UI介面:遊戲盤Board、框框*9Cell、線段Line
//title
class Title extends React.Component{
    render(){
        return <h1 className="title">圈叉遊戲</h1>
    }
}

class ResetBtn extends React.Component{
    render(){
        return <button class="reset" type="button" onClick={this.clickHandler.bind(this)}>重新開始</button>;
    }

    clickHandler(){
        location.reload();
    }
}

    //Cell
    class Cell extends React.Component{
    render(){
        let text="";
        if(this.props.mark ===0){
            text="O";
        }else if(this.props.mark ===1){
            text="X";
        }

        return <div className="cell" onClick={this.clickHandler.bind(this)}>{text}</div>;
    }

    clickHandler(){
        this.props.update(this.props.index);
    }
}

//Line
class Line extends React.Component{
    render(){
        let startX = this.props.startIndex%3;
        let startY = Math.floor(this.props.startIndex/3);
        let endX = this.props.endIndex%3;
        let endY = Math.floor(this.props.endIndex/3);

        let boardW=document.getElementsByClassName('board')[0].clientWidth;
        console.log(boardW);
        if(boardW === 300){
            return <svg className="line"><line x1={startX*100+50} y1={startY*100+50} x2={endX*100+50} y2={endY*100+50} stroke="red" strokeWidth="5"></line></svg>
        }else if(boardW === 240){
            return <svg className="line"><line x1={startX*80+40} y1={startY*80+40} x2={endX*80+40} y2={endY*80+40} stroke="red" strokeWidth="5"></line></svg> 
        }
        
    };
}

//Board
class Board extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            /*點擊一次算一回合*/
            circle:0,
            /*0代表圈、1代表叉、-1代表尚未標記*/
            marks:[-1,-1,-1,-1,-1,-1,-1,-1,-1],
            winner:null
        };
    }

    render(){
        
        //繪圖，要把框框加入到裡面
        //索引值
        /*
        0 1 2
        3 4 5
        6 7 8
        */
        let cells=[];
        for(let i =0;i<this.state.marks.length;i++){
            cells.push(<Cell index={i} mark={this.state.marks[i]} update={this.updateMark.bind(this)}/>); 
        }

        //檢查有沒有贏家，如果有的話加上線段
        if(this.state.winner !== null){
            cells.push(<Line startIndex={this.state.winner.startIndex} endIndex={this.state.winner.endIndex}/>);
        }
        return <div className="board">{cells}</div>;
    }

    //方法
    //更新標記
    updateMark(index){
        this.setState((preState)=>{
            let currentMark = preState.marks[index];
            if(currentMark === -1 && preState.winner===null){
                //加入標記，透過回合數判斷此標記是圈、叉
                let mark = preState.circle%2;
                preState.marks[index]=mark;
                let winner = this.checkWinner(preState.marks);
                return {
                    circle:preState.circle+1,
                    marks:preState.marks,
                    winner:winner
                };
            }
        })

    }
    //檢查是否有贏家
    //檢查水平、垂直、斜線
    //水平3次、垂直3次、斜線2次
    //紀錄startIndex、endIndex
    /*
    0 1 2
    3 4 5
    6 7 8
    */
    checkWinner(marks){
        let index;
        for(let y=0;y<3;y++){
            if(marks[y*3]!==-1 && marks[y*3]===marks[y*3+1] && marks[y*3+1]===marks[y*3+2]){
                return {side:marks[y*3],startIndex:y*3,endIndex:y*3+2};
            }   
        }

        for(let x=0;x<3;x++){
            if(marks[x]!==-1 && marks[x] === marks[x+3] && marks[x+3]===marks[x+6]){
                return {side:marks[x],startIndex:x,endIndex:x+6};
            }
        }

        if(marks[0]!==-1 && marks[0] === marks[4] && marks[4]===marks[8]){
            return {side:marks[0],startIndex:0,endIndex:8};
        }

        else if(marks[2]!==-1 && marks[2] === marks[4] && marks[4]===marks[6]){
            return {side:marks[2],startIndex:2,endIndex:6};
        }
        else{
            return null;
        }

    }

}

class Comtainer extends React.Component{
    render(){
        return <div><Title /><Board /><ResetBtn /></div>
    }
}

window.addEventListener('load',()=>{
    ReactDOM.render(<Comtainer />,document.body);
})