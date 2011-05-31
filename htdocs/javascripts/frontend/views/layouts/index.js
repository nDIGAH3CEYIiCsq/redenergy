Home.Index = {
	init: function() {
		$(function() {
			$("#contact_btn").click(function() {
				var contact = $("#contact_btn span");
				if (contact.text() == 'Контакт') {
					$("#contacts").animate({ marginTop:"0px"}, 500);
					contact.text('x Закрыть')
				}
				else {
					$("#contacts").animate({ marginTop:"-370px"}, 500);
					contact.text('Контакт');
				}
				return false;
			});

			$('#feedback').click(function() {
				var contact = $("#contact_btn span");
				if (contact.text() == 'Контакт') {
					$('#contact_btn').click();
				}
				$('#later_email').focus();

				return false;
			});

			$('#send_btn').click(function() {

				var email = $('#later_email').val();
				var name = $('#later_name').val();
				var message = $('#later_message').val();
				if (message == "") {
					$("#contact_form_message").text("Сообщение должно быть заполнено")
				}
				else {
					$.post("/orders/contact", 'email=' + email + ';name=' + name + ';message=' + message + '', function() {
					}, 'xml');

					alert('Cообщение отправлено');
					$("#contact_btn").click();
				}
				return false;
			});
		});
	}
};