# coding: utf-8
class Admin::AccountsController < Admin::ApplicationController
  layout "admin"
  def login
    session[:user_id] = nil
    if request.post?
      input_user = params[:user]
      user = User::get_user(input_user[:e_mail], input_user[:password])
      if user
        session[:user_id] = user.id
        uri = session[:original_uri]
        session[:original_uri] = nil
        redirect_to(uri || {:action => :index, :controller=>'admin/products'})
      else
        flash.now[:notice] = "Invalid user/password combination"
      end
    end
  end

  def logout
    session[:user_id] = nil
    flash[:notice] = "Logged out"
    redirect_to :action => 'login'
  end

  def add
    User.create(:name => "oksana", :email => "utyasheva.oksana@gmail.com", :password => "123456")
  end
end