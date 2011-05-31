# coding: utf-8
class OrdersController < ApplicationController
	def index

	end

	def contact
		email = params[:email]
		name = params[:name]
		message = params[:message]

		message_body = "<html><body><h2>Поддержка</h2>"
		message_body = message_body + "<table><tbody><tr><td>Имя:</td><td>"+name+"</td></tr>"
		message_body = message_body + "<tr><td>Email:</td><td>"+email+"</td></tr>"
		message_body = message_body + "<tr><td>Сообщение:</td><td>"+message+"</td></tr>"
		message_body = message_body + "</body></html>"

		mailer = OrderMailer.sent_support_message(message_body, email)
		mailer.content_type("text/html")
		mailer.deliver()

		mailer2 = OrderMailer.sent_to_me(message_body, email)
		mailer2.content_type("text/html")
		mailer2.deliver()
	end

	def create
		order = params[:order]
		email = order[:email]
		name = order[:name]
		telephone = order[:telephone]
		message = order[:message]

		message_body = "<html><body><h2>Заказ!</h2>"
		message_body = message_body + "<table><tbody><tr><td>Имя:</td><td>"+name+"</td></tr>"
		message_body = message_body + "<tr><td>Телефон:</td><td>"+telephone+"</td></tr>"
		message_body = message_body + "<tr><td>Email:</td><td>"+email+"</td></tr>"
		message_body = message_body + "<tr><td>Информация о заявке:</td><td>"+message+"</td></tr>"
		message_body = message_body + "</body></html>"

		puts "message_body"

		mailer = OrderMailer.sent_order_message(message_body, email)
		mailer.content_type("text/html")

		if (!email.blank? && !telephone.blank? && !message.blank?)
			redirect_to :action => :success_order
		else
			flash[:error_message]  = 'Не все поля заполнены'
			redirect_to :action => :index
		end
		mailer.deliver()

		mailer2 = OrderMailer.sent_to_me(message_body, email)
		mailer2.content_type("text/html")
		mailer2.deliver()
	end

	def success_order
	end
end