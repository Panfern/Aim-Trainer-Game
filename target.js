import { getWorldHeight, getWorldWidth } from './gameLogic.js';
import {setCustomProperty, getCustomProperty, incrementCustomProperty} from './updateCustomProperty.js'

const targetElement = document.querySelector("[data-target]")
const mouseSenseX = document.querySelector("[mouse-x]")
const mouseSenseY = document.querySelector("[mouse-y]")

console.log(targetElement)


export function translateTarget()
{
    
}

export function displayTarget()
{
    setCustomProperty(targetElement,"visibility","visible")
}

export function removeTarget()
{
    setCustomProperty(targetElement,"visibility","hidden")
}

export function getNewTarget()
{
    const worldHeight = getWorldHeight();
    const worldWidth = getWorldWidth()
    const leftValue=(randomNumberBetween(0, worldWidth)/worldWidth)*100;
    const topValue=(randomNumberBetween(0, worldHeight)/worldHeight)*100;
    setCustomProperty(targetElement,"--left",leftValue);
    setCustomProperty(targetElement,"--top",topValue);

}

export function getTargetRect() {
    return targetElement.getBoundingClientRect();
}

export function moveTarget(x,y){

    incrementCustomProperty(targetElement,"--left",-x);
    incrementCustomProperty(targetElement,"--top",-y)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}