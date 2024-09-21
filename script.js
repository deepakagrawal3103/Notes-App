// =========================================
// DOM Elements Selection
// - Selects all necessary elements from the DOM.
// =========================================
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// =========================================
// Function: showNotes
// - Retrieves and displays notes from localStorage.
// =========================================
function showNotes() {
    // Retrieve notes from localStorage and set as innerHTML of notesContainer
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes(); // Initial call to display existing notes

// =========================================
// Function: updateStorage
// - Saves the current state of notes to localStorage.
// =========================================
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// =========================================
// Event Listener: Create Button Click
// - Creates a new editable note when the create button is clicked.
// =========================================
createBtn.addEventListener("click", () => {
    // Create a new paragraph element for the note
    let inputBox = document.createElement("p");
    
    // Create a new image element for the delete icon
    let img = document.createElement("img");
    img.src = "delete.png"; // Set the source of the delete icon
    
    // Assign the class and attributes to the note
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    
    // Append the delete icon to the note
    inputBox.appendChild(img);
    
    // Append the new note to the notes container
    notesContainer.appendChild(inputBox);
    
    // Update localStorage with the new state
    updateStorage();
});

// =========================================
// Event Listener: Notes Container Click
// - Handles deletion of notes when the delete icon is clicked.
// - Adds an event listener for keyup events on editable notes to update storage.
// =========================================
notesContainer.addEventListener("click", function(e) {
    // Check if the clicked element is an image (delete icon)
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove(); // Remove the parent paragraph (note)
        updateStorage(); // Update localStorage after deletion
    } 
    // Check if the clicked element is a paragraph (editable note)
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box"); // Refresh the notes NodeList
        
        // Add a keyup event listener to each note to update storage on content change
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            };
        });
    }
});

// =========================================
// Event Listener: Document Keydown
// - Prevents default behavior when the Enter key is pressed within a note.
// =========================================
document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak"); // Insert a line break
        event.preventDefault(); // Prevent default Enter key behavior
    }
});
