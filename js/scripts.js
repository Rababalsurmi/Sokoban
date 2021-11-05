        var WALL = "WALL";
        var FLOOR = "FLOOR";
        var TARGET = "TARGET";
        var PLAYER = "PLAYER";
        var BOX = "BOX";

        var gPlayerPos = {i: 2, j: 9};
        var gBoard = buildBoard();
       
        
        
        function buildBoard(){
            //Create the Matrix
            var board = new Array(10);
            for (var i=0; i<board.length; i++){
                board[i] = new Array(12);
            }
            //Put FLOOR everywhere and WALL at the edges
            for (var i=0; i<board.length; i++)
            {
                for (var j=0; j<board[0].length; j++)
                {
                    var cell = {type: FLOOR, gameElement: null};
                    //if at edge
                    if( i == 0 || i == board.length-1 || j == 0 || j == board[0].length-1){
                        cell.type = WALL;
                    } 
                    board[i][j] = cell;
                }
            }
            //Put some TARGETS
            board[6][10].type = TARGET;
            board[7][10].type = TARGET;
            board[8][10].type = TARGET;
            board[4][4].type = TARGET;
            //Place the PLAYER
            board[gPlayerPos.i][gPlayerPos.j].gameElement = PLAYER;
            //Place the BOXES
            board[2][2].gameElement = BOX;
            board[3][8].gameElement = BOX;
            board[5][5].gameElement = BOX;
            board[6][2].gameElement = BOX;

            //Put some WALLS
            board[4][2].type = WALL;

            board[3][3].type = WALL;
            board[4][3].type = WALL;
            board[5][3].type = WALL;
            board[7][3].type = WALL;
            board[8][3].type = WALL;

            board[3][5].type = WALL;
            board[4][5].type = WALL;
            board[8][5].type = WALL;

            board[3][6].type = WALL;
            board[7][6].type = WALL;
            board[8][6].type = WALL;

            board[5][9].type = WALL;
            board[5][10].type = WALL;

            board[1][9].type = WALL;
            board[3][9].type = WALL;
            board[1][10].type = WALL;
            board[2][10].type = WALL;
            board[3][10].type = WALL;

            console.log(board);
            return board;
        }

        function printBoard(){
            var tblBoard = document.getElementById('tblBoard');
            var strHTML = '';

            for (var i=0; i<gBoard.length; i++)
            {
                strHTML += "<tr>";
                for (var j=0; j<gBoard[0].length; j++)
                {
                    var currentCell = gBoard[i][j];
                    var cellClass;
                    if(currentCell.type == FLOOR){
                        cellClass = "floor";
                    }else if(currentCell.type == WALL){
                        cellClass = "wall";
                    }else if(currentCell.type == TARGET){
                        cellClass = "target";
                    }
                    strHTML += "<td class = ' cell " + cellClass + " ' onclick='handleClick("+i+","+j+")' >";
                    
                    if(currentCell.gameElement == PLAYER){
                        strHTML += "<img src='./img/player.png'>"; 
                    }else if(currentCell.gameElement == BOX){
                        strHTML += "<img src='./img/box.png'>";
                    }   
                        
                    strHTML += "</td>";
                }
                strHTML += "</tr>";
            }
            tblBoard.innerHTML = strHTML;
        }

        function handleClick(i, j){
            var iDiff = i - gPlayerPos.i;
            var jDiff = j - gPlayerPos.j;
            var iAbsDiff = Math.abs(i - gPlayerPos.i);
            var jAbsDiff = Math.abs(j - gPlayerPos.j);

            // If the clicked cell is one of the 4 allowed
            if((iAbsDiff == 1 && jAbsDiff == 0) || (jAbsDiff == 1 && iAbsDiff == 0)){

                if(gBoard[i][j].type != WALL){
                    //console.log("Moving");

                    var canMove = true;

                    if(gBoard[i][j].gameElement == BOX){
                        //Can MOV if there is no WALL or other game element
                        if(gBoard[i+iDiff][j+jDiff].type != WALL && gBoard[i+iDiff][j+jDiff].gameElement == null){
                            //MOVE THE BOX
                            gBoard[i][j].gameElement = null;
                            gBoard[i+iDiff][j+jDiff].gameElement = BOX;
                        }else {
                            //can't move - there is a WALL behind the BOX
                            console.log("WALL Behind BOX");
                            canMove = false;
                        }
                        
                    }
                    if(canMove){
                        //MOVING
                        gBoard[gPlayerPos.i][gPlayerPos.j].gameElement = null;
                        gPlayerPos.i = i;
                        gPlayerPos.j = j;
                        gBoard[gPlayerPos.i][gPlayerPos.j].gameElement = PLAYER;

                        //Update steps count
                        var spnStepsCount = document.getElementById('spnStepsCount');
                        spnStepsCount.innerHTML++;

                        printBoard();
                        checkVictory();
                    }
                    
                }


            }//else console.log("TOO FAR", iAbsDiff, jAbsDiff);
            

        }

        function checkVictory(){
            var isVictory = true;
            for(var i=0; i<gBoard.length; i++){
                for(var j=0; j<gBoard[0].length; j++){
                    var currentCell =gBoard[i][j];
                    if(currentCell.type == TARGET && currentCell.gameElement != BOX) isVictory = false;
                }  
            }
            if(isVictory) alert("You Won!")
        }

        function handlekey(event){
            //console.log(event.keyCode, event.key);

            var i = gPlayerPos.i;
            var j = gPlayerPos.j;

            switch(event.keyCode){
                case 37: 
                    handleClick(i, j-1);
                break;
                case 39: 
                    handleClick(i, j+1);
                break;
                case 38: 
                    handleClick(i-1, j);
                break;
                case 40: 
                    handleClick(i+1, j);
                break;

            }
        }
        window.addEventListener("keydown", function(e) {
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);
        