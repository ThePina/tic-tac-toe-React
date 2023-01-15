import { useState} from 'react';
import './TableStyle.css'
import Swal from 'sweetalert2'
export default function TableGame(){
    const [p1Mark]=useState('O');
    const [p2Mark]=useState('X');
    const [cpu,setCpu]=useState(false);
    const [tableGame, setTableGame] = useState([
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]);
    const [tableGameOver, setTableGameOver] = useState([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);

    function resetGame(){
      window.location.reload();
    }

    


    function validGame(){
      console.log("check")
      //diagonal
      
        if(tableGame[0][0]!=="-" && 
          tableGame[0][0] ===tableGame[1][1] &&
          tableGame[0][0]===tableGame[2][2]){

            let copy = [...tableGameOver];
            copy[0][0]='x';
            copy[1][1]='x';
            copy[2][2]='x';
            setTableGameOver(copy)
            return true
        }
        if(tableGame[0][2]!=="-" && 
          tableGame[0][2] ===tableGame[1][1] && 
          tableGame[0][2]===tableGame[2][0]){

            let copy = [...tableGameOver];
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

            let copy = [...tableGameOver];
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

            let copy = [...tableGameOver];
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
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Juego terminado',
          text: "Has perdido",
          showConfirmButton: false,
          timer: 5000
        }).then((result) => {
          if (result.isDismissed) {
           resetGame()
          }
        })
       
        resetGame()

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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Juego terminado',
          text: "Has ganado",
          showConfirmButton: false,
          timer: 5000
        }).then((result) => {
          if (result.isDismissed) {
            resetGame()
          }
        })
      }
    
      
    };
    
    return(
      <div className='tic-tac-toe-space'>
      <div className={"robot "+(cpu?"active":"discabled")}>
        
      <div className="robot-antena"></div>
      <div className={(cpu?"pulse":"none")}></div>
        <div className='robot-head'>
          <div className='robot-eyes'>
            <div className={'robot-eyes-left '+(cpu?"robot-eyes-active":null)}></div>
            <div className={'robot-eyes-rigth '+(cpu?"robot-eyes-active":null)}></div>
          </div>
          <div className='robot-mouth'></div>
        </div>
        <div className='robot-neck'></div>
      </div>

      <div className={"human "+(cpu?"discabled":"active")}>
        <div className='head-space'>
          {!cpu&&
          <div className='speech-bubble'>
            <span className='thinking'>&#63;</span>
          </div>
          }
        </div>
        <div className='human-head'>
          <div className='human-eyes'>
            <div className='human-eyes-left'></div>
            <div className='human-eyes-rigth'></div>
          </div>
          <div className='human-mouth'></div>
        </div>
        <div className='human-neck'></div>
      </div>
      <h1>turn</h1>
    
      <h1>{cpu?'O':'X'}</h1>
      <h1>{cpu?"cpu":"human"}</h1>
      <div className='table'>
     {(
     tableGame.map((row,i) =>
      <div className='row-table'>
        { row.map(((col,j)=>
              <div 
                className={'cell ' +
                (tableGame[i][j]==="X" ? " cross " :
                tableGame[i][j]==="O" ? " circle ":
                null)
                +
                (tableGameOver[i][j]==="x"? "mark":
                null)
                
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
      
      ))}
      </div>
      </div>
    );
}