objects = [];
status="";
function preload() {
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.position(520, 100);
    video.hide();
    video=createCapture(VIDEO);
    video.size();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Estado: objecto detectado";
            document.getElementById("number_of_object").innerHTML = "Numero de objetos detectados: " + objects.length;
            fill("#FFOOOO");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FFOOOO");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Estado: detectando objetos";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Modelo cargado");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}