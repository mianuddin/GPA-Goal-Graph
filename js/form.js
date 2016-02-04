// https://stackoverflow.com/questions/241145/jquery-validate-plugin-how-to-create-a-simple-custom-rule

var formModule = (function () {
    var my = {},
        sidebar = 0,
        debug = false,
        classCredits = 0,
        totalCredits = 0;

    function addClassCard() {
        var template = $('#class_card_template').html();
        var html = Mustache.to_html(template, { number: $('#classlist>li').length+1 });
        $('#classlist').append(html);
        if(sidebar) {
            $('#classlist li').removeClass('m6');
            $('.card .input-field').removeClass('s6');
            $('.card .input-field').addClass('s12');
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

    function computeClassCreditTotal() {
        var data = $('form').serializeArray().slice(5),
            total = 0;

        console.log(data);

        if (data.length) {
            for(var i=0; i<data.length; i+=2) {
                if(data[i].value !== null || parseFloat(data[i].value) !== 0)
                    total += parseInt(data[i].value, 10);
            }
        }

        my.classCredits = total;
        my.totalCredits = (my.classCredits+parseInt($('#current_credits').val(), 10));
        console.log( my.classCredits + ' ' + my.totalCredits);
    }

    function updateTargetCreditRule() {
        computeClassCreditTotal();
        $('#target_credits').rules('remove', 'min');
        $('#target_credits').rules('add', {
            min: my.totalCredits+1
        });
        console.log('== target credit rule updated to ' + (my.totalCredits+1) + ' ==');
    }

    function bindUIActions() {

        console.log('== bindUIActions() ==');

        $(document).on('click','a.add',function() {
            addClassCard();

            // Clone
            $('#class' + $('#classlist>li').length + '_units').val($('#class' + $(this).closest('li').index() + '_units').val());
            if($('#class' + $('#classlist>li').length + '_units').val() !== '') $('#class' + $('#classlist>li').length + '_units').next().addClass('active');
            $('#class' + $('#classlist>li').length + '_gpa').val($('#class' + $(this).closest('li').index() + '_gpa').val());
            if($('#class' + $('#classlist>li').length + '_gpa').val() !== '') $('#class' + $('#classlist>li').length + '_gpa').next().addClass('active');

            updateTargetCreditRule();

            $('#classlist li').last().velocity( { translateX: '-100px'}, { duration: 0 });
            $('#classlist li').last().velocity( { opacity: '1', translateX: '0'}, { duration: 800, delay: 0, easing: [60, 10] });
        });

        $(document).on('click','a.remove',function() {
            $(this).closest('li').remove();
            renameClassCards();
            Materialize.showStaggeredList('#classlist');
        });

        $(document).on('change', '.card input', function() {
            updateTargetCreditRule();
        });

        $(document).on('change', '#current_credits', function() {
            updateTargetCreditRule();
        });

        $('#current_semester_checkbox').change(function() {
            if(this.checked) {
                $('#classes').removeClass('hidden');
                if($('#classlist > li').length === 0) { addClassCard(); }
                Materialize.showStaggeredList('#classlist');
            } else {
                $('#classlist > li').remove();
            }
        });

        var validateOptions = {
            submitHandler: function(form) {
                sidebar++;
                $('input').removeClass('invalid error');
                mathModule.passInput($('form').serializeArray().slice(0, -1), sidebar);
            },
            invalidHandler: function(event, validator) {
                event.preventDefault();
                Materialize.toast('Check your inputs!', 4000);
            },
            errorPlacement: function(error, element) {
                element.removeClass('valid');
                element.addClass('invalid error');
                element.next('label').addClass('active');
                document.styleSheets[0].addRule('#' + element[0].id +'.invalid + label:after','content: "' + error[0].innerText + '";');
                console.log(element);
            },
            validClass: 'valid',
            rules: {
                target_credits: {
                    min: 0
                }
            }
        };

        $('form').validate(validateOptions);

        // $(document).on("submit", "form", function(event){
        //     event.preventDefault();
        //     $('form').validate(validateOptions);
        //     return  false;
        // });

    }
    
    my.init = function () {
        console.log('== formModule initated ==');
        bindUIActions();
    };

    return my;
})();