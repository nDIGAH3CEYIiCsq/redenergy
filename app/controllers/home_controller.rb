# coding: utf-8
class HomeController < ApplicationController

	caches_action :index, :expires_in => 15.minutes

	def index
    @tweets = Array.new  
    puts "*"*34
    puts Rails.env
    
    #if Rails.env.production?
    #  statuses =  TwitterStatus.get_last_statuses
	#	  @tweets = statuses.map { |tweet| tweet['text'] }
#    else
#      @tweets = Array.new
#    end
		#@main_page_article = Article.get_main_page
	end

	def delivery

	end

	def guaranty

	end

end