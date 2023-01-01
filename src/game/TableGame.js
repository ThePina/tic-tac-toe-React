import { useState, useEffect } from 'react';
import './TableStyle.css'
export default function TableGame(){
    const [p1Mark]=useState('O');
    const [p2Mark]=useState('X');
    const [cpu,setCpu]=useState(false);
    const [tableGame, setTableGame] = useState([
      ['X', 'X', 'X'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]);
    const [tableGameOver, setTableGameOver] = useState([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);

    function resetGame(){

    }
    function validGame(){
      console.log("check")
      //diagonal
      
        if(tableGame[0][0]!=="-" && 
          tableGame[0][0] ===tableGame[1][1] &&
          tableGame[0][0]===tableGame[2][2]){

            let copy = [...tableGame];
            copy[0][0]='x';
            copy[1][1]='x';
            copy[2][2]='x';
            setTableGameOver(copy)
            return true
        }
        if(tableGame[0][2]!=="-" && 
          tableGame[0][2] ===tableGame[1][1] && 
          tableGame[0][2]===tableGame[2][0]){

            let copy = [...tableGame];
            copy[0][2]='x';
            copy[1][1]='x';
            copy[2][0]='x';
            setTableGameOver(copy)
            return true
        }
      
      
      
      for(let i in tableGame){
        console.log(i)
        //horizontal
        if(
          tableGame[i][0] !== "-" &&
          tableGame[i][0] === tableGame[i][1] && 
          tableGame[i][0] === tableGame[i][2] ){

            let copy = [...tableGame];
            copy[i][0]='x';
            copy[i][1]='x';
            copy[i][2]='x';
            setTableGameOver(copy)
            return true
        }
        //vertical
        else if(
          tableGame[0][i] !== "-" &&
          tableGame[0][i] === tableGame[1][i] && 
          tableGame[0][i] === tableGame[2][i] ){

            let copy = [...tableGame];
            copy[0][i]='x';
            copy[0][i]='x';
            copy[0][i]='x';
            setTableGameOver(copy)
            return true
        }
      }
      return false;
    }


    async function cpuPlay(){
      setCpu(true)
      let copy = [...tableGame];
      await new Promise(r => setTimeout(() => r(), 2000));
      let i;
      let j;
      do {
        i=Math.floor(Math.random()*(2-0+1))+0
        j=Math.floor(Math.random()*(2-0+1))+0
      } while (copy[i][j]!=='-');
          copy[i][j] = p2Mark
        
      

      setTableGame(copy)
      if(validGame()){
        //endGame
        alert("endGame cpu Win")

      }else{
        setCpu(false)
      }
      
      
     
  
      
    }

    async function play(row,col){
      console.log("juego")
      let copy = [...tableGame];
      copy[row][col] = p1Mark
      
      setTableGame(copy)
      if(!validGame()){
        cpuPlay()
      }else{
        alert("human win")
      }
    
      
    };
    
    return(
      <>
      <button onClick={()=>console.log(validGame())}>check</button>
      <h1>turn</h1>
      <h1>{cpu?'O':'X'}</h1>
      <h1>{cpu?"cpu":"human"}</h1>
     { tableGame.map((row,i) =>
      <div className='row-table'>
        { row.map(((col,j)=>
              <div 
                className={'cell ' +
                (tableGame[i][j]==="X" ? "cross" :
                tableGame[i][j]==="O" ? "circle":
                null)+' '+
                (tableGameOver[i][j]==="x"?"mark":null)
                
              }

                onClick={()=>{
                  if(tableGame[i][j]==="-" && !cpu){
                    play(i,j)
                  }
                }}
                >
                </div>
            )
        )}
      </div>
      )}
      </>

     
    );
}