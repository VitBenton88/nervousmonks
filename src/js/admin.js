$('.submit-show').click(() => {
    event.preventDefault();

    const location = $('#show-location').val().trim();
    const date = $('#show-date').val().trim();
    const link = $('#show-link').val().trim();

    let newShow = {
        location,
        date,
        link
    };

    $.post("/show", newShow)
    .done(function(data) {

        if (data === true) {
            window.location.reload();
            alert("Show Successfully Created!");
        } else {
            alert("There Was An Error Creating Your Show!")
        };

    });
});

$('.toolbar .button.delete').click( function() {
    event.preventDefault();

    const showId = $(this).data('id');
    const RESTobj = {showId}

    $.post("/deleteshow", RESTobj)
    .done(function(data) {

        if (data === true) {
            window.location.reload();
        } else {
            alert("There Was An Error Creating Your Show!")
        };

    });
});