# coding: utf-8
module ApplicationHelper

	def application_javascript
		if Rails.env.development?
			javascript_include_tag(self.collect_javascript_files("frontend/*.js")) +
			javascript_include_tag("jquery.rails") +
			javascript_include_tag(self.collect_javascript_files("frontend/views/**/*.js"))
    else
			javascript_include_tag("http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js") +
			javascript_include_tag("jquery.rails",  "frontend/site", self.collect_javascript_files("frontend/views/**/*.js"), :cache => true)
		end
	end

	def application_stylesheets
		stylesheet_link_tag "screen", :cache => "all"
	end

	def collect_javascript_files(path)
		Dir[config.javascripts_dir + File::SEPARATOR + path].map { |s| s.sub(config.assets_dir, "") }
	end

end
