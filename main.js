var img = "";
var status = "";
var object = [];

function preLoad() {
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.position(450, 150);
    video = createCapture(VIDEO);
    video.hide;
    objectDetector = ml5.objectDetector("cocossd", modelLoaded )
    document.getElementById("status").innerHTML = "Status: Detecting objecct"
}

function modelLoaded() {
    console.log("ModelLoaded");
    status = true;
    objectDetector.detect(video, gotResult);

}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);

    object = results;
}

function draw() {
    image(video, 450,150,380,380);
    
    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are:" + object.length;

            fill(r,g,b);
           var percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            NoFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].height, object[i].width);
        }
    }
}