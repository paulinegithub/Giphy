$(document).ready(function () {

    // var apiKey = "6EHAvzMk5Bk0Zj41x8HzMkgn6z5VfL4c";
    var apiKey = "dc6zaTOxFJmzC";
    var topics = ["cat", "dog", "funny", "random", "cute", "bunny", "kawaii"];
    var topicName;
    var newButton;

    // function to generate buttons based on topics array
    function generateButtons() {
        for (let i = 0; i < topics.length; i++) {
            newButton = $("<button>");
            newButton.addClass("btn btn-light gifButton");
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#choose-gif").append(newButton);
        }
        console.log("genButton topics: " + topics);
    }

    // generate buttons based on initial topics array
    generateButtons();

    // create new button based on user input
    $("#enter-topic").on("click", function (event) {
        event.preventDefault();

        var newTopic = $("#userTopic").val().trim();
        console.log(newTopic);
        topics.push(newTopic);

        updateButtons();
    })

    // function remake button array
    function updateButtons() {
        $("#choose-gif").empty();
        console.log("update Button topics: " + topics);
        generateButtons();
    }


    // on click of a topic button, spawn gifs
    // $("button").on("click", function () {
    $(document).on("click", ".gifButton", function () {
        // Grabbing and storing the data-name property value from the button
        topicName = $(this).data("name");
        getGifs(topicName);
        console.log( + " clicked")
    });


    // function to show gifs based on topic name
    function getGifs(topicName) {
        // Constructing a queryURL using the topic name, limited to 10 results and rating g
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topicName + "&api_key=" + apiKey + "&limit=10&rating=g";

        // Performing an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var gifDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var gifImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-state", "still"); //animate by default
                    gifImage.addClass("gifShown");

                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the gifDiv
                    gifDiv.append(gifImage);
                    gifDiv.append(p);

                    // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(gifDiv);
                }

            });
    }

    //  toggle between still and animate for gifs shown
    $(document).on("click", ".gifShown", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

})