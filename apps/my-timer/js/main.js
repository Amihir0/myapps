(function name(params) {
  "use strict";

  var timer = document.getElementById("timer");
  var min = document.getElementById("min");
  var sec = document.getElementById("sec");
  var reset = document.getElementById("reset");
  var start = document.getElementById("start");
  var startTime;
  var timeLeft;
  var timeToCountDown = 0;
  var timerId;
  var isRunning = false;

  function updateTimer(t) {
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();
    var timerString;
    m = ("0" + m).slice(-2);
    s = ("0" + s).slice(-2);
    ms = ("00" + ms).slice(-3);

    timerString = m + ":" + s + "." + ms;
    timer.textContent = timerString;
    document.title = timerString;
  }

  function countDown() {
    timerId = setTimeout(function() {
      timeLeft = timeToCountDown - (Date.now() - startTime);
      if (timeLeft < 0) {
        isRunning = false;
        start.textContent = "start";
        clearTimeout(timerId);
        timeLeft = 0;
        updateTimer(timeLeft);
        timeToCountDown = 0;
        return;
      }
      updateTimer(timeLeft);
      countDown();
    }, 10);
  }

  start.addEventListener("click", function() {
    if (isRunning === false) {
      isRunning = true;
      start.textContent = "stop";
      startTime = Date.now();
      countDown();
    } else {
      isRunning = false;
      start.textContent = "start";
      timeToCountDown = timeLeft;
      clearTimeout(timerId);
    }
  });

  min.addEventListener("click", function() {
    if (isRunning === true) {
      return;
    }
    timeToCountDown += 60 * 1000;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  sec.addEventListener("click", function() {
    if (isRunning === true) {
      return;
    }
    timeToCountDown += 1000;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  reset.addEventListener("click", function() {
    timeToCountDown = 0;
    updateTimer(timeToCountDown);
  });
})();
