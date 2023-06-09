import {displayCrosshair, getCrosshairRect, removeCrosshair, setupCrosshair} from './crosshair.js'
import {getTargetRect, getNewTarget, moveTarget, displayTarget, removeTarget} from './target.js'
import { incrementCustomProperty } from './updateCustomProperty.js'



const worldElement = document.querySelector("[data-world]")
const scoreElement = document.querySelector("[data-score]")
const lifeElement = document.querySelector("[data-life]")
const backgroundElement = document.querySelector("[data-world-back]")


const WORLD_WIDTH = 13
const WORLD_HEIGHT = 9
let gameStart=false;
let consecutiveShotsMissed=0;
let totalShotsMissed=0;
let remainingLife=3;     //"❤️❤️❤️";
const totalLife=3
let score = 0;
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
    remainingLife=3
    updateLife()
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
    remainingLife=0;
    totalShotsMissed=0
    updateScore();
    updateLife();    
    removeCrosshair();
    removeTarget()

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
function updateLife()
{
    var life=""
    for(var i=0;i<remainingLife;i++)
    {
        life+="❤️";
    }

    lifeElement.textContent=`Life: ${life}`
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
        remainingLife=totalLife-totalShotsMissed;
        updateLife()
    }
    
    if(consecutiveShotsMissed>=3 || remainingLife==0)
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

function moveBackground(x,y)
{
    console.log(backgroundElement)
    incrementCustomProperty(backgroundElement,"--left",-x);
    incrementCustomProperty(backgroundElement,"--top",-y)
}

function mouseMoves(e)
{
    const mouseSenseX = document.querySelector("[mouse-x]").value
    const mouseSenseY = document.querySelector("[mouse-y]").value
    const movedXBy = (e.movementX/getWorldWidth())*mouseSenseX*100
    const movedYBy = (e.movementY/getWorldHeight())*mouseSenseY*100
    
    // const movedXBy = (e.movementX/getWorldWidth())*100
    // const movedYBy = (e.movementY/getWorldHeight())*100

    if(gameStart && document.pointerLockElement)
    {
        moveTarget(movedXBy,movedYBy);
        moveBackground(movedXBy,movedYBy);
    }
    if(!document.pointerLockElement)
        endGame()
}
