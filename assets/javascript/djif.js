// Create variables
// Create HTML to place onto page
$(document).ready(function () {
    //your code here

    var topics = ["ducks", "cats", "pikachu", "despacito", "RDR2", "Halo", "Star Wars"];

    function makeButton(str) {
        return `<button id="${str}" class="topic">${str}</button>`;
    }

    function renderTopics() {
        $("#topics").html(topics.map(makeButton));
    }

    // Add Topic Button
    $(document).on('click', '#add-topic', function () {
        event.preventDefault();
        var newTopic = $("#topic-input").val();
        $("#topics").append(`<button id="${newTopic}" class="topic">${newTopic}</button>`);
        $("#topic-input").val("");
    });
    //

    renderTopics();
    // AJAX Call here
    $(document).on('click', '.topic', function () {
        var query = $(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            query + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("#gifs");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");
                    // replace image with still image. Provide data-attr for still and animate image
                    gifImage.attr("class", "gif");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-state", "still");
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(gifImage);

                    // $("#gifs").prepend(gifDiv);
                }
            });
    });

    $(document).on("click", ".gif", function () {
        var state = $(this).data("state");
        console.log(state);
        if (state === "still") {
            $(this).data("state", "animate");
            $(this).attr("src", $(this).data("animate"));
        } else if (state === "animate") {
            $(this).data("state", "still");
            $(this).attr("src", $(this).data("still"));
        }
    });
});