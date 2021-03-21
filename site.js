let star = document.getElementById("star");

AFRAME.registerComponent('turngreen', {
    init: function () {
      this.el.addEventListener('mouseenter', function(e){
        this.setAttribute('color', '#00FF00')
        star.setAttribute('animation', 'property:rotation; to: 0 180 0 dur: 2000; easing: linear; loop: false');
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