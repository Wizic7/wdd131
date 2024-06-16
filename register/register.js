
import * as Templates from './templates.js';

document.getElementById("add").addEventListener("click", function() 
{
    Templates.addParticipantTemplate()
});

class info {
    constructor(name, totalFees) {
        this.name = name;
        this.totalFees = totalFees;
    }
}

document.getElementById("submitButton").addEventListener("click", function submitForm(event) {
    event.preventDefault();
    // do the rest of the stuff
    let name = document.querySelector("#adult_name").value;
    let totalFeeTest = totalFees();
    if (name.length > 0 && totalFeeTest > 0){
        let formInfo = new info(name, totalFees())
        Templates.successTemplate(formInfo);
    }
    });


function totalFees() {
    // the selector below lets us grab any element that has an id that begins with "fee"
    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log(feeElements);
    // querySelectorAll returns a NodeList. It's like an Array, but not exactly the same.
    // The line below is an easy way to convert something that is list-like to an actual Array so we can use all of the helpful Array methods...like reduce
    // The "..." is called the spread operator. It "spreads" apart the list, then the [] we wrapped it in inserts those list items into a new Array.
    feeElements = [...feeElements];
    // sum up all of the fees. Something like Array.reduce() could be very helpful here :) Or you could use a Array.forEach() as well.
    // Remember that the text that was entered into the input element will be found in the .value of the element.
    let total = 0;
    feeElements.forEach(function(element) {
        total += parseInt(element.value);
    })
    console.log(total);
    // once you have your total make sure to return it!
    return total;
    }