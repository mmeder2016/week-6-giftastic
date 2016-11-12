$(document).ready(function() {

    // Initialize an array of strings related to a theme
    var theme = "animal";
    var topics = ["woodchuck", "heron", "snapping turtle", "raccoon", "opposom", "elk", "moose", "cougar", "squirrel"];
    var returnedGifs;
    init();

    // $("*").on("click", function() {
    //     // Get the subtype from the textbox
    //     var subtype = $('#textbox-animal').val().trim();
    //     return false;
    // });

    function init() {
        // Set the them and the subtypes
        $('#p-add-animal').text('Add new ' + theme);
        renderButtons();
    }

    // Creates and appends new button in the ".div-buttons" div
    function renderButtons(subtype) {
        $('.div-buttons').empty();
        for (var topic of topics) {
            var newButton = $('<button>');
            newButton.attr('data-subtype', topic);
            newButton.addClass('dynamic-buttons btn btn-primary');
            // newButton.addClass('btn btn-primary"');
            newButton.append(topic);
            // Make the button visible
            $('.div-buttons').append(newButton);
        }
    }

    $("#button-add-animal").on("click", function() {
        // Get the subtype from the textbox
        var subtype = $('#textbox-animal').val().trim();
        if (subtype.length !== 0) {
            topics.push(subtype);
        }
        // Reset the text in the text input to empty
        $("#textbox-animal").val("");
        renderButtons();
        // Do not refresh page
        return false;
    });

    $(document).on("click", ".dynamic-buttons", function() {
        // Clear the div of previous gifs
        $('.div-left-gifs').empty();

        var subtype = ($(this).data('subtype'));
        console.log(".dynamic-buttons clicked " + subtype);
        // Add giffy code here
        var p = $(this).data('subtype');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
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

                gifDiv.append(p);
                gifDiv.append(animalImage);

                $('.div-left-gifs').prepend(gifDiv);
            }
        });

        return false;
    });


    $(".div-left-gifs").on("click", "img", function() {
        var index = $(this).attr('idx');
        var an = $(this).attr('animated');
        console.log(typeof(an));

        // 0 - not animated 1 - animated
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