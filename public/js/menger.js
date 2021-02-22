/****************************************
 * Author : Arthur Freeman              * 
 * Date : 22/02/2021                    *
 ****************************************/
let sponge = new Sponge(0, 0, 0, 200);
let windowWidth = 800;
let windowHeight = 400;

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
    myCanvas.parent("parent");
    myCanvas.style('margin', 'auto');
    background(225);
    frameRate(30);
    normalMaterial();
}

function mousePressed() {
    if(mouseX >= 0 && mouseY >= 0 && mouseX < windowWidth && mouseY < windowHeight) {
        sponge.update();
        console.log(sponge.cubes)
    }
}

function draw() {
    background(225);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    for(let b=0; b < sponge.cubes.length; b++) {
        translate(sponge.cubes[b].pos);
        box(sponge.r);
        translate(-sponge.cubes[b].pos.x, -sponge.cubes[b].pos.y, -sponge.cubes[b].pos.z);
    }
}