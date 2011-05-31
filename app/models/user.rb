# coding: utf-8
class User < ActiveRecord::Base
  def self.get_user(email, password)
    result = self.where(:email => email).where(:password => password)
    result.nil? ? result : result[0]
  end
end
