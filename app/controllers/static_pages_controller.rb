class StaticPagesController < ApplicationController
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
  def contact
  end
end
