class Link < ApplicationRecord
     belongs_to :user
     has_many :link_tags
     
     validates :title, presence: true
     validates :url, presence: true
     
end
