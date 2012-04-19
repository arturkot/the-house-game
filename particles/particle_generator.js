/*
 * Javascript/HTML5 Particle Generator v0.1
 * http://scurker.com/projects/particles
 * 
 * Copyright (c) 2010 Jason Wilson, http://scurker.com
 * 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Extend an object and its properties
 * Idea mainly from jQuery's extend method
 */
function extend() {
  var target = arguments[0], length = arguments.length, i = 1, options;
  
  if(typeof target !== 'object' && toString.call(target) == "[object Function]")
    target = {};
  
  for(; i < length; i++) {
    if((options = arguments[i]) != null) {
      for(var name in options) {
        var src = target[name], copy = options[name];            
        if(copy !== undefined) 
          target[name] = copy;
      }
    }
  }
  
  return target;
}

/**
 * Basic Math Vector 
 * Used for vector calculations
 */    
var Vector = function(p) {
  p = extend({x: 0, y: 0}, p);
  this.x = p.x;
  this.y = p.y;
  return this;
};

Vector.prototype = {
  
  add: function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  },
  
  clone: function() {
    return new Vector({x: this.x, y: this.y});
  },
  
  distance: function(v) {
    var x = this.x - v.x,
        y = this.y - v.y;
    return Math.sqrt(x * x + y * y);
  },
  
  length: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  
  points: function(p) {
    if(p === undefined) return {x: this.x, y: this.y};
    p = extend(this.p, p);
    this.x = p.x;
    this.y = p.y;
    return this;    
  },
  
  rotate: function(rad) {
    var cos = Math.cos(rad), sin = Math.sin(rad), x = this.x, y = this.y;
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  },
  
  subtract: function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }        
  
};

var ParticleGenerator = function(options) {
  
  var options = extend({
    shape: 'circle',
    velocity: new Vector({y: -3}),
    xVariance: 20,
    yVariance: 5,
    spawnSpeed: 25,
    generations: 100000,
    maxParticles: 500,
    size: 20,
    sizeVariance: 5,
    life: 30,
    lifeVariance: 10,    
    direction: 0,
    directionVariance: 15,
    color: '#cef',
    opacity: 1,
    onDraw: function(p) {
      var y = -this.age * 3;
      p.size *= 0.98;
      p.color = 'rgb(255, ' + (y + 255) + ', 68)';
      p.opacity = 0.5 - (p.age / p.life * 0.4);
    }
  }, options);
  
  this.p = options.position;
  this.v = options.velocity;
  this.options = options;
  this.active = true;
  this.age = 0;
  
  return this;  
};

ParticleGenerator.prototype = {
    
  particles: [],
    
  update: function() {
  
    // Check to see if we've reached the max # of generation cycles
    if(this.options.generations != -1 && this.age <= this.options.generations) {
      if(this.particles.length == 0 && this.options.generations <= this.age) this.active = false;
      this.age++;
    }
  
    // Update any existing particles; check for dead particles
    for(var i in this.particles) {
      var particle = this.particles[i];
      if(particle.active === false) {
        this.particles.splice(i, 1); 
      } else {
        particle.update(); 
      }
    }
  
    // Generate # (spawnSpeed) of particles for this update iteration
    // as long as we haven't reached the max # of particles
    for(var spawned = 0; spawned < this.options.spawnSpeed; spawned++) {
      if(this.particles.length >= this.options.maxParticles || this.options.generations <= this.age) {
        return; 
      }
      this.particles.push(new Particle(this.options));
    }
  },
  
  draw: function(ctx) {
    for(var i in this.particles) {
      this.particles[i].draw(ctx);
    }
  },
    
};

var Particle = function(options) {
  
  // output a random variance number
  var rand = function(num) { return (Math.random() * num << 1) - num; };
  
  // Set the initial position variance
  var position = new Vector({x: rand(options.xVariance), y: rand(options.yVariance)});
  
  // Set the initial particle directional heading
  var direction = options.direction + rand(options.directionVariance);
  
  extend(this, options, {
    p: options.position.clone().add(position),
    v: options.velocity.clone().rotate(direction * Math.PI/180),
    age: 0,
    life: options.life + rand(options.lifeVariance),
    size: options.size + rand(options.sizeVariance),
    active: true
  });
  
  return this;  
};

Particle.prototype = {
  
  update: function() {
    if(this.age >= this.life) this.active = false;
    this.p.add(this.v);
    this.age++;
  },
  
  draw: function(ctx) {
    if(typeof this.onDraw === 'function') this.onDraw(this);
    ctx.save();
    ctx.fillStyle = this.color;
    try {
      ctx.globalAlpha = this.opacity;
    } catch(ex) {
      console.debug(ex); 
    }
    ctx.translate(this.p.x, this.p.y);
    
    switch(this.shape) {
      case 'square':
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
      break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, this.size/2, 0, Math.PI/180, true);
        ctx.closePath();
        ctx.fill();
      break;
    }

    ctx.restore();
  }
  
};

function ParticleCanvas(canvas, pos) {
  if(!canvas) return;
  
  this.ctx = canvas.getContext('2d');
  this.height = canvas.height;
  this.width = canvas.width;
  
  // Set default position (center) if one doesn't exist
  pos = extend({x: this.width/2, y: this.height/2}, pos);
  
  this.particleGenerator = new ParticleGenerator({position: new Vector(pos)});
  
  return this;
};

ParticleCanvas.prototype = {

  // Set the frame rate
  start: function() {
    var self = this;
    return setInterval(function() { self.tick(); }, 1000/60);
  },
  
  // Initialize the canvas per frame
  init: function() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.stroke();
    ctx.save();
  },
  
  update: function(options) {    
    
    // Convert any numerics to numbers
    for(var i in options) {
      options[i] = isNaN(parseFloat(options[i])) ? options[i] : parseFloat(options[i]);
    }
    
    if(!(options.velocity instanceof Vector))
      options.velocity = new Vector({y: -options.velocity});
    
    options.directionVariance = parseInt(options.directionVariance);
    
    extend(this.particleGenerator.options, options);
  },

  tick: function() {
    this.init();
    
    this.particleGenerator.update(this.ctx);
    this.particleGenerator.draw(this.ctx);
  }
    
};