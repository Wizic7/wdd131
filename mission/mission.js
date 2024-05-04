const themeSelector = document.getElementById('timercolor');// replace with code to select dropdown element out of the HTML
function changeTheme() {
//check to see what the current value of our select is. The current value is conveniently found in themeSelector.value!

// if the value is dark then:
// add the dark class to the body
// change the source of the logo to point to the white logo.
// otherwise
// remove the dark class
// make sure the logo src is the blue logo.

let logoimg = document.getElementById("logo");

if (themeSelector.value == "dark"){

    logoimg.src = "byui-logo_white.png";
    document.body.classList.add("dark");

} else {

    logoimg.src = "byui-logo_blue.webp";
    document.body.classList.remove("dark");
}

}
// add eventlistener to the themeSelector element here. Use the changeTheme function as the event handler function.
themeSelector.addEventListener('click', changeTheme);