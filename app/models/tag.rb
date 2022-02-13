class Tag < ApplicationRecord
    has_many :link_tags
    belongs_to :user
end
