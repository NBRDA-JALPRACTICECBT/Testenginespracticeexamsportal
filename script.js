
function playAndGo() {
    const sound = document.getElementById("clickSound");

    sound.currentTime = 0;

    sound.play().catch(error => {
        console.log(error);
    });

    setTimeout(function() {
        window.location.href = "cbt.html";
    }, 1400);
}

function playAndGo2() {
    const sound = document.getElementById("clickSound2");
  //  const sound3 = document.getElementById("clickSound3");
    sound.currentTime = 0;
   
    sound.play().catch(error => {
        console.log(error);
    });

    setTimeout(function() {
        window.location.href = "cbt2.html";
    }, 5000);
}

function playAndGo3() {
    const sound = document.getElementById("clickSound3");

    sound.currentTime = 0;

    sound.play().catch(error => {
        console.log(error);
    });

    setTimeout(function() {
        window.location.href = "cbt3.html";
    }, 5000);
}

function playAndGo4() {
    const sound = document.getElementById("clickSound");

    sound.currentTime = 0;

    sound.play().catch(error => {
        console.log(error);
    });

    setTimeout(function() {
        window.location.href = "cbt4.html";
    }, 1400);
}