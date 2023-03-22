
import { getWorldHeight, getWorldWidth } from "./script.js";
import { setCustomProperty,getCustomProperty } from "./updateCustomProperty.js";

const crosshairElement = document.querySelector("[data-crosshair]")



// window.addEventListener("mousemove", function(e) {
          
//     // gets the object on image cursor position
//     setCustomProperty(crosshairElement, "--left", e.clientX);
//     setCustomProperty(crosshairElement, "--top", e.clientY);
// })


export function displayCrosshair()
{
    setCustomProperty(crosshairElement,"visibility","visible")
}

export function setupCrosshair()
{

    const initialLeft=getWorldWidth()/2;
    const initialTop = getWorldHeight()/2;
    console.log(initialLeft)
    console.log(initialTop)
    setCustomProperty(crosshairElement, "--left", initialLeft);
    setCustomProperty(crosshairElement, "--top", initialTop);

    
}

export function getCrosshairRect() {
    return crosshairElement.getBoundingClientRect();
}

