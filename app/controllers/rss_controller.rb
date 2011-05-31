class RssController < ActionController::Base
 def solutions
   headers["Content-Type"] = "text/xml"
 end

 def catalog
   headers["Content-Type"] = "text/xml"
 end
end