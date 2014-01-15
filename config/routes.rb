Therajm::Application.routes.draw do
  resources :portfolio_posts
  resources :note_posts
  resources :blog_posts

  get "static_pages/home"
  get "static_pages/blog"
  get "static_pages/portfolio"
  get "static_pages/notes"
  get "static_pages/contact"
  get "static_pages/admin"
  
  match '/home',  to: 'static_pages#home',            via: 'get'
  match '/contact',  to: 'static_pages#contact',            via: 'get'
  match '/blog',  to: 'static_pages#blog',            via: 'get'
  match '/portfolio',  to: 'static_pages#portfolio',            via: 'get'
  match '/notes',  to: 'static_pages#notes',            via: 'get'
  match '/admin',  to: 'static_pages#admin',            via: 'get'
  
  
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'static_pages#home'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
