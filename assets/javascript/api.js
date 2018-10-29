$(document).ready(function () {

    // API key 6EHAvzMk5Bk0Zj41x8HzMkgn6z5VfL4c

    let topics = ["cat", "dog", "funny", "random", "bird"];

    for (let i = 0; i < topics.length; i++) {

    }

    //  toggle still and animation
    $(document).on('click', '.gif', function() {
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


    //  on click on topic button, spawn gifs
    $("button").on("click", function () {
        // Grabbing and storing the data-animal property value from the button
        var topicName = $(this).data("name");

        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topicName + "&api_key=dc6zaTOxFJmzC&limit=10";

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
                    gifImage.attr("src", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "animate"); //animate by default
                    gifImage.addClass("gif");

                    gifImage.attr("data-still", results[i].images.fixed_height_still.url); 
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the gifDiv
                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(gifDiv);
                }

            });
    });

})