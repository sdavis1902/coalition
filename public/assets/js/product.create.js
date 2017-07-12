var ProductCreate = (function(){
    'use strict';

    var _table;

    function _eventListeners(){
        $('#form-submit').click(function(e){
            e.preventDefault();
            _submitForm();
        });

        _table = $('#datatables-products').DataTable({
            responsive: true,
            order: [[3, "desc"]]
        });
    }

    function _submitForm(){
        // submit the form via ajax
        var product_name = $('#product').val();
        var quantity = $('#quantity').val();
        var price = $('#price').val();

        $.post( "/product/create", $('#product-form').serialize(), function( data ){
            if( data.status == 'success' ){
                // add to list
                _table.row.add([
                    data.product.name,
                    data.product.quantity,
                    data.product.price,
                    data.product.created_at,
                    data.product.total_price
                ]).draw(false);
            }else{
                bootbox.alert('There was an error');
            }
        });
    }

    function init(){
        _eventListeners();
    }

    return {
        init: init
    };
})();
jQuery( ProductCreate.init() );
