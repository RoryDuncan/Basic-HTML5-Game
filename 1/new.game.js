function Game() {}
Game.prototype.addEntity = function() {};

function Timer() {}
Timer.prototype.tick = function() {};

function Entity() {}
Entity.prototype.update = function() {};
Entity.prototype.draw = function() {};

function Scene() { Entity.call(this); }
Scene.prototype = new Entity();
Scene.prototype.constructor = Scene;
Scene.prototype.update = function() {};
Scene.prototype.draw = function() {};

function Map() { Entity.call(this); }
Map.prototype = new Entity();
Map.prototype.constructor = Map;
Map.prototype.update = function() {};
Map.prototype.draw = function() {};


function Hero() { Entity.call(this); }
Hero.prototype = new Entity();
Hero.prototype.constructor = Hero;
Hero.prototype.update = function() {};
Hero.prototype.draw = function() {};

function Enemy() { Entity.call(this); }
Enemy.prototype = new Entity();
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function() {};
Enemy.prototype.draw = function() {};
