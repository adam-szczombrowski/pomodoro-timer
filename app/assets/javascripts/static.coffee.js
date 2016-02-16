var actual_time;
var break_time;
var interval;
var work;

function update_timer()
{
  var minutes = 0;
  var seconds = 0;
  if (actual_time > 0)
    {
      $("#state").text("WORK!");
      actual_time -= 1;
      minutes = Math.floor(actual_time/60);
      seconds = actual_time % 60;
      if (actual_time == 0)
        console.log("break time");
    }
  else if (break_time > 0)
    {
      $("#state").text("BREAK!");
      break_time -= 1;
      minutes = Math.floor(break_time/60);
      seconds = break_time % 60;
      if (break_time == 0)
        console.log("break is over");
    }
  else
    {
      $("#state").text("");
      $("#timer_display").text($("#pomodoro_length").text());
      clearInterval(interval);
      return 0;
    }
  if (seconds < 10)
    seconds = "0" + seconds;
  console.log([minutes, seconds, actual_time, break_time]);
  $("#timer_display").text(minutes + ":" + seconds);

}

function update_display(button)
{
  switch(button.attr("id")){
    case "break_minus":
      var text = parseInt($("#break_length").text()) - 1;
      $("#break_length").text(text);
         break;
    case "break_plus":
      var text = parseInt($("#break_length").text()) + 1;
      $("#break_length").text(text);
    case "pomodoro_minus":
         var text = parseInt($("#pomodoro_length").text()) - 1;
         $("#pomodoro_length").text(text);
         $("#timer_display").text(text);
         break;
    case "pomodoro_plus":
      var text = parseInt($("#pomodoro_length").text()) + 1;
         $("#pomodoro_length").text(text);
         $("#timer_display").text(text);
      break;
  }
}
function check_display()
{
  if (parseInt($('#break_length').text()) < 0 )
    $('#break_length').text("0");
  if (parseInt($('#pomodoro_length').text()) < 1)
    {
    $('#pomodoro_length').text("1");
    $('#timer_display').text("1");
    }
}


$(document).ready(function(){
  break_time = 5 * 60;
  actual_time = 25 * 60;
  work = false;
    $(".timer").click(function(){
      if (work == false)
      {
      work = true;
      actual_time = $("#pomodoro_length").text() * 60;
      break_time = $("#break_length").text() * 60;
      interval = setInterval(function(){
    update_timer();
}, 1000);}
      else {
        work = false;
        $("#state").text("");
        clearInterval(interval);
        $("#timer_display").text($("#pomodoro_length").text());
      }
    });
    $("button").click(function(){
      update_display($(this));
      check_display();
    });
 });
