const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


randBetween = (a, b) => {
    if(a>b) console.error('a must be smaller than b.');
    return () => { return Math.random() * (b-a) + a };
}

Parameters = { 
    scale: 
        randBetween(20, 30),
    rotation: 
        randBetween(0, 2*Math.PI),
    velocity: 
        randBetween(1, 4),
    angularVelocity: 
        randBetween(0, Math.PI * 0.02),
    length: 
        randBetween(50, 125),
    spawn:
        3
}

class Root {

    x;
    y;
    scale = Parameters.scale();
    rotX = Parameters.rotation();
    rotY = Parameters.rotation();
    vx = Parameters.velocity();
    vy = Parameters.velocity();
    rx = Parameters.angularVelocity();
    ry = Parameters.angularVelocity();
    length = 0;
    maxLength = Parameters.length();
    color;

    constructor(x, y, t) {
        this.x = x;
        this.y = y;
        this.color = t;
    }

    update() {

        if(this.length > this.maxLength) {
            return;
        }

        this.x += this.vx * Math.cos(this.rotX);
        this.y += this.vy * Math.sin(this.rotY);
        this.rotX += this.rx;
        this.rotY += this.ry;

        ctx.fillStyle = 'hsl(' + 0.1*this.color + ', 50%, ' + (this.length / this.maxLength * (50 - 20) + 30) + '%)';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.scale * (Math.cos(this.length*.1) * .5 + .8), 0, 2 * Math.PI);
        // ctx.fill();
        // ctx.stroke();

        ctx.fillRect(this.x, this.y, this.scale, this.scale);

        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.strokeRect(this.x, this.y, this.scale, this.scale);


        this.length++;
    }

}

const objects = [];
let mouseDown = false;

document.addEventListener("mousedown", () => {
    mouseDown = true;
});

document.addEventListener("mouseup", () => {
    mouseDown = false;
});

let mx;
let my;

document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
});

let t = 0;
var lastTick = performance.now();

animate = () => {
    requestAnimationFrame(animate);
    var delta = performance.now() - lastTick;
    lastTick = performance.now();
    t += delta;
    
    if(mouseDown) {
        for(let i=0; i < Parameters.spawn; i++) {
            const root = new Root(mx, my, t);
            objects.push(root);
        }
    }

    for(let object of objects) {
        object.update();
    }
};

animate();

