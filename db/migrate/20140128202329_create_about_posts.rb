class CreateAboutPosts < ActiveRecord::Migration
  def change
    create_table :about_posts do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
