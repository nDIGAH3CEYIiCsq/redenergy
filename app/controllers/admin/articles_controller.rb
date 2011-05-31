# coding: utf-8
class Admin::ArticlesController < Admin::ApplicationController
  def index
    user = User.first
    puts "df"*34
    puts user.password
    puts "df"*34
    @articles = Article.all
  end

  def edit
    id = params[:id]
    @article = Article.get_by_id(id)

  end

  def destroy
    id = params[:id]
    Article.delete(id)
    redirect_to :action => :index
  end

  def new
    @article = Article.new
  end

  def update
    @article = Article.find(params[:id])

    respond_to do |format|
      if @article.update_attributes(params[:article])
        format.html { redirect_to :action=> 'index', :notice => 'Article was successfully updated.' }
        format.xml { head :ok }
      else
        format.html { render :action => 'edit' }
        format.xml { render :xml => @article.errors, :status => :unprocessable_entity }
      end
    end

  end

  def create
    @article = Article.new(params[:article])
    respond_to do |format|
      if @article.save(params[:article])

        format.html { redirect_to :action=> 'index', :notice => 'Article was successfully created.' }
        format.xml { head :ok }
      else
        format.html { render :action => 'new' }
        format.xml { render :xml => @article.errors, :status => :unprocessable_entity }
      end
    end
  end
end