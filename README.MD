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

![A yellow sphere in the black universe](/workshop-photos/Capture-1.PNG)

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

![A tarot in the black universe](/workshop-photos/Capture-2.PNG)

## 5. Add interactions with JavasScripts

It's time to add more fun. Now we are going to create a button that will turn this card around, and when the button is clicked, the button will turn green. To make this, first, we need to add a plane as a button into the scene. Also, we need a "cursor" that can interact with the objects. Here we use a fuse-control cursor that will click when gaze at a object for a certain amount of time. 

```
    <a-entity camera look-controls position="0 1.6 0">
        <a-entity cursor="fuse: true; fuseTimeout: 2000" position="0 0 -1" geometry="primitive:ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: #ffffff"></a-entity>
    </a-entity>
    <a-plane position="0.4 1.5 -1" id="button" width="0.4" height="0.1"  color="#FF0000">
        <a-text value="Show the card" position="-0.15 0 0" color="#ffffff" width="1" ></a-text>
    </a-plane>
```

To test if the cursor really work, let's make a really quick experiment: add link="href: https://www.google.com/" in your text tag like below, and when you put your cursor on the text, you will see the page is automatically directed to Google front page.

![A yellow sphere with a button and cursor in the black universe](/workshop-photos/Capture-3.PNG)

```
<a-text value="Show the card" position="-0.15 0 0" color="#ffffff" width="1" link="href: https://www.google.com/"></a-text>
```

But how about making cursor trigger an event? At the first part of this workshop, we talked about the three elements of A-frame: Entities, Components, and Systems, and components are like the attributes that makes the object cooler. So to make the object interactive, we can write our own component in JavaScript, and then use it in HTML. In A-frame, we register the component like this:

```
//from A-frame Documentation: https://aframe.io/docs/1.2.0/introduction/writing-a-component.html#registering-the-component-with-aframe-registercomponent
AFRAME.registerComponent('hello-world', {
  init: function () {
    console.log('Hello, World!');
  }
})
```

And in HTML, you can add the component to HTML tag like this:

```
<a-scene>
  <a-entity hello-world></a-entity>
</a-scene>
```

check your inspector(right click on your browser), do you see the hello world message in the console? Let's get deeper from here. We are going to turn the button green when cursor hover on it, and turn back to red when the cursor hovers out. To make this, we will develop our component a bit further, like this:

```
AFRAME.registerComponent('turngreen', {
    init: function () {
      this.el.addEventListener('mouseenter', function(e){
        this.setAttribute('color', '#00FF00')
      })
    }
  })
```

This may looks a bit complicated, but it means that I register a component called "turngreen", and when it's initialized, it will start to listen the mouseenter event - which means that when the mouse is hovering on the button, it will do something. so the something is - I will set the color attribute, which is originally red, to green. I can also create a component called "turnred" make the button color back to red when hovering is over.

```
AFRAME.registerComponent('turngreen', {
    init: function () {
      this.el.addEventListener('mouseenter', function(e){
        this.setAttribute('color', '#00FF00')
      })
    }
  })

  AFRAME.registerComponent('turnred', {
    init: function () {
      this.el.addEventListener('mouseleave', function(e){
        this.setAttribute('color', '#FF0000')
      })
    }
  })
  ```
After finishing the component, add them to your html tag:

```
<a-plane turnred turngreen position="0.4 1.5 -1" id="button" width="0.4" height="0.1"  color="#FF0000">
        <a-text value="Show the card" position="-0.15 0 0" color="#ffffff" width="1" ></a-text>
    </a-plane>
```
Save your file and refresh the page, a cool hover interaction is done! now let's add the animation we created before into turngreen, like this:

```
let star = document.getElementById("star");

AFRAME.registerComponent('turngreen', {
    init: function () {
      this.el.addEventListener('mouseenter', function(e){
        this.setAttribute('color', '#00FF00')
        star.setAttribute('animation', 'property:rotation; to: 0 180 0 dur: 2000; easing: linear; loop: false');
      })
    }
  })
```

and you have the final result! I hope this tutorial is fun and helpful for you. If you have any question or want to see more tutorial, please contact me at kwc354@nyu.edu, I'm happy to have a chat with you!