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
            alert("Show Successfully Created!");
        } else {
            alert("There Was An Error Creating Your Show!")
        };

    });
});
