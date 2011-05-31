# coding: utf-8
class Article < ActiveRecord::Base

  validates_presence_of :article_alias, :text, :meta_title, :meta_keywords, :meta_description, :title, :short_text, :category
#  INVERTERS =
#          [
#                  ["МАП 'Энергия' 0.6/0.9-48", "МАП 'Энергия' 0.6/0.9-48"],
#                  ["МАП 'Энергия' 1.0/1.5-48", "МАП 'Энергия' 0.6/0.9-48"],
#          ]

  WIND_GENERATORS = [
          ["КЭ-ВГР-850ЖК", "КЭ-ВГР-850ЖК"]
  ]

  def self.get_technologies
    get_by_alias('technologies')
  end

  def self.get_services()
    get_by_alias('services')
  end

  def self.get_by_alias(article_alias)
    result = self.where(:article_alias => article_alias)
    result.nil? ? result : result[0]
  end

  def self.get_by_id(id)
    result = self.where(:id => id)
    result.nil? ? result : result[0]
  end

  def self.get_main_page
    get_by_alias('main_page')
  end
end
