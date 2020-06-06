var timervalue = 3;
var leftPercentage = 0;
var rightPercentage = 0;
var timer;
var winner = "";
var winnerSide = "";
var leftId = 0;
var rightId = 0;

function myFunction(my_id) {
  leftId = my_id.substr(1);
  me = document.getElementById("l" + leftId);
  img = document.getElementById("left");
  img_divs = document.querySelectorAll(".fighter-box-right");

  document.getElementById("left-list-name").innerHTML = JSON.parse(me.dataset.info).name;
  document.getElementById("left-list-age").innerHTML = JSON.parse(me.dataset.info).age;
  document.getElementById("left-list-info").innerHTML = JSON.parse(me.dataset.info).catInfo;
  document.getElementById("left-list-record").innerHTML = "Wins: " + JSON.parse(me.dataset.info).record.wins + " Loss: " + JSON.parse(me.dataset.info).record.loss;

  leftPercentage = JSON.parse(me.dataset.info).record.wins / (JSON.parse(me.dataset.info).record.wins + JSON.parse(me.dataset.info).record.loss);

  Array.from(img_divs).forEach((item) => {
    const id = JSON.parse(item.dataset.info).id;

    if (id === leftId) {
      item.style.pointerEvents = "none";
    }
  });

  if (leftId === parseInt(leftId, 10)) {
    img.src = "./images/cat0" + leftId + ".png";
  } else {
    img.src = "./images/cat1.png";
  }
  enableFight();
}

function myFunctionRight(my_id) {
  rightId = my_id.substr(1);
  me = document.getElementById("r" + rightId);
  img = document.getElementById("right");
  img_divs = document.querySelectorAll(".fighter-box-left");

  document.getElementById("right-list-name").innerHTML = JSON.parse(me.dataset.info).name;
  document.getElementById("right-list-age").innerHTML = JSON.parse(me.dataset.info).age;
  document.getElementById("right-list-info").innerHTML = JSON.parse(me.dataset.info).catInfo;
  document.getElementById("right-list-record").innerHTML = "Wins: " + JSON.parse(me.dataset.info).record.wins + " Loss: " + JSON.parse(me.dataset.info).record.loss;

  rightPercentage = JSON.parse(me.dataset.info).record.wins / (JSON.parse(me.dataset.info).record.wins + JSON.parse(me.dataset.info).record.loss);

  Array.from(img_divs).forEach((item) => {
    const id = JSON.parse(item.dataset.info).id;
    if (id === rightId) {
      item.style.pointerEvents = "none";
    }
  });

  if (rightId === parseInt("0", 10)) {
    img.src = "./images/cat0" + rightId + ".png";
  } else {
    img.src = "./images/cat1.png";
  }
  enableFight();
}

function randomize() {
  var random_id_left = 0;
  var random_id_right = 0;

  do {
    random_id_left = Math.floor(Math.random() * 6 + 1);
    random_id_right = Math.floor(Math.random() * 6 + 1);
  } while (random_id_right === random_id_left);

  left_obj = document.getElementById("l" + random_id_left);
  right_obj = document.getElementById("r" + random_id_right);

  left_obj.onclick();
  right_obj.onclick();

  enableFight();
}

function fight() {
  me = document.getElementById("generateFight");
  var src_def = "https://via.placeholder.com/300";
  var left_img = document.getElementById("left");
  var right_img = document.getElementById("right");
  var prednost = 0;
  if (left_img.src === src_def || right_img.src === src_def) {
    me.style.pointerEvents = "none";
    return;
  }

  var razlika = leftPercentage - rightPercentage;
  var abs_razlika = Math.abs(razlika);
  if (abs_razlika <= 0.1) {
    prednost = 0.1;
  } else if (abs_razlika <= 0.2) {
    prednost = 0.2;
  }

  var score = Math.random();

  if (razlika < 0) {
    if (score <= (0.49 - prednost)) {
      winner = document.getElementById("left-list-name").innerHTML;
      winnerSide = "left";
    } else {
      winner = document.getElementById("right-list-name").innerHTML;
      winnerSide = "right";
    }
  } else {
    if (score <= (0.49 + prednost)) {
      winner = document.getElementById("left-list-name").innerHTML;
      winnerSide = "left";
    } else {
      winner = document.getElementById("right-list-name").innerHTML;
      winnerSide = "right";
    }
  }

  timer = setInterval(function() {
    timerFunc();
  }, 1000);
}

function timerFunc() {
  logger = document.getElementById("logger");
  logger.innerHTML = timervalue;
  timervalue = timervalue - 1;
  if (timervalue === -1) {
    clearInterval(timer);
    logger.innerHTML = "The winner is: " + winner;
    timervalue = 3;
    updateFighters();
  }
}

function enableFight() {
  me = document.getElementById("generateFight");
  me.style.pointerEvents = "all";
}

function updateFighters() {
  left = document.getElementById("l" + leftId);
  right = document.getElementById("r" + rightId);

  left_data = JSON.parse(left.dataset.info);
  right_data = JSON.parse(right.dataset.info);

  left_wins = JSON.parse(left.dataset.info).record.wins;
  left_loss = JSON.parse(left.dataset.info).record.loss;

  right_wins = JSON.parse(right.dataset.info).record.wins;
  right_loss = JSON.parse(right.dataset.info).record.loss;

  if (winnerSide === "left") {
    left_wins = left_wins + 1;
    right_loss = right_loss + 1;

    left_data.record.wins = JSON.stringify(left_wins);
    right_data.record.loss = JSON.stringify(right_loss);
    left.setAttribute("data-info", left_data);
    right.setAttribute("data-info", right_data);
  } else {
    left_loss = left_loss + 1;
    right_wins = right_wins + 1;

    left_data.record.loss = JSON.stringify(left_loss);
    right_data.record.wins = JSON.stringify(right_wins);
    right.setAttribute("data-info", left_data);
    left.setAttribute("data-info", right_data);
  }

  document.getElementById("left-list-record").innerHTML = "Wins: " + left_data.record.wins + " Loss: " + left_data.record.loss;
  document.getElementById("right-list-record").innerHTML = "Wins: " + right_data.record.wins + " Loss: " + right_data.record.loss;
}
