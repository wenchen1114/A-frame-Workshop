# AR/VR Prototyping with A-frame
By Wen Chen, 2021

## What is Prototyping?

## What are the common tools for AR/VR prototyping?
- A-frame
- Figma
- Spark AR
- Snap Studio
- Unity
- WebXR
- AR.js
and more...


## What is A-frame and why use it?
> A-Frame is a web framework for building virtual reality (VR) experiences. A-Frame is based on top of HTML, making it simple to get started...A-Frame supports most VR headsets such as Vive, Rift, Windows Mixed Reality, Daydream, GearVR, Cardboard, Oculus Go, and can even be used for augmented reality. Although A-Frame supports the whole spectrum, A-Frame aims to define fully immersive interactive VR experiences that go beyond basic 360° content, making full use of positional tracking and controllers.
*From A-frame Introduction Page*

## Let's start it!
In this workshop, I will create a simple scene in webVR and develop a UI for webAR experience by A-frame and WebXR AR Module on Visual studio Code. 
You can develop it on any platform you prefer.

1. Create a folder and website files.
Open Visual Studio Code and create a new folder for this project. Create index.html, site.js, and style.css files.

2. Setting up the HTML File.
A-frame is a HTML-based framework, so it's necessary to set up your html file. First, import the normal HTML framework by clicking `!` + `TAB`, or user HTML5-Boilerplate.
To include A-frame into your code, put the script in the head section.

`<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style.css">
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    </head>
    <body>
        
        <script src="site.js" async defer></script>
    </body>
</html>`
