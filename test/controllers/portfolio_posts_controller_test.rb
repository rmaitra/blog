require 'test_helper'

class PortfolioPostsControllerTest < ActionController::TestCase
  setup do
    @portfolio_post = portfolio_posts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:portfolio_posts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create portfolio_post" do
    assert_difference('PortfolioPost.count') do
      post :create, portfolio_post: { content: @portfolio_post.content, title: @portfolio_post.title }
    end

    assert_redirected_to portfolio_post_path(assigns(:portfolio_post))
  end

  test "should show portfolio_post" do
    get :show, id: @portfolio_post
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @portfolio_post
    assert_response :success
  end

  test "should update portfolio_post" do
    patch :update, id: @portfolio_post, portfolio_post: { content: @portfolio_post.content, title: @portfolio_post.title }
    assert_redirected_to portfolio_post_path(assigns(:portfolio_post))
  end

  test "should destroy portfolio_post" do
    assert_difference('PortfolioPost.count', -1) do
      delete :destroy, id: @portfolio_post
    end

    assert_redirected_to portfolio_posts_path
  end
end
