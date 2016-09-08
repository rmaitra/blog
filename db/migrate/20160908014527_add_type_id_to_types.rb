class AddTypeIdToTypes < ActiveRecord::Migration
  def change
    add_column :types, :parent, :integer
  end
end
