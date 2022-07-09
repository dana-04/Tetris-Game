import BLOCKS from "./blocks.js"


//DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");

//Setting
const GAME_ROWS = 20;
const GAME_COLUMNS = 10;

//Variables
let score =0;
//block time
let duration = 500;
let downInterval;
let storeMovingItem;



const movingItem = {
    type: "",
    direction: 3,
    top: 0,
    left: 0,


};


init()

// functions
// when the function first start- it makes the board with 20 rows and 10 columns
function init(){

   //... meaning: get only movingItem value. So since movingItem value is changed, it does not affect to tempMovingItem
    storeMovingItem={...movingItem};
     
    for(let i=0; i <GAME_ROWS; i++){
     prependNewLine()
    }  
    generateNewBlock()
}



function prependNewLine(){

    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j=0; j<GAME_COLUMNS; j++){
        const smallmatrix = document.createElement("li");
        ul.prepend(smallmatrix);
    }

    li.prepend(ul)
    playground.prepend(li)

}

function renderBlocks(moveType=""){
    const {type, direction, top, left } = storeMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type,"moving");
        console.log(moving)
    })
    
    BLOCKS[type][direction].some(block =>{
        //value of li in ul
        const x = block[0] + left;
        // value of li in row
        const y = block[1] +top;
        
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null
        const isAvailable = checkEmpty(target);
        if(isAvailable){
            target.classList.add(type, "moving")
        }else{
            storeMovingItem = {...movingItem}
            if(moveType === 'retry'){
                clearInterval(downInterval)
                showGameoverText()
                
            }
            setTimeout(() => {
                renderBlocks('retry')
                if(moveType==="top"){
                    stopBlock();
                }
            },0)
            return true;
            
        }
    })
    movingItem.left= left;
    movingItem.top = top;
    movingItem.direction = direction;


}

function showGameoverText(){
    gameText.style.display = "flex"
}

function stopBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("stop");
        
    })
    checkMatch()
   
}
// if the row is fulled, remove the row
function checkMatch(){
    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li =>{
            if(!li.classList.contains("stop")){
                matched = false;
            }
        })
        if (matched){
            child.remove();
            prependNewLine()
            score++;
            scoreDisplay.innerText = score;
        }
    })
    generateNewBlock()
}

function generateNewBlock(){

    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock('top',1)
    }, duration)
    //get random blocks 
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length)
       
    movingItem.type = blockArray[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction=0;
    storeMovingItem = {...movingItem};
    renderBlocks()

}

function checkEmpty(target){
    if(!target || target.classList.contains("stop")) {
        return false;

    }
    return true;
}


function moveBlock(moveType, amount){
    storeMovingItem[moveType] += amount;
    renderBlocks(moveType)
}

function changeDirection(){
    const direction = storeMovingItem.direction;
    direction === 3 ? storeMovingItem.direction =0 : storeMovingItem.direction +=1;
    renderBlocks()
}

function dropBlock(){
    clearInterval(downInterval);
    downInterval= setInterval(()=> {
        moveBlock("top",1)
    },10)
}

//event handling
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39:
            //move right
            moveBlock("left",1);
            break;
        case 37:
            //move right
            moveBlock("left",-1);
            break;
            //move down
        case 40:
            moveBlock("top", 1);
            break;  
            //moving direction
        case 38:
            changeDirection();
            break; 
            //space bar - drop blocks to the bottom in speed 10
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
    //console.log(e)
})

restartButton.addEventListener("click", () => {
    playground.innerHTML = "";
    gameText.style.display= "none"
    init()
})