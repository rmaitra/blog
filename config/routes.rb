Rails.application.routes.draw do

  scope '/api' do
    scope '/v1' do
      resources :posts
      resources :sessions
    end
  end
  root 'static_pages#home'
  get '*path' => 'static_pages#home'
  
end
