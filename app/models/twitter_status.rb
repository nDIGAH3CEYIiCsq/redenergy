# coding: utf-8
class TwitterStatus
  include HTTParty
  base_uri  "api.twitter.com/1/"
  format  :xml
  def self.get_last_statuses()
    tweets = get("/statuses/user_timeline.xml/?screen_name=the_redenergy&count=10")
    statuses = tweets['statuses'] if !tweets.nil?
  end
end