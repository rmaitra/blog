class ChangeContentInBlogToText < ActiveRecord::Migration
  def change
    change_column :blog_posts, :content, :text
  end
end
