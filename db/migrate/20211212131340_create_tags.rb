class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.integer :user_id
      t.string :name
      t.string :color
      t.timestamps
    end
  end
end
