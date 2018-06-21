$(document).ready(function() {

    //Initial array of painters

    var topics = ["Pablo Picasso", "Andy Warhol","Vincent Van Gogh","Paul Cezanne", "Claude Monet", "Michelangelo","Leonardo da Vinci","Sandro Botticelli","Georges Seurat","Mary Cassatt","Paul Gauguin"];

    //Function to GET the gif for each painter using Giphy API and JSON. 

    function displayInfo() {
        var painter = $(this).attr("painter-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + painter + "&api_key=dc6zaTOxFJmzC&limit=10";

        //use AJAX to GET information on the button clicked

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            //empty gif-area  so that a new gif appends to the emtpy div.

            $("#gif-area").empty();
           
            var results = response.data;

            //loop through to grab the rating information and the gif.

            for (var i = 0; i < results.length; i++) {
                var painterDiv = $("<div class = paintClass>");

                //create variable for rating 

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                //create variables for still url and animated url

                var urlStill = results[i].images.fixed_height_still.url;
                var urlAnimated = results[i].images.fixed_height.url;

                
                //create a variable for the gif with src attribute and other attributes to store the still and animated gifs.

                var gif = $("<img>");
                gif.addClass("rounded-circle").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlAnimated).attr("data-state", "still");

                //append the gif and rating to the new div created during for loop

                painterDiv.append(gif);
                painterDiv.append(pRate);

                //append all for loop created divs to the DOM

                $("#gif-area").append(painterDiv);
            }

            //on click of gif still image, gif will play. When clicked again, gif will pause.

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    //create buttons out of array indexes - gets information from JSON

    function renderButtons() {

        //delete the previous array of buttons everytime renders so that they don't duplicate

        $("#paintertName-area").empty();

        //loop through array

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");

            //add class and attribute of name so display function knows what to GET.

            a.addClass("painter");
            a.attr("painter-name", topics[i]);
            a.text(topics[i]);
            $("#paintertName-area").append(a);
        }
    }

    //on click event to add an additional sport button when submitted - push input to array.

    $("#add-painter").on("click", function(event) {
        event.preventDefault();
        var painter = $("#painter-input").val().trim();

        //push user input to the original topics array and then execute renderButtons to display newly added button.
        topics.push(painter);
        $("#painter-input").val(" ");
        renderButtons();
    });


    //on click entire document to cover all elements named "painter" and run display function
    $(document).on("click", ".painter", displayInfo);

    //run function renderButtons to display all buttons on startup
    renderButtons();

});