$(document).ready(function() {
    function updateTotal($row) {
        var priceText = $row.find('.title').text();
        var price = parseFloat(priceText.replace(/[^\d]/g, ''));
        var quantity = parseInt($row.find('.qty__input').val()) || 0;
        var total = price * quantity;
        $row.find('.total').text(total + ' грн.');
    }

    function calculateTotalSum() {
        var totalSum = 0;
        $('li.row').each(function() {
            var priceText = $(this).find('.title').text();
            var price = parseFloat(priceText.replace(/[^\d]/g, ''));
            var quantity = parseInt($(this).find('.qty__input').val()) || 0;
            totalSum += price * quantity;
        });
        $('.total-sum span').text(totalSum + ' грн.');
    }

    function clearInputs() {
        $('li.row').each(function() {
            $(this).find('.qty__input').val(0);
            $(this).find('.total').text('0 грн.');
        });
        $('.total-sum span').text('0 грн.');
    }

    $('.qty__plus').click(function() {
        var $input = $(this).siblings('.qty__input');
        var value = parseInt($input.val()) || 0;
        var max = parseInt($input.attr('max'));
        
        if (value < max) {
            $input.val(value + 1).trigger('change');
        }
    });

    $('.qty__minus').click(function() {
        var $input = $(this).siblings('.qty__input');
        var value = parseInt($input.val()) || 0;
        var min = parseInt($input.attr('min'));
        
        if (value > min) {
            $input.val(value - 1).trigger('change');
        }
    });

    $('.qty__input').change(function() {
        var $input = $(this);
        var value = parseInt($input.val()) || 0;
        var min = parseInt($input.attr('min'));
        var max = parseInt($input.attr('max'));
        var $row = $input.closest('li.row');

        if (value < min) {
            $input.val(min);
        } else if (value > max) {
            $input.val(max);
        }

        updateTotal($row);
        calculateTotalSum();
    });

    $('.clear').click(function() {
        clearInputs();
    });

    $('.count-total-sum').click(function() {
        calculateTotalSum();
    });

    // Initial calculation of the total sum
    calculateTotalSum();
});
