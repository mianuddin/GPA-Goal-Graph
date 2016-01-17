function addClass(clone) {
    if(clone !== true) {
        var template = $('#class_card_template').html();
        var html = Mustache.to_html(template, { number: $('#classlist>li').length+1 });
        $('#classlist').append(html);
    }
}

function renameClassCards() {
    var place = 1;
    $('#classlist > li').each(function () {
        $('.card-title', this).text('Class ' + place);
        var iPlace = 1;
        $('input', this).each(function () {
            if(iPlace == 1) {
                $(this).prop('id', 'class' + place + '_units');
                $(this).prop('name', 'class' + place + '_units');
            }
            else{
                $(this).prop('id', 'class' + place + '_gpa');
                $(this).prop('name', 'class' + place + '_gpa');
            }
            iPlace++;
        });
        iPlace = 1;
        $('label', this).each(function () {
            if(iPlace == 1)
                $(this).prop('for', 'class' + place + '_units');
            else
                $(this).prop('for', 'class' + place + '_gpa');
            iPlace++;
        });
        place++;
    });
}

$(document).ready(function() {

    $(document).on('click','a.add',function() {
        addClass();
        Materialize.showStaggeredList('#classlist');
    });

    $(document).on('click','a.remove',function() {
        $(this).closest('li').remove();
        renameClassCards();
        Materialize.showStaggeredList('#classlist');
    });

    $(document).on('click','form button',function() {
        passInput($('form').serializeArray());
    });

    $('#current_semester_checkbox').change(function() {
        if(this.checked) {
            $('#classes').removeClass('hidden');
            if($('#classlist>li').length === 0) { addClass(); }
            Materialize.showStaggeredList('#classlist');

        } else {
            $('#classes').addClass('hidden');
        }
    });

}());