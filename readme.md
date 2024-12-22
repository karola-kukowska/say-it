# Say It!

## Web app for learning colors

#### Video Demo: <URL HERE>

#### Description:

Your README.md file should be minimally multiple paragraphs in length, and should explain what your project is, what each of the files you wrote for the project contains and does, and if you debated certain design choices, explaining why you made them. Ensure you allocate sufficient time and energy to writing a README.md that documents your project thoroughly. Be proud of it! A README.md in the neighborhood of 750 words is likely to be sufficient for describing your project and all aspects of its functionality. If unable to reach that threshold, that probably means your project is insufficiently complex.

### Intro

The aim of this app is to teach colors in English in a fun way. It was written for pre-school kids, who learn English as a second language, as a teaching aid.
The core idea of this project is to use voice recognition and speech synthesis to help kids with pronunciation of words in English. By saying words out loud kids practise correct pronunciation. The app uses matching visuals help to reinforce learning and make using the app engaging.
The used dataset contains XXX 20 XXX colors.

### Functionalities

#### Modes

The app has two modes with diffetent functionalities: play mode and test mode. In play mode users say a color and the app reacts by changing the backgroud color, repeating the word back, and displaying the word on screen. In test mode, users are presented with a color and need to say the name of the color to get the next test question. Test questions are a set of eight randomized colors out of the dataset.

#### Mobile-first design

The app is designed to work with mobile phones, tablets and desktop computers. Used viewports are: XXX

### Tech stack and solutions

Vanilla JavaScript
CSS

Web Speech API
Speech Synthesis API

Routing

### Project setup and files

#### Attributions

Favicon: [Images database at Icons8](https://icons8.com)

Logo: [Logo generator at Logo.com](https://logo.com)

Animal images: [SVG repo](https://www.svgrepo.com)

Font Awesome: [Button icons at Font Awesome](https://fontawesome.com)

### Design questions and choices

#### How to create a colors reference
first: accept colors that have equivalent names in html named colors
second: create colors object with color names as keys and hex color numbers as values. gives more do flexibility

#### How to change colors of the image
first iteration img tag, downside filters 
second iteration, svg as background mask, allows to change color thru backgroundColor 

#### Recognize mobile devices
why: speach recognition should not be in continuous mode
tap to speak on mobile devices

