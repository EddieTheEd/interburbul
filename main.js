function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


// read burbul.txt as a string, save as burbulString variable
var burbulString = "";
var rawFile = new XMLHttpRequest();
rawFile.open("GET", "burbul.txt", false);
rawFile.onreadystatechange = function () {
  if(rawFile.readyState === 4) {
    if(rawFile.status === 200 || rawFile.status == 0) {
      burbulString = rawFile.responseText;
      // replace line breaks with <br> tags
      burbulString = burbulString.replace(/\n/g, "<br>");
    }
  }
}
rawFile.send(null);

console.log(burbulString);


function burbulRound() {
  n = 20;
  max = 20;

  cell = getRandomInt(n**2)
  quotient = Math.floor(cell/n) + 1;
  remainder = (cell % n) + 1;

  gridString =(("□").repeat(n)).repeat(n)
  
  counter = cell
  nThIndex = 0;

  if (counter > 0) {
    while (counter--) {
      nThIndex = gridString.indexOf("□", nThIndex + "□".length);
    }
  }

  gridString = gridString.substring(0, nThIndex) + "█" + gridString.substring(nThIndex + "□".length);
  gridString = gridString.match(new RegExp('.{1,' + n + '}', 'g')).join("<br>");

  topLeft = {x: getRandomInt(max), y: getRandomInt(max), z: getRandomInt(max)}
  topLeftString = "[" + topLeft["x"] + ", " + topLeft["y"] + ", " + topLeft["z"] + "]";

  bottomLeft = {x: getRandomInt(max), y: getRandomInt(max), z: getRandomInt(max)}
  bottomLeftString = "[" + bottomLeft["x"] + ", " + bottomLeft["y"] + ", " + bottomLeft["z"] + "]";

  topRight = {x: getRandomInt(max), y: getRandomInt(max), z: getRandomInt(max)}
  topRightString = "[" + topRight["x"] + ", " + topRight["y"] + ", " + topRight["z"] + "]";

  data = document.createElement('p');
  data.innerHTML = "The grid size is " + n + "x" + n + ".<br>" + "The highlighted cell is on row " + quotient + " and column " + remainder + ".<br>" + gridString + "<br> Top left: " + topLeftString + "<br> Top right: " + topRightString + "<br> Bottom left: " + bottomLeftString;
  return data 
}

window.addEventListener("DOMContentLoaded", (event) => {
  input = document.getElementById('terminalinput');

  input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        previous = document.getElementById('priortext');
        dummy = document.createElement('div');
        dummy1 = document.createElement('p');
        dummy2 = document.createElement('p');
        dummy1.innerHTML = "[user@root ~]$ ";
        dummy1.classList.add("accented");
        dummy2.innerHTML = input.value;
        dummy2.style.marginLeft = "2%";
        dummy.appendChild(dummy1);
        dummy.appendChild(dummy2);
        dummy.id = "currentline";
        previous.appendChild(dummy);
        answer = document.createElement('p');
        // add another p element on the same line

        if (input.value.startsWith("help")) {
          answer.innerHTML = "Currently available commands:<br> - help: display this message<br> - ls: list files in the current directory (not actually a thing)<br> - hollowmen: display the last stanza of the poem The Hollow Men by T.S. Eliot<br> - interburbul: play the coolest game in the world";
        } 
        else if (input.value.startsWith("ls")) {
          answer.innerHTML = "ls: list files in the current directory";
        } 
        else if (input.value.startsWith("hollowmen")) {
          answer.innerHTML = "This is the way the world ends" + "<br>" + "This is the way the world ends" + "<br>" + "This is the way the world ends" + "<br>" + "Not with a bang but a whimper.";
        }
        else if (input.value.startsWith("interburbul")) {

          burbulPic = document.createElement("p");
          burbulPic.innerHTML = burbulString;
          answer.appendChild(burbulPic);

          explainer = document.createElement("p");
          explainerString = "<br>Interburbul is a game made by Brontion Burbulator 33027756. The objective is to guess a 3D vector that projects into the highlighted cell chosen by Brontion. The 3D vectors of 3 corners of the grid are given, these points describe a 3D plane, and your guess is projected onto that plane from the origin {0,0,0}.<br><br>"
          explainer.innerHTML = explainerString;

          answer.appendChild(explainer);

          answer.appendChild(burbulRound());
          
        }
        
        else {
          answer.innerHTML = "command '" + input.value + "' not found";
        }
        previous.appendChild(answer);
        input.value = "";

      }
  });
});
