
let dataController = {

async get() {
    const requestURL = "/php/index.php";
    
    const response = await fetch(requestURL, {
    method: "post",
    headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
    a: 1
    })
    });
    
    const result = await response.json();
    return result;
    }
}

  const main = async () => {
  const data = await dataController.get();
  console.log(data);
  
  let CalendarController = {
    firstDay: data.startDayMonth,
    amount: data.daysAmount,
  
    addDay() {
      let calendarDiv = document.getElementById("date_weeks");
  
      for(let x=1; x < this.firstDay; x++){
        calendarDiv.innerHTML += '<div class="empty"></div>'
      }
    for(let x=1; x <= this.amount; x++){
      calendarDiv.innerHTML += '<div class="day">'+ x +'</div>'
    }
    },
  };
  
  let NotesController = {
   
    addNote(){
      let notesDiv = document.getElementById('notes')
      let notesAmount = Object.keys(data.notes).length
      console.log(notesAmount)
      for(let x=0; x < notesAmount; x++){
        console.log(x)
  notesDiv.innerHTML +=  '<div class="note" id='+ x +'>'+
  '<div class="title">'+
  '<div class="date">'+ data.notes[x].date + ' ' + data.notes[x].month +'</div>' +
  '<div class="preferences" id='+ x +'></div>' +
  '</div>' +
  '<div class="text">'+ data.notes[x].text  +'</div>' +
   '</div>'
      }
    }
  }
  
  let DaysController = {

  }

  CalendarController.addDay();
  NotesController.addNote();
  slide();
  
  function daysSpawner() {
    const slider = document.getElementById("workSlider");
    slider.innerHTML +=
      ' <div class="day" id="empty">' + data.prevMonth + "</div>";
    for (x = 0; x < data.daysAmount; x++) {
      if (data.daysData[x] != null) {
        slider.innerHTML += spawnDay(
          x,
          x + 1,
          data.curMonth,
          "DayWeek",
          data.daysData[x].tasks
        );
      }else{
        slider.innerHTML += spawnDay(
          x,
          x + 1,
          data.curMonth,
          "DayWeek",
          'empty'
        );
      } 

    }
    sliding(slider, data.currentDay - 1, -1); //here!!!!!!!!!!!!!!!!
  
    slider.innerHTML +=
      ' <div class="day" id="empty">' + data.nextMonth + "</div>";
  }
  
  function slide() {
    daysSpawner();
  
    let vars = data.currentDay - 1;
    const slider = document.getElementById("workSlider");
    slider.scrollLeft = 0;
    let Cday = setTimeout(function () {
      slider.addEventListener("wheel", function (event) {
        event.preventDefault();
  
        if (event.deltaY > 0 && vars > 0) {
          vars -= 1;
  
          sliding(slider, vars, -1);
        }
        if (event.deltaY < 0 && vars < data.daysAmount - 1) {
          vars += 1;
  
          sliding(slider, vars, 1);
        }
      });
    }, 0);
  }
  
  function sliding(slider, day, direction) {
    let widthBlock = document.getElementById("workSlider").offsetWidth;
    slider.scrollLeft =
      day * ((widthBlock / 100) * 30 + (widthBlock / 100) * (1.66 * 2));
    setCurrentDayStyle(day, direction);
  }
  
  function setCurrentDayStyle(day, direction) {
    const dayDiv = document.getElementById(day);
    // dayDiv.style.backgroundColor = '#00a2ff';
    // dayDiv.style.width = "38%";
    // dayDiv.style.transform = "rotateZ(0deg)";
    dayDiv.style.marginTop = "30px";
    dayDiv.style.boxShadow = "0px 0px 32px rgba(0, 0, 0, 0.15)";
  
    const precDayDiv = document.getElementById(day - 1 * direction);
    precDayDiv.style.backgroundColor = "";
    // precDayDiv.style.width = "30%";
    // precDayDiv.style.transform = "rotateZ(2deg)";
    precDayDiv.style.marginTop = "80px";
    precDayDiv.style.boxShadow = "";
  }
  
  function spawnDay(id, day, month, dayWeek, tasks) {
    let newDayDiv =
      '<div class="day" id="' +
      id +
      '">' +
      '<div class="title">' +
      '<div class="dayValue">' +
      day +
      "</div>" +
      '<div class="dayInfo">' +
      '<div class="month">' +
      month +
      "</div>" +
      '<div class="dayWeek">' +
      dayWeek +
      "</div>" +
      "</div>" +
      '<div class="addNew">Create</div>' +
      "</div>" +
      '<div class="separator"></div>' +
      '<div class="task_space">';
      if(tasks != 'empty'){
        for (let x = 0; x < Object.keys(tasks).length; x++)
        newDayDiv += spawnTask(id, tasks[x].title, tasks[x].text);
      }else{
        newDayDiv += '<div class="noTasks">No tasks yet...</div>'
      }
        {

        }
       
      
    newDayDiv += "</div>" + "</div>";
  
    return newDayDiv;
  }
  
  function spawnTask(id, title, text) {
    const newTaskDiv =
      '<div class="task" id="' +
      id +
      '">' +
      '<div class="title">' +
      '<div class="text">' +
      title +
      "</div>" +
      '<div class="options"> X </div>' +
      "</div>" +
      '<div class="taskText">' +
      text +
      "</div>" +
      "</div>";
  
    return newTaskDiv;
  }
  
  };
  
  main();

  