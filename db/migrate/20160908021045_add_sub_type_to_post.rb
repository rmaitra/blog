class AddSubTypeToPost < ActiveRecord::Migration
  def change
    add_column :posts, :sub_type_id, :integer
  end
end
