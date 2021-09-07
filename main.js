song = "";
LeftX = "";
RightX = "";
LeftY = "";
RightY = "";

function setup() {
    canvas = createCanvas(500, 400);
    video = createCapture(VIDEO);
    canvas.center();
    video.hide();
    posenet = ml5.poseNet(video, model_loaded);
    posenet.on("pose", getResult);
}

function model_loaded() {
    console.log("Model is not loaded");
}

function draw() {
    image(video, 0, 0, 500, 400);
    circle(LeftX, LeftY, 25);
    stroke("#00FFAB");
    fill("#00FFAB");
    LeftYNo = Number(LeftY);
    LeftYWhole = floor(LeftYNo);
    volume = LeftYWhole / 400;
    document.getElementById("volume").innerHTML = "Volume: " + volume;
    song.setVolume(volume);
    circle(RightX, RightY, 25);
    stroke("#00FFAB");
    fill("#00FFAB");
    if (RightY > 0 && RightY <= 100) {
        song.rate(0.5);
        document.getElementById("speed").innerHTML = "Speed: 0.5x";
    } else if (RightY > 100 && RightY <= 200) {
        song.rate(1);
        document.getElementById("speed").innerHTML = "Speed: 1x";
    } else if (RightY > 200 && RightY <= 300) {
        song.rate(1.5);
        document.getElementById("speed").innerHTML = "Speed: 1.5x";
    } else if (RightY > 300 && RightY <= 400) {
        song.rate(2);
        document.getElementById("speed").innerHTML = "Speed: 2x";
    }
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}

function getResult(result) {
    if (result.length > 0) {
        console.log(result);
        LeftX = result[0].pose.leftWrist.x;
        RightX = result[0].pose.rightWrist.x;
        LeftY = result[0].pose.leftWrist.y;
        RightY = result[0].pose.rightWrist.y;
        console.log("Lx:" + LeftX + "Rx:" + RightX + "Ly:" + LeftY + "Ry:" + RightY);
    }
}