import { setupWorld } from "./gameLogic.js"
import { setCustomProperty } from "./updateCustomProperty.js"

const btnStart = document.querySelector("#btn-start")
const btnSettings = document.querySelector("#btn-settings")
const settingsNav = document.querySelector("[settings-nav]")


btnStart.addEventListener("click",handleStart)
btnSettings.addEventListener("click",toggleSettings)
console.log(btnStart)
function handleStart()
{
    setupWorld()
}

function toggleSettings()
{
    if(settingsNav.style.visibility === "hidden")
    setCustomProperty(settingsNav,"visibility","visible");
    else
    setCustomProperty(settingsNav,"visibility","hidden");
}