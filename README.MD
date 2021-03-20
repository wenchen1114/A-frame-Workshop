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

## 1. Create a folder and website files

Open Visual Studio Code and create a new folder for this project. Create index.html, site.js, and style.css files.

## 2. Setting up the HTML File

A-frame is a HTML-based framework, so it's necessary to set up your html file. First, import the normal HTML framework by clicking `!` + `TAB`, or user HTML5-Boilerplate.
To include A-frame into your code, put the script in the head section.

```
<!DOCTYPE html>
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
</html>
```

## 3. Let's start with adding some objects

To create a scene, we  need to include things in `<a-scene>` tag. We can includes element tags to add objects into the scene. To adjust the object, we can add attribute in the tag.

```
    <a-scene>
        <a-sphere position="0.5 1 -2" radius=:"1.5" color="#FFFF00"></a-sphere>
        <a-sky color="#000000"></a-sky>
    </a-scene>
```
You can check it out by using live server. (if you don't haveit on your Visual Stdio Code, install it from extensions, or you can build up your own local server)
Now you have your first scene in A-frame!

In some of the documentation, you will see something like this:

```
<a-entity geometry="primitive: sphere; radius:1.5" 
        material="color: #FFFF00" 
        position="0.5 1 -2"></a-entity>
```

That's because A-frame is a three.js framework with an entity-component-system (ECS). The basic of ECS includes **Entities, Components, and Systems**, Entity is a container that components can be attached, like `<div>` tag in HTML. Components are modules or data containers that can be attached to entities, so that we can assign attribute to it. System is optional, but it can provide global scope and management.

In this workshop. I won't talk too much on ECS, but you can think of it as MineCraft or Alchemy game. Each object is built by different components that assigned to entity. 

Like:

**Sphere = Geometry + position + Material**

**VR Controller = Position + Rotation + Input + Model + Grab + Gestures**

So the `<a-entity>` tag above is actually identical with the orginal `<a-sphere>` we wrote!

## 4. Add 3D model into the scene

Now we are familiar with the `<a-entity>` tag, let's put some other cool stuffs into the scene.

In this workshop, we won't talk about how to create 3D model, but there are plenty of great tutorials on Youtube. Personally, I love the [beginner series](https://youtu.be/TPrnSACiTJ4) by Blender Guru, but you can definitely find the ones you like.

A-frame support two types of 3D format, glTF/glb and Obj. For me, they both work in the sketch, in this workshop, we will add [a tarot card glb model](https://drive.google.com/file/d/1i6fA3Xxr2uVyNTSXj8geymaV8rL1VnQu/view?usp=sharing) into the scene. To add the model, we need to declare the asset in the scene(it's like make a list of assets in your scene), also, we will put a id attribute to the `<a-asset-item>`, so that when you call it, you can get the source by adding `gltf-model="#yourID"` to the attribute. Also, we need to set up the primitive and scale of the model. After it, you can see a beautiful card in front of you!

```
    <a-scene>
        <a-assets>
            <a-asset-item id="card" src="tarot-star.glb"></a-asset-item>
        </a-assets>
            <a-entity gltf-model="#card" id="star" position="0 1.6 -2.5" scale="1 1 1" rotation="0 0 0"></a-entity>
    </a-scene>
```
It's a shame that we can't see the other side of this card! Let's make a loop animation that will rotate the card. To achieve this, we can simply add an animation attribute to the tag, like this:

```
<a-entity gltf-model="#card" id="star" position="0 1.6 -2.5" scale="1 1 1" rotation="0 0 0"
                animation="property:rotation; to: 0 180 0 dur: 2000; easing: linear; loop: false"></a-entity>
```

Now you'll see a tarot card fliping to the front side. Feel free to customize your own animation! You can check out [the property page](https://aframe.io/docs/1.2.0/components/animation.html#properties) for more.

## 5. Add interactions with JavasScripts

It's time to add more fun. Now we are going to create a button that will turn this card around, and when the button is clicked, the button will turn green. To make this, first, we need to add a box as a button into the scene. Also, we need a "cursor" that can interact with the objects. Here we use a fuse-control cursor that will click when gaze at a object for a certain amount of time. 

```
    <a-entity camera look-controls position="0 1.6 0">
                <a-entity cursor="fuse: true; fuseTimeout: 500" position="0 0 -1" geometry="primitive:ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: #ffffff"></a-entity>
    </a-entity>
    <a-entity gltf-model="#card" id="star" position="0 1.6 -2.5" scale="1 1 1" rotation="0 0 0"></a-entity>
    <a-box position="0.3 1.5 -1" id="button" width="0.2" height="0.1" depth="0.05" color="#FF0000"></a-box>
    <a-sky color="#000000"></a-sky>
```

