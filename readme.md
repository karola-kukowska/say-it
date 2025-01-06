# Say It!

## Web app for learning colors

#### Video Demo: https://youtu.be/AC203cWhIOc

#### Deploy: https://say-it-app.netlify.app/

## Project description

The aim of this app is to teach colors in English in a fun way. It was written for pre-school kids, who learn English as a second language, as a teaching aid.
The core idea of this project is to use voice recognition and speech synthesis to help kids with pronunciation of words in English. By saying words out loud kids practise correct pronunciation. The app uses matching visuals help to reinforce learning and make using the app engaging.
The used dataset contains 12 colors and can be modified as needed.

### Modes

The app has two modes with diffetent functionalities: play mode and test mode.  
In **play mode** user clicks the button `Record` or presses SPACE, which activates speech regonition (microphone recording must be allowed). User then says a color and the app reacts by changing the color of the animal and displaying the word on screen. User then can hear the word repeated back on clicking `Say it back` button.  
In **test mode**, user is presented with a prompt of an animal of a certain color (eg. "blue dog") and must find it among four randomized pictures. On clicking the correct picture user is given feedback with sound and animated frame effect. Once this is done, user then can go to the next question by clicking `New Game` button. At any moment user may use `Say it back` button to repeat the prompt.

## Technical stuff

### Mobile-first design

The app is designed to work with mobile phones, tablets and desktop computers. It is created according to responsive design principles.

### Tech stack and solutions

This web app uses vanilla JavaScript, HTML 5, CSS and Tailwind CSS framework.
Core functionality is a demonstratopn of Web Speech API and Speech Synthesis API.

### Project setup and files

Project consists of the follwing folders and files:

- /icons - contains icon and favicon files
- /images - contains all animal pictures and assests created by Miri
- /sounds - wav files used in game mode

#### Main files:

- index.html - main page
- test.html - test page
- about.html - additional info page
- script.js - added as "module" to all .html pages
- style.css - work file for my custom styles
- style.min.css - minified version of style.css with tailwind classes added (used in production)
- data.json - once source of truth for color names, hex values, and animal pictures and names

## Design Questions and Choices

While working on the project, I ran into a few interesting challenges and had to make some key decisions to refine the app's design. Here's a breakdown:

#### 1. Creating a Color Reference

This part was about figuring out how to manage colors in a flexible way:

- **Start with HTML named colors:** Initially I decided to accept standard color names (like "red" or "blue") that are already built into HTML, making things simple and familiar.
- **Build a colors object:** This object uses color names as keys and their hex codes as values. It gives me way more flexibility to look up or update colors as needed, plus it’s super easy to extend in the future.

#### 2. Changing Image Colors

This was a bit of trial and error. Basically I found two ways to approach the issue:

- **use an `<img>` tag and CSS filters** This works, but the downside is filters can be clunky and don’t always give the best results. Also, this adds the step of calculating a filter for each color used.
- **use an SVG as a background mask** This lets me change colors easily with the `background-color` property in CSS. It’s much cleaner and gives better control.

What I ended up using? In the final version I reverted from using svg solution to png images with filters. Not because it was better, but because my friend drew cute animals just for this project to cheer me up. How could I say no to that?

- **Helpful links:**
  - [Changing PNG colors with CSS](https://stackoverflow.com/questions/7415872/change-color-of-png-image-via-css/76648616#76648616)
  - [Hex to CSS filter tool](https://isotropic.co/tool/hex-color-to-css-filter/)

#### 3. Speech recognition on mobile devices

**Why this matters:** On mobile devices, continuous speech recognition isn’t practical—it drains resources and just doesn’t work well.  
**What I did:** Added a "tap-to-speak" feature for mobile users. It’s more user-friendly and makes speech input feel snappier on smaller screens.

#### 4. Importing Data from JSON

**Why it’s awesome:**

- Having all the data in one JSON file keeps everything consistent and reduces the chance of mistakes.
- It also makes updates simpler—you just edit the JSON instead of hunting through the code.

**What made it tricky:**

- Switching the script type to "module" broke my inline onclick handlers in HTML. I had to move them into the script itself, which was a bit annoying at first but actually made the code easier to manage in the long run.

#### 5. How to generate random color and image sets

In the test mode I needed to generate a randomized set of colors and images to set these colors to. I came up with the following rules:

- each sets contains **four** different animal-color pairs,
- no images repeat (ex. no two dogs in one set),
- there can be **one** repetition of color, on a diffrenet animal,
- first object is the search term. But since I don't want the first item to be displayed first, as it would ruin the game, this creates a problem of order. The solution I came up with is another random order property so that I can do some `flexbox order` magic on it.

  Final blueprint for game data:

      [{
      animal: *random value from data.animals object*,
      color: *random value from data.colors object*,
      url: *mathes animal value from data.animals object*,
      order: *random value between 1 and 4*
      }]

To ensure I get a collection of unique values I used a `new Set()` to store my randomly generated values for each property, and only then I create the `gameData` object for each playthrough.

## Attributions

Favicon: [Images database at Icons8](https://icons8.com)

Logo: [Logo generator at Logo.com](https://logo.com)

Animal images: [SVG repo](https://www.svgrepo.com)

Font Awesome: [Button icons at Font Awesome](https://fontawesome.com)

Images: Animal images and page backround courtesy by [Małgorzata Miri Sarnacka](https://www.facebook.com/margaritas.anteporcos)

Sounds: Happy and sad sounds in game module by [Fupicat](https://freesound.org/people/Fupicat/)
