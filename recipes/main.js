import recipes from "./recipes.mjs";


function getRandomListEntry(list){
    let randomNumbyLength = Math.floor(Math.random()*list.length)
    let randomRecipe = recipes[randomNumbyLength];

    return randomRecipe;
}

function recipeTemplate(recipe){
    return`<div class="recipe-grid">
            <img src="${recipe.image}" alt="${recipe.name}" >
            
            <div class="info-flex">
                <div class="tag-flex">
                    ` + tagsTemplate(recipe.tags) + `
                </div>
                <a href="#" class="name">${recipe.name}</a>

                ` + ratingTemplate(recipe.rating) + `

                <p class="description">${recipe.description}</p>
            </div>
        </div>`
}

function tagsTemplate(tags) {
    let html = "";
	// loop through the tags list and transform the strings to HTML
    tags.forEach(function(value){
    html += `<p class="tag">` + value + `</p>`
    });
    
	return html;
}


function ratingTemplate(rating) {
	// begin building an html string using the ratings HTML written earlier as a model.
	let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`
// our ratings are always out of 5, so create a for loop from 1 to 5
    let numEmpty = 5-rating
    for(let x = 0; x<rating; x++){
        html += `<span aria-hidden="true" class="icon-star">⭐</span>`
    }
		// check to see if the current index of the loop is less than our rating
		// if so then output a filled star
    for(let x = 0; x<numEmpty; x++){
        html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`
    }
		// else output an empty star

	// after the loop, add the closing tag to our string
	html += `</span>`
	// return the html string
	return html
}

function renderRecipes(recipeList) {
	// get the element we will output the recipes into
    let main = document.getElementById("insert");

	// use the recipeTemplate function to transform our recipe objects into recipe HTML strings
    let htmlToInsert = "";
    recipeList.forEach(function(value){
        htmlToInsert += recipeTemplate(value);
    });
	// Set the HTML strings as the innerHTML of our output element.
    main.innerHTML = htmlToInsert;
}

function init() {
  // get a random recipe
  const recipe = getRandomListEntry(recipes)
  // render the recipe with renderRecipes.
  renderRecipes([recipe]);
}
init();

function filterRecipes(query){
    let keyword = query.toLowerCase();
    console.log(keyword);
    return recipes.filter(function(recipe){
        //if anything is true, it will add 1
        let found = 0;
        found += recipe.name.toLowerCase().includes(keyword)
        found += recipe.description.toLowerCase().includes(keyword)
        found += recipe.tags.find((item) => item.toLowerCase().includes(keyword))
        found += recipe.recipeIngredient.find((item) => item.toLowerCase().includes(keyword))

        return found;
    });
}

function searchHandler(event){
    event.preventDefault();
    let search = document.querySelector("#search-text");
    let text = search.value.toLowerCase();
    let filteredList = filterRecipes(text).sort((a, b) => a.name.localeCompare(b.name))
    renderRecipes(filteredList);
}

let searchBtn = document.querySelector("#search-btn")
searchBtn.addEventListener("click", searchHandler);