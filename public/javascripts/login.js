$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
$(document).ready(function() {
	$('#submit').click(function(){
		var $emailId = $('#emailId');
		var $password = $('#password');
		if(!$emailId.val() || !$password.val()){
			return toast('Fill details');
		}

		$.post('/users/login',{
			emailId: $emailId.val(),
			password: $password.val()
		}, function(data){
			if(data.success)
				location.href = '/dashboard';
			else 
				return toast(data.message)
		})
	})

	function toast(message){
		$('#toaster').addClass('alert alert-warning');
		$('#toaster').html(message);
		setTimeout(()=>{
			$('#toaster').removeClass('alert alert-warning');
			$('#toaster').html('');
		}, 4000)
	}
}); 
