class AddTypeId < ActiveRecord::Migration
  def change
    add_column :posts, :type_id, :integer

    create_table :types do |t|
      t.string :name

      t.timestamps
    end
  end
end
