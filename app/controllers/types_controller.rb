class TypesController < ApplicationController
  skip_before_filter :verify_authenticity_token 
  
  # GET /blog_posts
  # GET /blog_posts.json
  def index
    if params[:parent__isnull].present? || params[:parent].present?
      @objects = Type
      @objects = @objects.where("parent IS NULL") if params[:parent__isnull].present?
      @objects = @objects.where(:parent => params[:parent]) if params[:parent].present?
    else 
      @objects = Type.all
    end
    render json: @objects 
  end

  # GET /blog_posts/1
  # GET /blog_posts/1.json
  def show
  end

  # POST /blog_posts
  # POST /blog_posts.json
  def create
    @object = Type.new(object_params)
    @object.save
    render json: @object
  end

  # PATCH/PUT /blog_posts/1
  # PATCH/PUT /blog_posts/1.json
  def update
    @object = Type.find(params[:id])
    @object.update(object_params)
    render json: @object 
  end

  # DELETE /blog_posts/1
  # DELETE /blog_posts/1.json
  def destroy
    @object = Type.find(params[:id])
    @object.destroy
    render json: "Success"
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def object_params
      params.require(:type).permit(:name, :parent)
    end
end
