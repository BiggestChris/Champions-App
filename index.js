import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-27f73-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsinDB = ref(database, "endorsements")

const endorseText = document.getElementById("endorse-text")
const publishBtn = document.getElementById("publish-btn")
const lowerPortion = document.getElementById("lower-portion")
const toText = document.getElementById("to-text")
const fromText = document.getElementById("from-text")

publishBtn.addEventListener("click", function() {
    let inputValue = endorseText.value
    let toValue = toText.value
    let fromValue = fromText.value
    
    let inputObject = {
        "endorsement": inputValue,
        "to": toValue,
        "from": fromValue
    }
    
    push(endorsementsinDB, inputObject)
    
    /*
    addEndorsement(inputValue)
    */
    endorseText.value= ""
    toText.value= ""
    fromText.value = ""
})

onValue(endorsementsinDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
        lowerPortion.innerHTML = ""
        console.log(itemsArray)
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemEndorsement = currentItem[1].endorsement
            let currentItemTo = currentItem[1].to
            let currentItemFrom = currentItem[1].from
            
            
            addEndorsement(currentItemEndorsement, currentItemTo, currentItemFrom)
        }
    } else {
        lowerPortion.innerHTML = "No endorsements here...yet"
    }
})

function addEndorsement(text, to, from) {
  
    lowerPortion.innerHTML += `
        <p class="endorsement">
        <b>To</b>: ${to} <br><br>
        ${text} <br><br>
        <b>From</b>: ${from}
        </p>
        `
}