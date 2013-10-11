require 'test_helper'

class BlogPostControllerTest < ActionController::TestCase
  test "should get title:string" do
    get :title:string
    assert_response :success
  end

  test "should get content:string" do
    get :content:string
    assert_response :success
  end

end
