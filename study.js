var img = "Study table.jpeg";
var status = "";
var object = [];
var imageLoaded = "";


function preLoad() {
 loadImage(img);
}

function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    objectDitector = ml5.objectDetector("cocosdd", ModelLoaded )
    document.getElementById("status").innerHTML = "Status: Detecting objecct"
}

function ModelLoaded() {
    console.log("ModelLoaded");
    status = true;
    objectDetector.detect(img, gotResult);

}

function gotResult(error, results) {
    if(error) {
        console.error(error)
    }
    console.log(results);

    object = results;
}



function draw() {
    Image(img, 0,0,640,420);
    
    if(status != "") {
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill("#FF0000");
           var percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            NoFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].height, object[i].width);
        }
    }
}