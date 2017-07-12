var DeploymentView = (function(){
    'use strict';

	var deployment_id = $('#deployment-div').data('deployment-id');

	function _createEventListeners(){
		$('#deployment-logs').slimScroll({
			height: '600px',
			start: 'bottom'
		});
	}

	function _createEchoListeners(){
        if (typeof io !== 'undefined') {
            window.Echo.private('deployment.' + deployment_id).listen('DeploymentStatusChange', (e) => {
                var deployment_status = e.status;
                $('#deployment-status').html(deployment_status);

                $('#deployment-box').removeClass('box-info');
                $('#deployment-box').removeClass('box-success');
                $('#deployment-box').removeClass('box-danger');
                $('#deployment-box').removeClass('box-warning');
                if( deployment_status == 'Queued' ){
                    $('#deployment-box').addClass('box-info');
                }else if( deployment_status == 'Active' ){
                    $('#deployment-box').addClass('box-warning');
                }else if( deployment_status == 'Failed' ){
                    $('#deployment-box').addClass('box-danger');
                }else if( deployment_status == 'Complete' ){
                    $('#deployment-box').addClass('box-success');
                }
            });

            window.Echo.private('deployment.' + deployment_id).listen('DeploymentLogsAdded', (e) => {
                $('#deployment-logs').append(e.message);
                $('#deployment-logs').slimScroll({ scrollTo: '5000000px' });
            });
        }
	}

	function init(){
        _createEventListeners();
		_createEchoListeners();
    }

    return {
        init: init
    };
})();
jQuery( DeploymentView.init() );
