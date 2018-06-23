const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
const database = firebase.database().ref();

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";
    
    console.log(username + " : " + message);

    //Update database here
    const value = {
        NAME: username,
        MESSAGE: message
    }
    database.push(value);
}

// Set database "child_added" event listener here
database.on("child_added",addMessageToBoard);

const messageContainer = document.querySelector(".allMessages");

/**
 * Takes a row of data from the database and adds the name and message to the message container.
 */
function addMessageToBoard(rowData){
    const row = rowData.val(); // returns object just like the "value" we pushed
    const name = row.NAME;
    const message = row.MESSAGE;

    const pElement = document.createElement("p");
    pElement.innerText = `${name}: ${message}`;
    messageContainer.appendChild(pElement);
}