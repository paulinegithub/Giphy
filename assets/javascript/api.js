$(document).ready(function () {

    var apiKey = "6EHAvzMk5Bk0Zj41x8HzMkgn6z5VfL4c";
    var topics = ["cat", "dog", "random", "cute", "kawaii"];
    var topicName;

    // function to generate buttons based on topics array
    function generateButtons() {
        for (let i = 0; i < topics.length; i++) {
            let newButton = $("<button>");
            newButton.addClass("btn btn-info gifButton");
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#choose-gif").append(newButton);
        }
        console.log("current gif topics: " + topics);
    }

    // generate buttons based on initial topics array
    generateButtons();

    // create new button based on user input
    $("#enter-topic").on("click", function (event) {
        event.preventDefault();

        let newTopic = $("#userTopic").val().trim();
        console.log("new topic: " + newTopic);

        if (newTopic != "") {
            topics.push(newTopic);
            updateButtons();
        }
    });

    // function remake button array
    function updateButtons() {
        $("#choose-gif").empty();
        console.log("updated gif topics: " + topics);
        generateButtons();
    }

    // reset on click instead of refreshing page
    $("#reset").on("click", function (event) {
        topics = ["cat", "dog", "funny", "random", "cute", "bunny", "kawaii"];
        console.log("topics reset: " + topics);
        updateButtons();

        $("#gifs-appear-here").empty();
    });

    // on click of a gif topic button, spawn gifs
    $(document).on("click", ".gifButton", function () {
        // Grabbing and storing the data-name property value from the button
        topicName = $(this).data("name");
        getGifs(topicName);
        console.log(topicName + " clicked");
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

                // clear old gifs
                $("#gifs-appear-here").empty();

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text(results[i].title);
                    p.append("<BR>Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var gifImage = $("<img>");
                    // initial source and animation state (still)
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("gifShown");

                    // setting up animation states for toggling later
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
        // find current animation state
        var state = $(this).attr("data-state");
        // change from still to animated when clicked
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        // change from animated to still when clicked
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

})