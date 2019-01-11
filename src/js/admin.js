//Prepare edit a show
$('.toolbar .button.edit').click( function() {
    event.preventDefault();

    const currentShow = {
        id:  $(this).data('id'),
        location: $(this).data('location'),
        date: $(this).data('date'),
        link: $(this).data('link')
    }
    
    $('form.update .submit-show').attr('data-id', currentShow.id);
    $('#edit-modal .modal-content .location').html(currentShow.location);
    $('#edit-modal .modal-content .date').html(currentShow.date);
    $('#edit-modal .modal-content .link').html(currentShow.link);

    //enter current show's details into appropriate inputs
    $('#edit-modal .modal-content #show-location').val(currentShow.location);
    $('#edit-modal .modal-content #show-date').val(new Date(currentShow.date).toISOString().split('T')[0]);
    $('#edit-modal .modal-content #show-link').val(currentShow.link);

    $('#edit-modal').show();
});

//close modal
$('.modal .close').click(() => {
    $('.modal').hide();
});