# coding: utf-8
class Admin::ApplicationController < ActionController::Base
  layout "admin"
  protect_from_forgery
  before_filter :authorize, :except =>:login

  protected
  def authorize
    session[:original_uri] = request.request_uri

    return redirect_to :controller => 'admin/accounts', :action => 'login' if session[:user_id].nil?
    unless User.find(session[:user_id])
      flash[:notice] = "Please log in"
      redirect_to :controller => 'admin/accounts', :action => 'login'
    end
  end
end