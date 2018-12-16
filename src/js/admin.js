//Add a show
$('form.add .submit-show').click(() => {
    event.preventDefault();

    //capture form values
    const location = $('form.active #show-location').val().trim();
    const date = $('form.active #show-date').val().trim();
    const link = $('form.active #show-link').val().trim();

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

//Delete a show
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

//Prepare edit a show
$('.toolbar .button.edit').click( function() {
    event.preventDefault();

    const currentShow = {
        id:  $(this).data('id'),
        location: $(this).data('location'),
        date: $(this).data('date'),
        link: $(this).data('link')
    }

    console.log(currentShow);

    $('form.update .submit-show').attr('data-id', currentShow.id);
    $('#edit-modal .modal-content .location').html(currentShow.location);
    $('#edit-modal .modal-content .date').html(currentShow.date);
    $('#edit-modal .modal-content .link').html(currentShow.link);

    $('#edit-modal').show();
});

//Submit edited show
$('form.update .submit-show').click( function() {
    event.preventDefault();

    //capture form values
    const id = $(this).data('id');
    const location = $('form.update #show-location').val().trim();
    const date = $('form.update #show-date').val().trim();
    const link = $('form.update #show-link').val().trim();

    const newShowDetails = {
        id,
        location,
        date,
        link
    };

    $.post("/updateshow", newShowDetails)
    .done(function(data) {

        if (data === true) {
            window.location.reload();
            alert("Show Successfully Updated!");
        } else {
            alert("There Was An Error Updating Your Show!")
        };

    });
});

//close modal
$('.modal .close').click(() => {
    $('.modal').hide();
});