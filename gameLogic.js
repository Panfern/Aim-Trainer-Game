import {displayCrosshair, getCrosshairRect, setupCrosshair} from './crosshair.js'
import {getTargetRect, getNewTarget, moveTarget, displayTarget} from './target.js'



const worldElement = document.querySelector("[data-world]")

const WORLD_WIDTH = 13
const WORLD_HEIGHT = 9
let gameStart=false;
let consecutiveShotsMissed=0;
// setupWorld()
window.addEventListener("resize", setupWorldToEverythingRatio)




export function setupWorld()
{
    document.addEventListener("mousedown",handleFire);
    document.addEventListener("mousemove",mouseMoves);
    setupCrosshair()
    getIntoGame()
    getNewTarget()
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
    document.exitPointerLock();
    document.removeEventListener("mousedown",handleFire);
    document.removeEventListener("mousemove",mouseMoves);
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

function handleFire()
{
    const crosshairRect= getCrosshairRect()
    const targetRect= getTargetRect()
    
    
    if(isCollision(crosshairRect, targetRect))
    {
        consecutiveShotsMissed=0;
        getNewTarget()
    }
    else {
        consecutiveShotsMissed++;
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
    const mouseSenseX = document.querySelector("#mouse-x").value
    const mouseSenseY = document.querySelector("[mouse-y]").value
    const movedXBy = (e.movementX/getWorldWidth())*mouseSenseX*100
    const movedYBy = (e.movementY/getWorldHeight())*mouseSenseY*100
    if(gameStart && document.pointerLockElement)
        moveTarget(movedXBy,movedYBy);
}