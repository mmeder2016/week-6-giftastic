$(document).ready(function() {

    // Initialize an array of strings (topics) related to a theme
    var theme = "animal";
    var topics = ["woodchuck", "heron", "snapping turtle", "raccoon", "opposom", "elk", "moose", "cougar", "squirrel"];
    // An array to hold the gifs returned from giphy
    var returnedGifs;

    // Initialize page with buttons from the topics array
    init();

    function init() {
        // Set the them and the subtypes
        $('#p-add-animal').text('Add new ' + theme);
        renderButtons();
    }

    // Creates and appends new buttons in the ".div-buttons" div from the topics array
    function renderButtons(subtype) {
        $('.div-buttons').empty();
        for (var topic of topics) {
            var newButton = $('<button>');
            newButton.attr('data-subtype', topic);
            newButton.addClass('dynamic-buttons btn btn-primary');
            newButton.append(topic);
            // Make the button visible in the div
            $('.div-buttons').append(newButton);
        }
    }

    // Handles th button for the user to add a new button to the topics
    $("#button-add-animal").on("click", function() {
        // Get the subtype from the textbox
        var subtype = $('#textbox-animal').val().trim();
        if (subtype.length !== 0) {
            topics.push(subtype);
        }
        // Reset the text in the text input to empty
        $("#textbox-animal").val("");
        // Make buttons from the data in the topics array
        renderButtons();
        // Do not refresh page
        return false;
    });

    // When the user clicks on one of the topics buttons, get the gifs and 
    // append them to the .div-left-gifs div
    $(document).on("click", ".dynamic-buttons", function() {
        // Clear the div of previous gifs
        $('.div-left-gifs').empty();

        // Get the name of the animal from the attribute subtype
        var subtype = ($(this).data('subtype'));
        console.log(".dynamic-buttons clicked " + subtype);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subtype + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Get the gifs and append them to the .div-left-gifs div
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            returnedGifs = response.data;
            console.log(response);
            console.log(returnedGifs);

            for (var i = 0; i < returnedGifs.length; i++) {
                var gifDiv = $('<div class="item">');

                var rating = returnedGifs[i].rating;

                var p = $('<h5>').text("Rating: " + rating);

                var animalImage = $('<img>');
                animalImage.attr('src', returnedGifs[i].images.fixed_height_still.url);
                animalImage.attr('idx', i);
                // 0 - not animated 1 - animated
                animalImage.attr('animated', false);
                animalImage.attr('float', 'left');

                gifDiv.append(p);
                gifDiv.append(animalImage);

                $('.div-left-gifs').append(gifDiv);
            }
        });

        return false;
    });

    // When the user clicks on the still gif, animate it, or, if it is already, 
    // animated, stop the animation
    $(".div-left-gifs").on("click", "img", function() {
        var index = $(this).attr('idx');
        // an - animated
        var an = $(this).attr('animated');
        console.log(typeof(an));

        // false - not animated true - animated
        if (an === 'false') {
            $(this).attr('src', returnedGifs[index].images.fixed_height.url);
            $(this).attr('animated', true);
        } else {
            $(this).attr('src', returnedGifs[index].images.fixed_height_still.url);
            $(this).attr('animated', false);
        }

        return false;
    });

});