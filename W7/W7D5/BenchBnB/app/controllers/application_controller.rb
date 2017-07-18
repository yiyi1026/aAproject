class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :required_logged_in, :logged_in?

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
    user.reset_session_token
    session[:session_token] = user.session_token
    @current_user = user  #why @current_user = user is below session_token code???
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

  def required_logged_in  # what is this????
    render json: {base: ['invalid credentials']}, status: 401 unless current_user
  end

end
