import {displayCrosshair, getCrosshairRect, setupCrosshair} from './crosshair.js'
import {getTargetRect, getNewTarget, moveTarget, displayTarget} from './target.js'



const worldElement = document.querySelector("[data-world]")
const scoreElement = document.querySelector("[data-score]")

const WORLD_WIDTH = 13
const WORLD_HEIGHT = 9
let gameStart=false;
let consecutiveShotsMissed=0;
let totalShotsMissed=0;
let score = 0;
// setupWorld()
window.addEventListener("resize", setupWorldToEverythingRatio)



export function setupWorld()
{
    document.addEventListener("mousedown",handleFire);
    document.addEventListener("mousemove",mouseMoves);
    setupCrosshair()
    getIntoGame()
    getNewTarget()
    addBonusPoints()
    displayCrosshair()
    displayTarget()
}




export function getWorldWidth()
{
    return worldElement.offsetWidth;
}

function setupWorldToEverythingRatio(e)
{
    setupCrosshair()
} 

export function getWorldHeight()
{
    return worldElement.offsetHeight;
}

function endGame(){
    gameStart=false

    score=0;
    updateScore();

    document.exitPointerLock();
    document.removeEventListener("mousedown",handleFire);
    document.removeEventListener("mousemove",mouseMoves);
}

function addBonusPoints()
{
    setTimeout(()=>{
        if(gameStart)
        {
            increaseScore(5)
            addBonusPoints()
        }
    },5000)
    console.log(`Randi ${score}`)
}

function getIntoGame()
{

    gameStart = true
    if (!document.pointerLockElement) {
        worldElement.requestPointerLock({
            unadjustedMovement: true,
        });
    }
}

function updateScore()
{
    scoreElement.textContent= `Score ${score}`
}

function increaseScore(inc=1)
{
    score+=inc
    updateScore()
}

function handleFire()
{
    const crosshairRect= getCrosshairRect()
    const targetRect= getTargetRect()
    
    
    if(isCollision(crosshairRect, targetRect))
    {
        consecutiveShotsMissed=0;
        increaseScore()
        getNewTarget()
    }
    else {
        consecutiveShotsMissed++;
        totalShotsMissed++;
    }
    
    if(consecutiveShotsMissed>=3)
    {
        gameStart = false;
        console.log(`You missed ${consecutiveShotsMissed} shots consecutively`)
        consecutiveShotsMissed=0;
        endGame()
    }
    
    console.log(consecutiveShotsMissed)
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    );
}

function mouseMoves(e)
{
    // const mouseSenseX = document.querySelector("#mouse-x").value
    // const mouseSenseY = document.querySelector("[mouse-y]").value
    // const movedXBy = (e.movementX/getWorldWidth())*mouseSenseX*100
    // const movedYBy = (e.movementY/getWorldHeight())*mouseSenseY*100
    
    const movedXBy = (e.movementX/getWorldWidth())*100
    const movedYBy = (e.movementY/getWorldHeight())*100

    if(gameStart && document.pointerLockElement)
        moveTarget(movedXBy,movedYBy);
    if(!document.pointerLockElement)
        endGame()
}