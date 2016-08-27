class StaticPagesController < ApplicationController
  #before_filter :authenticate, :except => [:home]
  def home
  end
end
