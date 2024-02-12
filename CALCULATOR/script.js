var inputfield=document.getElementById("inputfield")
console.log(inputfield);

function turnOff(){
    var inputfield=document.getElementById("inputfield")
    inputfield.style.visibility="hidden"
}

function turnOn(){
    var inputfield=document.getElementById("inputfield")
    inputfield.style.visibility="visible"
}

var inputfield=document.getElementById("inputfield")
function getValues(num){
   inputfield.value=inputfield.value + num
}

function clearOneChar(){
    inputfield.value=inputfield.value.slice(0,-1)
}
function clearAll(){
    inputfield.value=""
}

function calculate(){
    inputfield.value=eval(inputfield.value)
}

function calculate(){
    try{
        inputfield.value=eval(inputfield.value)
    }
    catch(error){
         // alert("Invalid Expression")
        inputfield.value=inputfield.value.innerHTML="invalid expression"

    }
}
