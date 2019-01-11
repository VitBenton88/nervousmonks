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

    //enter current show's details into appropriate inputs' values and placeholders
    $('#edit-modal .modal-content input[name=_id]').val(currentShow.id);
    $('#edit-modal .modal-content input[name=location]').attr("placeholder", currentShow.location);
    $('#edit-modal .modal-content input[name=date]').val(new Date(currentShow.date).toISOString().split('T')[0]);
    $('#edit-modal .modal-content input[name=date]').attr("placeholder",new Date(currentShow.date).toISOString().split('T')[0]);
    $('#edit-modal .modal-content input[name=link]').attr("placeholder", currentShow.link);

    $('#edit-modal').show();
});

//close modal
$('.modal .close').click(() => {
    $('.modal').hide();
});