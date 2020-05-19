(function() {

document.getElementById("input").addEventListener("keyup", enterKey);
document.getElementById("add-btn").addEventListener("click", createElement);

/*Media Queries: Adjust width and height of the container according to device*/
if (window.innerWidth <= 600) {
   let container = document.getElementById("container");
   container.style.setProperty('height', window.innerHeight + "px");
   container.style.setProperty("width", window.innerWidth + "px");
}

//Add input using enter key
function enterKey(event) {
   if (event.keyCode === 13) {
      createElement();
   }
}

//Create a new element/list item
function createElement() {  
   if (document.getElementById("input").value === "") {
      return;
   }

   //Create a div
   let div =  document.createElement("DIV");
   div.classList.add("item");
   
   //Create a button checkbox
   let checkboxBtn = document.createElement("BUTTON");
   checkboxBtn.setAttribute("type", "button");
   checkboxBtn.classList.add("btn", "btn-check");
   checkboxBtn.addEventListener("click", onCheckBox); //Check and uncheck function
   div.appendChild(checkboxBtn);

   //Create a span for the item text
   let span = document.createElement("SPAN");
   span.classList.add("item-text");
   span.addEventListener("blur", uneditElement); //Remove the edit option function
   let value = document.getElementById("input").value;
   let spanText = document.createTextNode(value);
   span.appendChild(spanText);
   div.appendChild(span);

   //Create edit button with edit icon
   let editBtn = document.createElement("BUTTON");
   editBtn.setAttribute("type", "button");
   editBtn.classList.add("btn", "btn-edit");
   editBtn.addEventListener("click", editElement); //Function to make the item-text editable

   let editSpan = document.createElement("SPAN");
   editSpan.classList.add("material-icons");
   let editText = document.createTextNode("edit");
   editSpan.appendChild(editText);
   editBtn.appendChild(editSpan);
   
   div.appendChild(editBtn);

   //Create trash button with trash icon
   let trashBtn = document.createElement("BUTTON");
   trashBtn.setAttribute("type", "button");
   trashBtn.classList.add("btn", "btn-trash");
   trashBtn.addEventListener("click", removeElement); //Remove element function

   let trashSpan = document.createElement("SPAN");
   trashSpan.classList.add("material-icons");
   let trashText = document.createTextNode("delete_outline");
   trashSpan.appendChild(trashText);
   trashBtn.appendChild(trashSpan);
  
   div.appendChild(trashBtn);
   
   //Attach the new div to the parent div "list"
   let list = document.getElementById("list");
   list.appendChild(div);

   //Set the input value to blank after enter or add button
   document.getElementById("input").value = "";
}

//Remove element/list item
function removeElement() {
let field = event.target;
let index, fieldButton, fieldDiv;

if (field.className === "material-icons") {
   fieldButton = field.parentElement;  //Parent of the field will be the button
   fieldDiv = fieldButton.parentElement;//Parent of the button will be the div / item- 
   fieldDiv.remove();

} else if (field.className === "btn btn-trash") {

   fieldDiv = field.parentElement;
   fieldDiv.remove();

}
}


//Edit the item on the list
function editElement() {

let field = event.target;
let fieldButton, fieldDiv, fieldSpan,fieldCheck;

if (field.className === "material-icons") {

   fieldButton = field.parentElement;  
   fieldDiv = fieldButton.parentElement;
   fieldCheck = fieldDiv.querySelector(".checked");
   
   if (fieldCheck === null) {
   fieldSpan = fieldDiv.querySelector(".item-text");
   fieldSpan.contentEditable = true;
   fieldSpan.focus();
}
} else if (field.className === "btn btn-edit") {

   fieldDiv = field.parentElement;
   fieldCheck = fieldDiv.querySelector(".checked");

   if (fieldCheck === null) {
   fieldSpan = fieldDiv.querySelector(".item-text");
   fieldSpan.contentEditable = true;
   fieldSpan.focus();
}
}}

//Remove edit function when you move out of span text
function uneditElement() {
   let field = event.target;
   
   if (field.isContentEditable === true) {
      field.contentEditable = false;
   }
}

//Change style of the list item when checkbox is checked or unchecked
function onCheckBox() {
 let field = event.target;
 
 if (field.className === "btn btn-check") {

   field.nextSibling.classList.add("strikethrough");//Add strikethrough class to the item
   field.classList.add("checked");
   
   //Add the check icon
   let span = document.createElement("SPAN");
   span.classList.add("material-icons", "check-mark");
   let spanText = document.createTextNode("done");
   span.appendChild(spanText);
   field.appendChild(span);

 } else if (field.className === "btn btn-check checked") {

   field.removeChild(field.childNodes[0]);//Remove icon
   field.nextSibling.classList.remove("strikethrough");
   field.classList.remove("checked");
   
 } else {
    
   field.parentElement.nextSibling.classList.remove("strikethrough");
   field.parentElement.classList.remove("checked");
   field.remove();
 }
}
})();






