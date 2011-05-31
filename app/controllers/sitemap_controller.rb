class SitemapController < ActionController::Base
  def index
    headers["Content-Type"] = "text/xml"    
  end
end