class OrderMailer < ActionMailer::Base
#  default :from => "from@example.com"

	# Subject can be set in your I18n file at config/locales/en.yml
	# with the following lookup:
	#
	#   en.order_mailer.confirm.subject
	#
#  def confirm
#    @greeting = "Hi"
#
#    mail :to => "utyasheva.oksana@gmail.com"
#  end

	# Subject can be set in your I18n file at config/locales/en.yml
	# with the following lookup:
	#
	#   en.order_mailer.sent.subject
	#
#  def sent
#    @greeting = "Hi"
#    mail :to => "utyasheva.oksana@gmail.com"
#  end
	def sent_to_me(message, from_email)
		subject 'Support notification'
		recipients "utyasheva.oksana@gmail.com"
		from from_email
		sent_on Time.now
		body message
	end

	def sent_support_message(message, from_email)
		subject 'Support notification'
		recipients "info@red-energy.ru"
		from from_email
		sent_on Time.now
		body message
	end

	def sent_order_message(message, from_email)
		subject 'Order notification'
		recipients "zakaz@red-energy.ru"
		from from_email
		sent_on Time.now
		body message
	end

end
