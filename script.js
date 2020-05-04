var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var gavat = new Image();
var ultapipe = new Image();
var saralpipe = new Image();

bird.src = "image/bird.png";
bg.src = "image/bg.png";
gavat.src = "image/gavat.png";
ultapipe.src = "image/ultapipe.png";
saralpipe.src = "image/pipe.png";

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = ultapipe.height+gap;
        ctx.drawImage(ultapipe, pipe[i].x, pipe[i].y);
        ctx.drawImage(saralpipe, pipe[i].x, pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*ultapipe.height)-ultapipe.height
            }); 
        }
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + ultapipe.width && (bY <= pipe[i].y + ultapipe.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - gavat.height){
            alert("Game Over \nScore : " + score);
            window.close();
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(gavat,0,cvs.height - gavat.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();