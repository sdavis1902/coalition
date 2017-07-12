var TaskView = (function(){
    'use strict';

    var _form = $('#comment-form');
    var _task_id = $('#task-id').val();

	function _createEventListeners(){
		$('#chat-box').slimScroll({
			height: '250px'
		});

        $('#submit-form').click(function(e){
            e.preventDefault();
            _submitForm();
        });
	}

    function _submitForm(){
        $.post( "/task/view/" + _task_id, _form.serialize(), function( data ){
            if(data.status == 'success'){
                $('#task-comment').val('');
            }else{
                toastr.error(data.message);
            }
        });
    }

	function _addNewEchoComment(){
        if (typeof io !== 'undefined') {
		    window.Echo.private('task.' + task_id).listen('TaskNewComment', (e) => {
                var comment_html = e.comment_html;
			    $('#chat-box').prepend(comment_html);
		    });
        }
	}

	function init(){
        _createEventListeners();
		_addNewEchoComment();
    }

    return {
        init: init
    };
})();
jQuery( TaskView.init() );
