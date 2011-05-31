# coding: utf-8
class ArticlesController < ApplicationController
  def show
    article_alias = params['alias']
    puts "res"*34
    @article = Article.get_by_alias(article_alias)
    puts article_alias
    puts @article
  end

  def add
    Article.all.each { |item| item.destroy }
    service_articel =  Article.create(:article_alias => 'services',
                                      :text => "text text",
                                      :meta_title => 'sdfasdf asd',
                                      :meta_keywords => 'asdfsadf',
                                      :meta_description => 'description adf',
                                      :title => 'adf sdf',
                                      :short_text => 'short_text',
                                      :category => 'category')
  end

end