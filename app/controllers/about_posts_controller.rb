class AboutPostsController < ApplicationController
  before_action :set_about_post, only: [:show, :edit, :update, :destroy]

  # GET /about_posts
  # GET /about_posts.json
  def index
    @about_posts = AboutPost.all
  end

  # GET /about_posts/1
  # GET /about_posts/1.json
  def show
  end

  # GET /about_posts/new
  def new
    @about_post = AboutPost.new
  end

  # GET /about_posts/1/edit
  def edit
  end

  # POST /about_posts
  # POST /about_posts.json
  def create
    @about_post = AboutPost.new(about_post_params)

    respond_to do |format|
      if @about_post.save
        format.html { redirect_to @about_post, notice: 'About post was successfully created.' }
        format.json { render action: 'show', status: :created, location: @about_post }
      else
        format.html { render action: 'new' }
        format.json { render json: @about_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /about_posts/1
  # PATCH/PUT /about_posts/1.json
  def update
    respond_to do |format|
      if @about_post.update(about_post_params)
        format.html { redirect_to @about_post, notice: 'About post was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @about_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /about_posts/1
  # DELETE /about_posts/1.json
  def destroy
    @about_post.destroy
    respond_to do |format|
      format.html { redirect_to about_posts_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_about_post
      @about_post = AboutPost.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def about_post_params
      params.require(:about_post).permit(:title, :content)
    end
end
