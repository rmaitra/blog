Rails.application.routes.draw do

  scope '/api' do
    scope '/v1' do
      resources :posts
      resources :sessions
      resources :types
    end
  end
  root 'static_pages#home'
  get '*path' => 'static_pages#home'
  
end
