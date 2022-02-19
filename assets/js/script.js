var toDay = moment()._d;
var saveText;
//const hoursToDay = $(".time-block");

$("#currentDay").text(moment(toDay).format('dddd, MMM DD YYYY'));

setInterval(function() {
    var toDay = moment()._d;
    $("#currentDay").text(moment(toDay).format('dddd, MMM DD YYYY'));
}, (((1000 * 60) * 60)));

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
});

$(".time-blocks-container").on("blur", "textarea", function(){
    var isHovered = $(this).next(".save-Box").is(":hover");
    console.log(isHovered);
    if (!isHovered){
        var text = saveText;

        var eventDiv = $("<div>")
            .addClass("event-box col-10 border border-secondary flex-fill d-flex justify-content-left pt-2 align-items-center");

        var eventP = $("<p>")
            .text(text);
        
        eventDiv.append(eventP);
        
        $(this).replaceWith(eventDiv);
    }
});
