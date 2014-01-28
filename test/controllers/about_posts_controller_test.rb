require 'test_helper'

class AboutPostsControllerTest < ActionController::TestCase
  setup do
    @about_post = about_posts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:about_posts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create about_post" do
    assert_difference('AboutPost.count') do
      post :create, about_post: { content: @about_post.content, title: @about_post.title }
    end

    assert_redirected_to about_post_path(assigns(:about_post))
  end

  test "should show about_post" do
    get :show, id: @about_post
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @about_post
    assert_response :success
  end

  test "should update about_post" do
    patch :update, id: @about_post, about_post: { content: @about_post.content, title: @about_post.title }
    assert_redirected_to about_post_path(assigns(:about_post))
  end

  test "should destroy about_post" do
    assert_difference('AboutPost.count', -1) do
      delete :destroy, id: @about_post
    end

    assert_redirected_to about_posts_path
  end
end
