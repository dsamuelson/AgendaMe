var toDay = moment()._d;
var saveText;
var eventsSoFar = {};

$("#currentDay").text(moment(toDay).format('dddd, MMM DD YYYY'));

//set up the initial time/date for today then check every hour to see if the date has changed just in case they leave the tab opened

setInterval(function() {
    var toDay = moment()._d;
    $("#currentDay").text(moment(toDay).format('dddd, MMM DD YYYY'));
}, (((1000 * 60) * 60)));


//set up time interval so that the colors of the tasks will change when certain times pass

let colorTimeSlots = function(){
    //get current time formatted for the current hour

    var currTime = moment(moment()._d).format('HH');
    var colorTime = $(".time-block");
    console.log(currTime);

    //set up event boxes to compare to current time 
    
    colorTime.each(function(){
        let myTimeValue = $(this).data("time");
        var thisTimeSlot = $(this).children(".event-box")
        if (currTime == myTimeValue) {
            thisTimeSlot.addClass("present");
            thisTimeSlot.removeClass("past");
            thisTimeSlot.removeClass("future");

        } else if (currTime > myTimeValue) {
            thisTimeSlot.addClass("past");
            thisTimeSlot.removeClass("present");
            thisTimeSlot.removeClass("future")

        } else if (currTime < myTimeValue) {
            thisTimeSlot.addClass("future");
            thisTimeSlot.removeClass("past");
            thisTimeSlot.removeClass("present");
        }
    });
};

setInterval(function(){
    colorTimeSlots();
}, (1000 * 60));

//save events into localStorage

let saveEvents = function() {
    var eventsToday = $(".event-box");
    var saveEventsToday = {
        nineAM: eventsToday[0].children[0].innerText,
        tenAM: eventsToday[1].children[0].innerText,
        elevenAM: eventsToday[2].children[0].innerText,
        twelvePM: eventsToday[3].children[0].innerText,
        onePM: eventsToday[4].children[0].innerText,
        twoPM: eventsToday[5].children[0].innerText,
        threePM: eventsToday[6].children[0].innerText,
        fourPM: eventsToday[7].children[0].innerText,
        fivePM: eventsToday[8].children[0].innerText,
    };
    localStorage.setItem("events", JSON.stringify(saveEventsToday));
    colorTimeSlots();
};

// Load events from localStorage and put the text into their appropriate boxes

let loadEvents = function() {
    eventsSoFar = JSON.parse(localStorage.getItem("events"));
    var eventsToday = $(".event-box");
    eventsToday[0].children[0].innerText = eventsSoFar.nineAM;
    eventsToday[1].children[0].innerText = eventsSoFar.tenAM;
    eventsToday[2].children[0].innerText = eventsSoFar.elevenAM;
    eventsToday[3].children[0].innerText = eventsSoFar.twelvePM;
    eventsToday[4].children[0].innerText = eventsSoFar.onePM;
    eventsToday[5].children[0].innerText = eventsSoFar.twoPM;
    eventsToday[6].children[0].innerText = eventsSoFar.threePM;
    eventsToday[7].children[0].innerText = eventsSoFar.fourPM;
    eventsToday[8].children[0].innerText = eventsSoFar.fivePM;
};

//make text area appear when the event box next to the desired time is pressed

$(".time-blocks-container").on("click", ".event-box", function(){
    var text = $(this)
        .text()
        .trim();
    
    saveText = text;

    var textInput = $("<textarea>")
        .addClass("form-control event-Input")
        .val(text);
    
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

// make it so that when you press on the save box it saves the content of the text area to the time slot

$(".time-blocks-container").on("click", ".save-Box", function () {
    var text = $(this)
        .prev(".event-Input")
        .val();
    
    var eventDiv = $("<div>")
        .addClass("event-box col-10 border border-secondary flex-fill d-flex justify-content-left pt-2 align-items-center");

    var eventP = $("<p>")
        .text(text);
    
    eventDiv.append(eventP);
    saveText = text;
    $(this).prev(".event-Input").replaceWith(eventDiv);
    saveEvents();
});

// If you click outside but not on the save button the box the text will revert back to its original value

$(".time-blocks-container").on("blur", "textarea", function(){
    var isHovered = $(this).next(".save-Box").is(":hover");
    if (!isHovered){
        var text = saveText;

        var eventDiv = $("<div>")
            .addClass("event-box col-10 border border-secondary flex-fill d-flex justify-content-left pt-2 align-items-center");

        var eventP = $("<p>")
            .text(text);
        
        eventDiv.append(eventP);
        
        $(this).replaceWith(eventDiv);
    }
    colorTimeSlots();
});

//load events when page opens

loadEvents();
colorTimeSlots();
