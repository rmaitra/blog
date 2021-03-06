class PostsController < ApplicationController
  skip_before_filter :verify_authenticity_token 
  
  # GET /blog_posts
  # GET /blog_posts.json
  def index
    @objects = Post.order("created_at DESC").all
    render json: @objects 
  end

  # GET /blog_posts/1
  # GET /blog_posts/1.json
  def show
    @object = Post.find(params[:id])
    render json: @object
  end

  # POST /blog_posts
  # POST /blog_posts.json
  def create
    @post = Post.new(post_params)
    @post.save
    render json: @post
  end

  # PATCH/PUT /blog_posts/1
  # PATCH/PUT /blog_posts/1.json
  def update
    @post = Post.find(params[:id])
    @post.update(post_params)
    render json: @post 
  end

  # DELETE /blog_posts/1
  # DELETE /blog_posts/1.json
  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: "Success"
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :content, :type_id, :sub_type_id)
    end
end
