import {displayCrosshair, getCrosshairRect, setupCrosshair} from './crosshair.js'
import {getTargetRect, getNewTarget, moveTarget, displayTarget} from './target.js'


const btnStart = document.querySelector("#btn-start")
const worldElement = document.querySelector("[data-world]")
var gameStart=false;
// setupWorld()

btnStart.addEventListener("click",handleStart)

function setupWorld()
{
    document.addEventListener("mousedown",handleFire);
    document.addEventListener("mousemove",mouseMoves);
    setupCrosshair()
    getIntoGame()
    getNewTarget()
    displayCrosshair()
    displayTarget()
}

function mouseMoves(e)
{
    if(gameStart && document.pointerLockElement)
        moveTarget(e.movementX,e.movementY);
}

function handleStart()
{
    setupWorld()
}

export function getWorldWidth()
{
    return worldElement.offsetWidth;
}


export function getWorldHeight()
{
    return worldElement.offsetHeight;
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
    
    console.log(crosshairRect)
    console.log(targetRect)
    
    if(isCollision(crosshairRect, targetRect))
    {
        getNewTarget()
    }
    
    
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    );
}