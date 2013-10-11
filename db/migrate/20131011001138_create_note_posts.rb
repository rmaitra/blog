class CreateNotePosts < ActiveRecord::Migration
  def change
    create_table :note_posts do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
