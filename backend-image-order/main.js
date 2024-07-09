import images from "./images.mjs";
const totalImages = images.length;
var orderArray = [];




function getImagesFromOrder(obejctList) {
    return obejctList.sort((a, b) => a.odrder - b.order);
}

function imageTemplate(image, numProcessed){
    return `<tr>
        <td>
            <h3>${image.alt}</h3>
        </td>
        <td>
            <img class="gallery-img" src="${image.src}" alt="${image.alt}">
        </td>
        <td>
            ` + orderTemplate(numProcessed) + `
        </td>
    </tr>`
}

function orderTemplate(order) {

    let htmlToInsert = `<select name="image_${order}" id="image_${order}">`;
    
    for(let x=1; x<=totalImages; x++){
        htmlToInsert += `<option value="${x}"`;

        if(x == order)
            htmlToInsert += ` selected `;

        htmlToInsert += `>${x}</option>`
    }

    htmlToInsert += `</select>`
    return htmlToInsert;
}

function buildTable(tableHTML) {
    let htmlToInsert = `<table>
    <thead>
        <tr>
            <th class="name">Name</th>
            <th class="image">Image</th>
            <th class="order">Order</th>
        </tr>
    </thead>
    <tbody>`
    
    htmlToInsert += tableHTML + `</tbody>
</table>` 
    
return htmlToInsert;

}

function renderImages(array){
    	// get the element we will output the recipes into
        let insert = document.getElementById("insert");

        // use the recipeTemplate function to transform our recipe objects into recipe HTML strings
        let htmlToInsert = "";
        let numProcessed = 0;
        array.forEach(function(value){
            numProcessed++;
            htmlToInsert += imageTemplate(value, numProcessed);
        });

        
        // Set the HTML strings as the innerHTML of our output element.
        insert.innerHTML = buildTable(htmlToInsert);
}

function init() {
  let imageArray = getImagesFromOrder(images)

  //Fill orderArray to use in init code
    for(let x=1; x<=totalImages; x++){
        orderArray.push(x);
    }
  // render the images.
  renderImages(imageArray);
  setUpSelectors();
}
init();

function setUpSelectors() {
    orderArray = [];
    for(let x=1; x<=totalImages; x++){
        orderArray.push(x);
        let selector = document.querySelector(`#image_${x}`)
        selector.addEventListener("change", updateSelected);
    }
}



function updateSelected(event){
    var selectedOption = this[this.selectedIndex];
    var selectedVal = parseInt(selectedOption.text);
    var positionOnPage = this.name.substring(6)
    
    var previousVal =  orderArray[positionOnPage-1];

    if(selectedVal > previousVal){

        for(let x = 0; x<orderArray.length; x++){
            let item = orderArray[x];

            if(item > previousVal && item <= selectedVal){
                let selectElement = document.querySelector(`#image_${x+1}`);
                selectElement.value = parseInt(selectElement.value) - 1;
                orderArray[x] = parseInt(selectElement.value);
            }

        }

        this.value = selectedVal;
        orderArray[positionOnPage-1] = selectedVal;

    }
    else if(selectedVal < previousVal){

        for(let x = 0; x<orderArray.length; x++){
            let item = orderArray[x];

            if(item >= selectedVal && item < previousVal){
                let selectElement = document.querySelector(`#image_${x+1}`);
                selectElement.value = parseInt(selectElement.value) + 1;
                orderArray[x] = parseInt(selectElement.value);
            }

        }

        this.value = selectedVal;
        orderArray[positionOnPage-1] = selectedVal;
    }
}



var previousImageArray = getImagesFromOrder(images);

function saveHandler(event){
    event.preventDefault();
    let imageArray = [];
    for(let x = 0; x<orderArray.length; x++){
        imageArray.push(previousImageArray[orderArray.indexOf(x+1)])
    }
    

    previousImageArray = imageArray;
    orderArray = [];
    // render the recipe with renderRecipes.
    renderImages(imageArray);
    setUpSelectors();
}

let saveBtn = document.querySelector("#save-btn")
saveBtn.addEventListener("click", saveHandler);