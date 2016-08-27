class SessionsController < ApplicationController
	# GET /todos
  skip_before_filter :verify_authenticity_token

  def show
    user = session[:user]
    if user == nil
        render json: {:message =>"Invalid Login"}.as_json
    else
        render json: user.as_json
    end
  end

  def create
      if authenticate(params["pass"])
          session[:user] = {:user => "rmaitra"}.as_json
          @session = session[:user]
          render json: @session.as_json
      else
          message = {:message =>"Invalid email or password"}
          render json: message.as_json, status: 400 
      end
  end

  def destroy
      session[:user] = nil
      message = {:message =>"Success!"}
      render json: message.as_json
  end

  private

  def authenticate(pass)
      if pass == "test"#ENV['ADMIN_PASS']
        return true
      else
        return false
      end
  end

end
