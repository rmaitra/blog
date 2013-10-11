require 'test_helper'

class NotePostsControllerTest < ActionController::TestCase
  setup do
    @note_post = note_posts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:note_posts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create note_post" do
    assert_difference('NotePost.count') do
      post :create, note_post: { content: @note_post.content, title: @note_post.title }
    end

    assert_redirected_to note_post_path(assigns(:note_post))
  end

  test "should show note_post" do
    get :show, id: @note_post
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @note_post
    assert_response :success
  end

  test "should update note_post" do
    patch :update, id: @note_post, note_post: { content: @note_post.content, title: @note_post.title }
    assert_redirected_to note_post_path(assigns(:note_post))
  end

  test "should destroy note_post" do
    assert_difference('NotePost.count', -1) do
      delete :destroy, id: @note_post
    end

    assert_redirected_to note_posts_path
  end
end
