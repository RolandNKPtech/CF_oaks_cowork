$('.file-holder .input-file:file').on('change', function () {
    let file = this.files[0];
    $(this).closest(".file-holder").find('.file-name').html(file.name);
});