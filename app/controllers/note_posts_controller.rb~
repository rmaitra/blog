class NotePostsController < ApplicationController
  before_action :set_note_post, only: [:show, :edit, :update, :destroy]

  # GET /note_posts
  # GET /note_posts.json
  def index
    @note_posts = NotePost.all
  end

  # GET /note_posts/1
  # GET /note_posts/1.json
  def show
  end

  # GET /note_posts/new
  def new
    @note_post = NotePost.new
  end

  # GET /note_posts/1/edit
  def edit
  end

  # POST /note_posts
  # POST /note_posts.json
  def create
    @note_post = NotePost.new(note_post_params)

    respond_to do |format|
      if @note_post.save
        format.html { redirect_to @note_post, notice: 'Note post was successfully created.' }
        format.json { render action: 'show', status: :created, location: @note_post }
      else
        format.html { render action: 'new' }
        format.json { render json: @note_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /note_posts/1
  # PATCH/PUT /note_posts/1.json
  def update
    respond_to do |format|
      if @note_post.update(note_post_params)
        format.html { redirect_to @note_post, notice: 'Note post was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @note_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /note_posts/1
  # DELETE /note_posts/1.json
  def destroy
    @note_post.destroy
    respond_to do |format|
      format.html { redirect_to note_posts_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_note_post
      @note_post = NotePost.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def note_post_params
      params.require(:note_post).permit(:title, :content)
    end
end
