const menu_button = document.getElementById("menu-btn");

function hide_menu() {

    const img_list =  Array.from(document.getElementsByClassName("nav-link"));

    img_list.forEach(item => item.classList.toggle("hide"));
}

menu_button.addEventListener("click", hide_menu);





function handleResize() {

    const img_list =  Array.from(document.getElementsByClassName("nav-link"));

    if (window.innerWidth > 800){
        img_list.forEach(item => item.classList.remove("hide"));
    }
    else {
        img_list.forEach(item => item.classList.add("hide"));
    }
}
handleResize();
window.addEventListener("resize", handleResize)


const gallery = document.querySelector(".gallery");

function viewerTemplate(pic, alt) {
    return `<div class="close-up">
    <button class="close-up-x">X</button>
    <img src="${pic}" alt="${alt}">
    </div>`;
  }

  function viewHandler(event) {
	// create a variable to hold the element that was clicked on from event.target
    const img_ele = event.target;
	// get the src attribute from that element and 'split' it on the "-"
    const src = img_ele.getAttribute("src").split("-");
	// construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
    const big_img = src[0] + "-full.jpeg";
	// insert the viewerTemplate into the top of the body element
	// (element.insertAdjacentHTML("afterbegin", htmltoinsert))
    const doc_body = document.body;
    doc_body.insertAdjacentHTML("afterbegin", viewerTemplate(big_img, "A larger image"))
	// add a listener to the close button (X) that calls a function called closeViewer when clicked
    const x_btn = document.querySelector(".close-up-x");
    x_btn.addEventListener("click", closeViewer);
}



function closeViewer() {
    div = document.querySelector(".close-up");
    div.remove();
}
gallery.addEventListener("click", viewHandler);