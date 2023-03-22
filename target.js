import { getWorldHeight, getWorldWidth } from './script.js';
import {setCustomProperty, getCustomProperty, incrementCustomProperty} from './updateCustomProperty.js'

const targetElement = document.querySelector("[data-target]")

console.log(targetElement)



export function displayTarget()
{
    setCustomProperty(targetElement,"visibility","visible")
}

export function getNewTarget()
{
    const leftValue=randomNumberBetween(0, getWorldWidth());
    const topValue=randomNumberBetween(0, getWorldHeight());
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