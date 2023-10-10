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
  title: "A Night at the Schermerhorn Symphony Center",
  desc: "Welcome to the Schermerhorn Symphony Center.  There is a concert tonight, but you do not have a ticket. Travel through the rooms, inspect items, and collect a ticket to get into the concert!",
  author: "Laura Shaw",
  cohort: "SBPT-2023",
  startingRoomDescription:
    "You are standing in the Main Lobby. To the East, you see the East Lobby and to the West, you see a Box Office. To the South is the entrance to the concert hall, but you do not have a ticket yet to give to the Usher allowing you to enter.",
  playerCommands: [
    "inspect",
    "view",
    "pickup",
    "drop",
    "north",
    "south",
    "east",
    "west",
    "inventory",
  ],
};

//!Item Constructor:
class Item {
  constructor(name, description, location, actions, canBeTaken) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.actions = actions || [];
    this.canBeTaken = canBeTaken;
  }
}

//! Room Constructor:
class Room {
  constructor(name, description, exits, items) {
    this.name = name;
    this.description = description;
    this.exits = {};
    this.items = items;
  }

  removeItem(item) {
    this.items = this.items.filter((i) => i !== item);
  }

  addExit(direction, room) {
    this.exits[direction] = room;
  }
}

//!List of items in game:
const usher = new Item(
  "usher",
  "This is the Usher.  She does not move and you must DROP her a ticket before entering into the concert hall for the concert.",
  "mainLobby",
  "inspect",
  false
);

const ticket = new Item(
  "ticket",
  "This is a ticket. You can only pickup this ticket up if you have a silver coin in your inventory.  Drop the silver coin and then pick up the ticket.  Take the ticket to the usher and drop it there.",
  "boxOffice",
  ["view", "pickup", "drop"],
  true
);

const woodenBox = new Item(
  "woodenBox",
  "This is a wooden box. Inspect it to see what's inside!",
  "eastLobby",
  ["view", "inspect"],
  false
);

const silverCoin = new Item(
  "silverCoin",
  "This is a silver coin. Pick it up to add it to your inventory and then take it to the box office, drop it there and pick up the ticket.  Take the ticket to the usher in the Main Lobby to enter the concert.",
  "eastLobby",
  ["view", "inspect", "pickup", "drop"],
  true
);

const program = new Item(
  "program",
  "Symphony No. 5 in C minor by Ludwig van Beethoven",
  "concertHall",
  ["view", "pickup", "drop"],
  true
);

//!List of Rooms in game:
const mainLobby = new Room(
  "Main Lobby",
  "You are standing on an Italian marble floor in the Main Lobby of the Schermerhorn Symphony Center.  There is a concert tonight, and you want to attend but you don't have a ticket to enter. You see a Box Office to the West, an Usher blocking the entrance to the Concert Hall to the South, and the East Lobby to the East. The usher is holding a ticket scanner, but you don't have a ticket yet to enter the concert. You will need to find a silver coin, then buy a ticket at the box office, and then enter the concert with the ticket.",
  ["eastLobby", "boxOffice", "concertHall"],
  [usher] //immovable
);

const boxOffice = new Room(
  "Box Office",
  "You are standing at the Box Office window. You need a silver coin to buy a ticket. To the East is the Main Lobby.",
  ["mainLobby"],
  [ticket] //movable
);

const eastLobby = new Room(
  "East Lobby",
  "You are standing in the East Lobby of the Schermerhorn Symphony Center. There is a Wooden Box on the floor. Try and open it. To the West is the Main Lobby.",
  ["mainLobby"],
  [woodenBox, silverCoin]
);

const concertHall = new Room(
  "Concert Hall",
  "Congratulations! You made it to the concert on time! You hear musicians warming up and make your way to have a seat in the front row. Enjoy the concert! Following the concert, please exit North to the Main Lobby.",
  ["mainLobby"],
  [program]
);

//! Rooms as an object:
export const rooms = {
  mainLobby,
  eastLobby,
  boxOffice,
  concertHall,
};

//! Available exits with the directions per room:
mainLobby.addExit("east", eastLobby);
mainLobby.addExit("west", boxOffice);
mainLobby.addExit("south", concertHall);
eastLobby.addExit("west", mainLobby);
boxOffice.addExit("east", mainLobby);
concertHall.addExit("north", mainLobby);

let currentRoom = rooms.mainLobby;
let playerInventory = [];

let locationStates = {
  mainLobby: ["east", "west", "south"],
  eastLobby: ["west"],
  boxOffice: ["east"],
  concertHall: ["north"],
};

//! Moving to another room:
function moveRoom(newRoomName) {
  const newRoom = rooms[newRoomName];

  if (newRoom) {
    if (locationStates[currentRoom.name].includes(newRoomName)) {
      currentRoom = newRoom;
      return `You are now in the ${currentRoom.name}.`;
    } else {
      return `You cannot go to ${newRoom.name} from here.`;
    }
  } else {
    return `Room ${newRoomName} does not exist.`;
  }
}

// function moveRoom(newRoom, currentRoom) {
//     let validRooms = locationStates[currentRoom];
//     // let valid = validRooms.find(room => room.name.toLowerCase() === newRoom.toLowerCase());

//     if (validRooms.includes(newRoom)) {
//         currentRoom = newRoom;
//         return `${currentRoom.description}`;
//     } else {
//         return(`You may not move that direction from the ${currentRoom.name}`);
//     }
// };

// function moveToRoom(roomName) {
//     const nextRoom = rooms[roomName];

//     if (nextRoom) {
//         if (currentRoom.exits.includes(roomName)) {
//             currentRoom = nextRoom;
//             return(`You are now in the ${currentRoom.name}.`);
//         } else {
//             return(`You cannot go to ${nextRoom.name} from here.`);
//         }
//     } else {
//         return(`Room ${roomName} does not exist.`);
//     }
// };

export const domDisplay = (playerInput) => {
  console.log(playerInput);
  console.log(currentRoom);
  const command = playerInput.toLowerCase().trim();
  //view command works:
  if (command === "view") {
    return currentRoom.description;
    // inventory command works:
  } else if (command === "inventory") {
    return `Inventory: ${playerInventory.join(", ")}`;
    // pickup command works:
  } else if (command.startsWith("pickup ")) {
    const itemNameToPickup = playerInput.split(" ")[1];
    const itemToPickup = currentRoom.items.find(
      (item) => item.name === itemNameToPickup
    );

    if (itemToPickup && itemToPickup.canBeTaken) {
      currentRoom.removeItem(itemToPickup);
      playerInventory.push(itemToPickup.name);
      return `${itemToPickup.name} has been added to your inventory!`;
    } else if (itemToPickup && !itemToPickup.canBeTaken) {
      return `You cannot take the ${itemToPickup.name}.`;
    } else {
      return "There is nothing to pick up here.";
    }
    // inspect command does not work:
  } else if (command === "inspect") {
    const itemNameToInspect = playerInput.split(" ")[1];
    const itemToInspect = currentRoom.items.find(
      (item) => item.name === itemNameToInspect
    );

    if (itemToInspect) {
      return itemToInspect.description;
    } else {
      return `There is no ${itemNameToInspect} here to inspect.`;
    }
  } else if (currentRoom.exits[command]) {
    const newRoom = currentRoom.exits[command];
    return moveRoom(newRoom);
  } else {
    return "Invalid command.";
  }
};

// } else if (currentRoom.exits[command]) {
//   return moveRoom(command);
// } else {
//   return "Invalid command.";
//

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

// Your code here.
