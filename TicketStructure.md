# Zorkington
## Project Rubric
[Zorkington Rubric](https://docs.google.com/spreadsheets/d/1jjTB7JCIMuYIyNZe0e8vP1yHv3jg_rg9yU-5xo4c3c8/edit?usp=sharing)

## What is Zork?

![zork game west of house splash screen](https://res.cloudinary.com/btvca/image/upload/v1623935793/zork-west-of-house_ugpgww.jpg "Zork, West of House")

[The game Zork](https://en.wikipedia.org/wiki/Zork) was not the first text adventure game, but it was the first to achieve commercial success.

In this project, you will create a version of Zork born from your own beautiful mind. In our example case, it's one that takes place in the faraway kingdom of Burlington, Vermont. Feel free to use it as well :)

## Links

* <https://en.wikipedia.org/wiki/Zork>
* <https://classicreload.com/zork-i.html> - Play Zork here!
* <http://mentalfloss.com/article/29885/eaten-grue-brief-history-zork>
* [Zork running in a web browser on an IBM 5050 PC emulator written in JavaScript.](https://www.pcjs.org/disks/pcx86/games/infocom/zork1/)

## Goals

* Use Functions, Methods, and Objects.
* Use Classes, and constructor functions to create Objects.
* Understand **state** and **state transitions**.
* Understand complex control flow, based on conditions and variables.
* **First** - This is not meant to be a fun game after this projects completion
  * It is meant to be a functional game.
  * Make it work **then** make it fun!

## Design

Your code will need to represent several distinct states, including:

* The current room
  * Room description (immutable)
  * Room connection (immutable)
  * Room inventory (mutable)
* Other rooms
  * Room description (immutable)
  * Room connection (immutable)
  * Room inventory (mutable)
* The player
  * Player inventory (mutable)
  * Player status (mutable)

Think about appropriate data structures for each of these. Note that you do not need to write code for these until you are actually implementing a story that requires them, but it is good to make a rough plan early on, to anticipate pitfalls and estimate how difficult upcoming stories will be.

Sometimes a data structure that works well for the simple case will need to be altered to work for the general case. In this project, the app will grow (more rooms, more commands) from story to story and your data structures should change to accommodate.

You **may** want to create a **State Machine** to represent potential room transitions.

---

## Zorkington Repo Fork
The display of this project will be within your browser. This means that a foundation of code has been already built to allow for your project to be played through the browser of your choice - or the players choice once your logic has been included.

Your first steps is to [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repo and [clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) it to obtain the framed code to your workstation.

**Note:**
There are two **exports** that are required for this project to be functional: The `gameDetails` object and `domDisplay()` function.

These two **must** keep their naming structure (ie: `domDisplay` & `gameDetails`) as these are referenced for the browser to work.

## Style Guide
- Each ticket may have specific requirements to complete a task. Anything outside of stated requirements can be flexible.
- Once a ticket is completed, commit your code to your repo with a commit message **[ticket number] [status]**
  - ex: `git commit -m "U3_00 Completed"`
    - This would detail that the `gameDetails` object has been completed.
---

# Project
## Things to Consider:
- Use the `console.log()` as a tool to track your code!
- Unsure what the parameter `playerInput` is within the `domDisplay()` function?
  - Use the input field within the browser
  - **console log it** within the function and see the results!
- **State**, **Classes**, **Functions** & **Function Returns**, **Data Types**, and **Dictionaries**

## `domDisplay()` 
- **Must** return a string.
- Not all logic needs to be within this function; however, logic that requires a response to the user, such as a room description or action, should be what is processed through this function.
- State, dictionaries, classes, and any other variables that may be needed in a global scope **do not** need to be within this function.

## End Goal

You will build out a **minimum** of **four** room spaces. The rooms themselves may be open to your creativity (park locations, your house, a local library, or shopping area for example).

Based off the tickets provided, you will incorporate aspects to your build.

## Remember to Demostrate / Test
After completing a ticket, *before* starting on the next ticket:

- Attempt to play your game through the browser.
- Work through each process that each ticket is requiring.
- If it does at intended, move on.
- Make it functional first - then make it fun!

---

## Game Details
This portion of the project simply helps describe your work as well as highlight key commands that you may require within your project.

### Ticket `#U3_00`
- **Given** the title of the project is not "Game Title".
- **Then** update the title to the correct title of your game.
- **Given** all other details are not standard placeholder values provided.
- **Then** update said values with your specific details.

**Ticket Requirements:**
- All keys within the object must remain the as they are provided.

**Notes:**
- All comments provided are meant to help guide what is intended.
- This ticket is basic setup and helps communicate to the player what they should expect. You may need to update the `playerCommands` as you are building the project.
- Additional details may change, such as `desc` and `startingRoomDescription` as you build. These are meant to be flexible to fit your particular project.

--- 

## Environment

**Concepts to Consider:**
- Classes
- Dictionary
- Methods

### Ticket: `#U3_01`
- **Given** the browser loads the game.
- **Then** a set of items should be generated.
- **And** the items should be provided a:
  - name
  - description
  - location
- **And** a dictionary of locations should be created.
  - **And** these locations should have:
    - available exits
    - a description
    - a way to access items associated with said location.
- **Given** items are assigned to a location
  - **Then** each item should have at least one method to note user interaction.
- **Given** there are set commands required to work within the game (ie: "look", "pick up", "get item", etc)
- **Then** those commands are provided within the `playerCommands` key of the `gameDetails` object.

**Ticket Notes:**
- Details of items are not limited to just the three (3) keys. Feel free to add more if it fits to your project.
- Details of each location are not limited, much like items, to just the three details.
---

## Intro to Game

### Ticket: `#U3_02`
- **Given** the user opens your game in the browser.
- **Then** the description of the starting room shows within the response.
  - Note: this should be pulled from the previous ticket.
- **Given** the user submits a command in the input field.
- **And** it is an unknown command.
- **Then** the game should respond with "I don't know how to ____" (or similiar).
- **Given** the player is in the `starting room`
- **When** the player attempts to take something that cannot be taken.
- **Then** the game denies the player.

**Note:**
- All inputs will be represented by the `playerInput` parameter in `domDisplay()`
---

## Inventory

This should allow players to obtain an inventory based off the items available within the game.

### Ticket: `#U3_03`
- **Given** the player is in a `room`.
- **And** the player has not yet picked up an item.
- **When** the player enters a command to pick it up.
- **Then** the game allows the player to do so.
---

## Moving Rooms

### Ticket: `#U3_04`
- **Given** the player inputs a command to move to another `room`.
- **Then** the game should allow only available options.
- **Given** the player inputs a direction that does not exist.
- **Then** the game should respond that `___ room cannot be accessed from here.`.

**Note:**
- This should be handled through your state.

---
## Moving Items

### Ticket: `#U3_05`
- **Given** the player wishes to drop an item in a new location.
- **Then** the item should be removed from the player inventory.
- **And** added to the rooms item list.

## Game Completion

### Ticket: `#U3_06`
- **Given** the player moves through all rooms.
- **Then** there should be at least four (4) total rooms (areas).
- **And** each room should have at least 1 item to pick up and 1 item that cannot be removed.
---
## Stretch Goals

### Ticket: `#U3_07`
- Include a `README.md` to the **root** directory.
  - Detail the concept of this project in psuedo code within the document.
  -  **[Pseudo Code Article](https://www.geeksforgeeks.org/how-to-write-a-pseudo-code/)**
  -  [What is a README file?](https://www.mygreatlearning.com/blog/readme-file/)
- Deploy this project.
  - This can be through GitHub Pages or a platform of your choosing.
    - [Netlify](https://app.netlify.com/)
    - [How To Deploy w/ GitHub Pages](https://www.loom.com/share/6ef32778118840eb88a4e6d4f00cc3d2?sid=16e2d6a4-ffdf-4cc8-bcd4-b841144f279c)
   -  Update the **README.md** with a hyperlink to the deployed URL.
      -  Do not remove project description.
      -  This can be at the top of the file.
-  Add multiple rooms as you desire.
-  Try to add a puzzle effect for one of your rooms.
   -  Examples:
      -  Player must obtain the "orb" in order to pass through the magical gate.
      -  or
      -  Player must find the key to the basement door located in another room.
         -  If a player doesn't have said key, deny access.

**Note:**
- **Not Counted as a Stretch Goal**
  - This game isn't meant to be fun after these ticket completions.
  - **BUT** now that the tickets are done, get creative and make it more interesting!
