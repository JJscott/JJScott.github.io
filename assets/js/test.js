



class Goban {
  constructor(n) {
  	
  	var draw = SVG(n).size(100, 100);
	draw.rect(100, 100).fill('#f09');


  	var ws = draw.defs().image("/assets/js/goban/images/white.png", 10, 10);
  	var bs = draw.defs().image("/assets/js/goban/images/black.png", 10, 10);
  	// var ws = draw.defs().circle(10).fill('#000');
  	// var bs = draw.defs().circle(10).fill('#FFF');
  	draw.use(ws).move(0, 0);
  	draw.use(ws).move(10, 10);
  	draw.use(bs).move(10, 0);
  	draw.use(bs).move(0, 10);
	// var use = draw.use(rect).move(200, 200)

  }
}

window.addEventListener("DOMContentLoaded", () => {
  [].forEach.call(document.querySelectorAll(".data-goban"), n => new Goban(n));
});