let btnOne=document.getElementById('one');
let selectDiv=document.getElementById('select');
let selectdif=document.getElementById("selectdif"); //level
let btnTwo=document.getElementById('two');
let btnPlay = document.querySelectorAll(".MyButton");
let textPlay=document.getElementById("textPlay");
let massage=document.getElementById("container4");
let WhoWiner=document.getElementById("WhoWiner");
let newGameBtn=document.getElementById("newGameBtn");
let resetBtnn=document.getElementById('resetBtn');
let levelh = document.getElementById('hard');
let levelm = document.getElementById('easy');
let levele = document.getElementById('meduim');
let flagmode=0; //0->hard ,1->meduim , 2->easy
let flagX = true;
let flagpalyer ;
let counter = 0;
let winIndex = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
/********************************************************************************************** */
var XOarr = new Array();
var choice;
/********************************************************************************************** */
//when click to one player button
btnOne.addEventListener('click',()=>{
selectDiv.style.display='none';
selectdif.style.display="block";
flagX=true;//to start game with x
BtnEnable();
textPlay.innerHTML="Player X's turn";

});
//when click to two player button
btnTwo.addEventListener('click',()=>{
    flagpalyer=true;
    selectDiv.style.display='none';
    selectdif.style.display='none';
    massage.style.display='none';
    flagX=true;//to start game with x
    BtnEnable();
    textPlay.innerHTML="Player X's turn";
    
    
});
//click on hard game
levelh.addEventListener("click", () => {
 // onetwoplayer=1;
  flagpalyer=false;
  flagmode=0;
  selectDiv.style.display='none';
  selectdif.style.display='none';
  massage.style.display='none';
  flagX=true;//to start game with x
  BtnEnable();
  textPlay.innerHTML="Player X's turn";
  //play1();
  
});
//click on meduim game
levelm.addEventListener("click", () => {
  // onetwoplayer=1;
   flagpalyer=false;
   flagmode=1;
   selectDiv.style.display='none';
   selectdif.style.display='none';
   massage.style.display='none';
   flagX=true;//to start game with x
   BtnEnable();
   textPlay.innerHTML="Player X's turn";
   //play1();
   
 });
 //click on easy game
levele.addEventListener("click", () => {
  // onetwoplayer=1;
   flagpalyer=false;
   flagmode=2;
   selectDiv.style.display='none';
   selectdif.style.display='none';
   massage.style.display='none';
   flagX=true;//to start game with x
   BtnEnable();
   textPlay.innerHTML="Player X's turn";
   //play1();
   
 });
//when click to new game player
newGameBtn.addEventListener("click", () => {
  counter = 0;
  flagX=true;//to start game with x
  massage.style.display="none";
  selectDiv.style.display='block';
  selectdif.style.display='none';
  
});


//when click to reset button
resetBtnn.addEventListener("click", () => {
  counter = 0;
   BtnEnable();
   flagX=true;//to start game with x
   textPlay.innerHTML="Player X's turn";
   massage.style.display="none";
   selectDiv.style.display='none';
   selectdif.style.display='none';
 });

//deside the winner
  const winerFun = (winer) => {
   
    if (winer == "X") {
        WhoWiner.innerHTML = "&#11088;&#11088;&#11088; <br>X win";
    } else {
        WhoWiner.innerHTML = "&#11088;&#11088;&#11088; <br> O win ";
    }
    massage.style.display="block";
    selectDiv.style.display='none';
    selectdif.style.display='none';

  };
 

const BtnEnable=()=> {
  let c=0;
  Xflag=true; //always start with X
    btnPlay.forEach((e) => {
        e.innerText = "";
        e.disabled = false;
        XOarr[c++] = '';
    });
    massage.style.display = "none";
    textPlay.innerHTML="Player X's turn";
}

const CheckTheWinner = () => {
    for (let i of winIndex) {
      let [e1, e2, e3] = [btnPlay[i[0]].innerText, btnPlay[i[1]].innerText,btnPlay[i[2]].innerText,];
      if (e1 != "" && (e2 != "") & (e3 != "")) {
        if (e1 == e2 && e2 == e3) {
          winerFun(e1);
        }
      }
    }
   // textPlay.innerHTML="Player X's turn";
  };

  const noOneWin=()=>{
    textPlay.innerHTML="NO Winner!";

  }
    btnPlay.forEach((e) => {
      e.addEventListener("click", () => {
        if(flagpalyer){ //if two player
          if(e.innerText==""){
              counter += 1;
          }
        if (flagX) { 
          e.style.color='#012E40';
          e.innerText = "X";
          e.disabled = true;
          flagX = false;
          textPlay.innerHTML="Player O's turn";
        } else {
          e.innerText = "O";
          e.disabled = true;
          flagX = true;
          e.style.color='#F2668B';
          textPlay.innerHTML="Player X's turn";
        }
        
      
        if (counter == 9) {
          noOneWin();
        }
        CheckTheWinner();
      }

    else{ //if one player ***************************************************************************************************************************************************
     // NewGame(); 
     
    //console.log(e.id);
      //MakeMove(e.id);
      if (!GameOver(XOarr) && XOarr[e.id] == '')
      {
        //first x play (you)
          XOarr[e.id] = 'X';
         document.getElementById(e.id).style.color='#012E40';//#012E40
         document.getElementById(e.id).innerText="X";
         document.getElementById(e.id).disabled=true;
         // then computer play if the game doesn't finish
          if (!GameOver(XOarr))
          {
             flagX=false;
              textPlay.innerHTML="Player O's turn";
              //playcomputer();
              alphaBetaMinimax(XOarr, 0, -Infinity, +Infinity);
              var move = choice;
              //console.log("dnO "+move);
              XOarr[move] = 'O';
              document.getElementById(move).style.color='#F2668B';
              document.getElementById(move).innerText="O";
              document.getElementById(move).disabled=true;
              choice = [];
             flagX=true;
              if (!GameOver(XOarr))
              {
                textPlay.innerHTML="Player X's turn";    
              }
          }
      }
    }
    });
    });
   //********************************************---------------------------------------------****************---------------------------------------------------************************************************************************************************


  
  function GameScore(game, depth) {
      var score = CheckForWinner(game);
      if (score === 1){
         
          return 0;
        }
      else if (score === 2){
        if(flagmode==0)return depth-10;
        else if(flagmode==1)return 10;
        else if(flagmode==2)return -10;
          }
      else if (score === 3){       
         if(flagmode==0)return 10-depth;
        else if(flagmode==1)return -10;
        else if(flagmode==2)return 10;}
  }
  
  function alphaBetaMinimax(node, depth, alpha, beta) {
      if (CheckForWinner(node) === 1 || CheckForWinner(node) === 2 
              || CheckForWinner(node) === 3)
          return GameScore(node, depth);
      
      depth+=1;
      var availableMoves = xoArr_avail(node);
      var move, result, possible_game;
      if (flagX==false) {
          for (var i = 0; i < availableMoves.length; i++) {
              move = availableMoves[i];
              possible_game = GetNewState(move, node);
              result = alphaBetaMinimax(possible_game, depth, alpha, beta);
              node = UndoMove(node, move);
              if (result > alpha) {
                  alpha = result;
                  if (depth == 1)
                      choice = move;
              } else if (alpha >= beta) {
                  return alpha;
              }
          }
          return alpha;
      } else {
          for (var i = 0; i < availableMoves.length; i++) {
              move = availableMoves[i];
              possible_game = GetNewState(move, node);
              result = alphaBetaMinimax(possible_game, depth, alpha, beta);
              node = UndoMove(node, move);
              if (result < beta) {
                  beta = result;
                  if (depth == 1)
                      choice = move;
              } else if (beta <= alpha) {
                  return beta;
              }
          }  
          return beta;
      }
  }
  
  function UndoMove(game, move) {
      game[move] = '';
      ChangeTurn();
      return game;
  }
  
  function GetNewState(move, game) {
      var piece = ChangeTurn();
      game[move] = piece;
      return game;
  }
  
  function ChangeTurn() {
      var piece;
      if (flagX==false) {
          piece = 'O';
         flagX=true;
      } else {
          piece = 'X';
          flagX=false;
      }
      return piece;
  }
  
  function xoArr_avail(xo) {
      var possibleMoves = new Array();
      for (var i = 0; i < 9; i++)
      {
          if (xo[i] === '')
              possibleMoves.push(i);
      }
      return possibleMoves;
  }
  
  // Check for a winner.  Return
  //   0 if no winner or tie yet
  //   1 if it's a tie
  //   2 if HUMAN_PLAYER won
  //   3 if COMPUTER_PLAYER won
  function CheckForWinner(game) {
      // Check for horizontal wins
      for (i = 0; i <= 6; i += 3)
      {
          if (game[i] == 'X' && game[i + 1] == 'X' && game[i + 2] == 'X')
              return 2;
          if (game[i] == 'O' && game[i + 1] == 'O' && game[i + 2] == 'O')
              return 3;
      }
  
      // Check for vertical wins
      for (i = 0; i <= 2; i++)
      {
          if (game[i] == 'X' && game[i + 3] == 'X' && game[i + 6] == 'X')
              return 2;
          if (game[i] == 'O' && game[i + 3] == 'O' && game[i + 6] == 'O')
              return 3;
      }
  
      // Check for diagonal wins
      if ((game[0] == 'X' && game[4] == 'X' && game[8] == 'X') ||
              (game[2] == 'X' && game[4] == 'X' && game[6] == 'X'))
          return 2;
  
      if ((game[0] == 'O' && game[4] == 'O' && game[8] == 'O') ||
              (game[2] == 'O' && game[4] == 'O' && game[6] == 'O'))
          return 3;
  
      // Check if no one win
      for (i = 0; i < 9; i++)
      {
          if (game[i] != 'X' && game[i] != 'O')
              return 0;
      }   
      return 1;
  }
  
  function GameOver(game)
  {
      if (CheckForWinner(game) == 0)
      {
          return false;
      }
      else if (CheckForWinner(game) == 1)
      {
        textPlay.innerHTML="NO Winner!";
      }
      else if (CheckForWinner(game) == 2)
      {
        WhoWiner.innerHTML = "&#11088;&#11088;&#11088; <br>X win";
        massage.style.display="block";
        selectDiv.style.display='none';
        selectdif.style.display='none';
      }
      else
      {
        WhoWiner.innerHTML = "&#11088;&#11088;&#11088; <br> O win ";
        massage.style.display="block";
        selectDiv.style.display='none';
        selectdif.style.display='none';
      }
      return true;


  }
  
 

