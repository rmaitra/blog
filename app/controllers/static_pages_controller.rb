class StaticPagesController < ApplicationController
  before_filter :authenticate, :except => [:home, :blog, :portfolio, :notes, :about, :contact]
  def home
  end
  def blog
    @posts = BlogPost.all
  end
  def portfolio
    @posts = PortfolioPost.all
  end
  def notes
    @posts = NotePost.all
  end
  def about
    @posts = AboutPost.all
  end
  def contact
  end
  def admin
    
  end
end
