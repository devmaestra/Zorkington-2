/* 
    TODO for students
        General Setup:
            - This object is framed for you to fill out the values to help customize your game.
            - This will alter the browser to display your game title. The "Quick Notes" modal will also detail your information along with the description (desc) of what your game is about. It is important to highlight key commands that you want the player to use.
            - The startingRoomDescription will display what the player sees upon coming to your project.

        Do NOT alter the name of this object.

        Both exports are required in order for this project to run.

        - index.html should be running in your browser through the build process.
            - use your browsers console throughout testing.
*/

export const gameDetails = {   
    title: 'A Night at the Schermerhorn Symphony Center',
    desc: 'Welcome to the Schermerhorn Symphony Center.  There is a concert tonight, but you do not have a ticket. Travel through the rooms, inspect items, and collect a ticket to get into the concert!',
    author: 'Laura Shaw',
    cohort: 'SBPT-2023',
    startingRoomDescription: 
    'You are standing in the Main Lobby. To the East, you see the East Lobby and to the West, you see a Box Office. To the South is the entrance to the concert hall, but you do not have a ticket yet to give to the Usher allowing you to enter.',
    playerCommands: [
        'inspect', 'view', 'pickup', 'drop'
    ]
    // Commands are basic things that a player can do throughout the game besides possibly moving to another room. This line will populate on the footer of your game for players to reference. 
    // This shouldn't be more than 6-8 different commands.
}
// Setting your classes, object creations, state and dictionaries should be outside of the domDisplay() function. This will help it handling data if you need to call on another function that needs that information and wouldn't be tied strictly to the domDisplay() function. - line 135, "playerCommands" is calling to "toLowerCase()" method. This value is an object. I might suggest just having the keys set as lowercase when structuring it instead. - moveRoom() is being invoked regardless of the response and is using the parameter of "newRoom"; however, nothing gets passed in as it's argument. Perhaps this should be "playerInput" to help navigate. However, it does note to move to "newRoom" so it would have to detail which room. This is where state can be referenced to help navigate. ex: If "east", evaluate currentRoom, can you go east? Which room is east?
// Your code here

//!Item Dictionary:
class Item {
    constructor(name, description, location, actions) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.actions = actions || [];
    }
};

//! Room Constructor:
class Room {
    constructor(name, description, exits, items) {
        this.name = name;
        this.description = description;
        this.exits = name;
        this.items = [];
    }

    addExit(direction, room) {
        this.exits[direction] = room;
    }
};

//!List of items in game:
const usher = new Item(
    "usher",
    "This is the Usher.  She does not move and you must DROP her a ticket before entering into the concert hall for the concert.",
    "mainLobby",
    ["view"]
);

const ticket = new Item(
    "ticket", 
    "This is a ticket. You can only pick this ticket up if you have a silver coin in your inventory.  Drop the silver coin and then pick up the ticket.  Take the ticket to the usher and drop it there.",
    "boxOffice",
    ["view", "pickup", "drop"]
);

const woodenBox = new Item(
    "woodenBox",
    "This is a wooden box. Inspect it to see what's inside!",
    "eastLobby",
    ["view", "inspect"]
);

const silverCoin = new Item(
    "silverCoin",
    "This is a silver coin. Pick it up to add it to your inventory and then take it to the box office, drop it there and pick up the ticket.  Take the ticket to the usher in the Main Lobby to enter the concert.",
    "eastLobby",
    ["view", "inspect", "pickup", "drop"]
);

const program = new Item(
    "program",
    "Symphony No. 5 in C minor by Ludwig van Beethoven",
    "concertHall",
    ["view", "pickup", "drop"]
);

//!List of Rooms in game:
const mainLobby = new Room(
    "Main Lobby",
    "You are standing on an Italian marble floor in the Main Lobby of the Schermerhorn Symphony Center.  There is a concert tonight, and you want to attend but you don't have a ticket to enter. You see a Box Office to the WEST, an Usher blocking the entrance to the Concert Hall to the SOUTH, and the East Lobby to the EAST. The usher is holding a ticket scanner, but you don't have a ticket yet to enter the concert. You will need to find a silver coin, then buy a ticket at the box office, and then enter the concert with the ticket.",
    ["eastLobby", "boxOffice"],
    [usher] //immovable
);

const boxOffice = new Room(
    "Box Office", 
    "You are standing at the Box Office window. You need a silver coin to buy a ticket.",
    ["mainLobby"],
    [ticket]//movable
);

const eastLobby = new Room(
    "East Lobby",
    "You are standing in the East Lobby of the Schermerhorn Symphony Center. There is a Wooden Box on the floor. Try and open it.",
    ["mainLobby"],
    [woodenBox, silverCoin]
);

const concertHall = new Room(
    "Concert Hall",
    "Congratulations! You made it to the concert on time! You hear musicians warming up and make your way to have a seat in the front row. Enjoy the concert! Following the concert, please exit to the Main Lobby.",
    ["mainLobby"],
    [program]
);

//! Rooms as an object:
export const rooms = {
    mainLobby,
    eastLobby,
    boxOffice,
    concertHall,
}

// import { rooms } from './your-module.js';

let currentRoom = rooms.mainLobby;

//! Moving to another room:
function moveToRoom(roomName) {
    const nextRoom = rooms[roomName];

    if (nextRoom) {
        if (currentRoom.exits.includes(roomName)) {
            currentRoom = nextRoom;
            return(`You are now in the ${currentRoom.name}.`);
        } else {
            return(`You cannot go to ${nextRoom.name} from here.`);
        }
    } else {
        return(`Room ${roomName} does not exist.`);
    }
};


export const domDisplay = (playerInput) => {

    const command = playerInput.toLowerCase();

    switch (command) {
        case 'move east':
            return moveToRoom('eastLobby');
        case 'move west':
            return moveToRoom('boxOffice');
        default:
            return 'Invalid command.';
    }
};
    /* 
        TODO: for students
        - This function must return a string. 
        - This will be the information that is displayed within the browsers game interface above the users input field.

        - This function name cannot be altered. 
        - "playerInput" is whatever text the user is typing within the input field in the browser after hitting the ENTER key.
            - test this out with a console log.

        What your player should be able to do (checklist):
            - move between rooms
            - view current room
            - pickup moveable items
                - there should be at least 2 items that cannot be moved.
            - view player inventory
        
        Stretch Goals:
            - drop items in "current room" (if a player picks up an item in one room and moves to another, they should be able to remove it from their inventory)
            - create win/lose conditions.
                - this could be a puzzle that may require an item to be within the players inventory to move forward, etc.

        HINTS:
            - consider the various methods that are available to use.
            - arrays are a great way to hold "lists".
            - You are not limited to just the exported function. Build additional functions and don't forget to hold the return within a variable.
            - Review notes!
                - Have them open as you build.
                - break down each problem into small chunks
                    - What is the process of picking up an item exactly? ex: Look. Pick from a list of items. Put into players list of items... 
    */

    // Your code here

