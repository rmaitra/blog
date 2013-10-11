class PortfolioPostsController < ApplicationController
  before_action :set_portfolio_post, only: [:show, :edit, :update, :destroy]

  # GET /portfolio_posts
  # GET /portfolio_posts.json
  def index
    @portfolio_posts = PortfolioPost.all
  end

  # GET /portfolio_posts/1
  # GET /portfolio_posts/1.json
  def show
  end

  # GET /portfolio_posts/new
  def new
    @portfolio_post = PortfolioPost.new
  end

  # GET /portfolio_posts/1/edit
  def edit
  end

  # POST /portfolio_posts
  # POST /portfolio_posts.json
  def create
    @portfolio_post = PortfolioPost.new(portfolio_post_params)

    respond_to do |format|
      if @portfolio_post.save
        format.html { redirect_to @portfolio_post, notice: 'Portfolio post was successfully created.' }
        format.json { render action: 'show', status: :created, location: @portfolio_post }
      else
        format.html { render action: 'new' }
        format.json { render json: @portfolio_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /portfolio_posts/1
  # PATCH/PUT /portfolio_posts/1.json
  def update
    respond_to do |format|
      if @portfolio_post.update(portfolio_post_params)
        format.html { redirect_to @portfolio_post, notice: 'Portfolio post was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @portfolio_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /portfolio_posts/1
  # DELETE /portfolio_posts/1.json
  def destroy
    @portfolio_post.destroy
    respond_to do |format|
      format.html { redirect_to portfolio_posts_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_portfolio_post
      @portfolio_post = PortfolioPost.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def portfolio_post_params
      params.require(:portfolio_post).permit(:title, :content)
    end
end
