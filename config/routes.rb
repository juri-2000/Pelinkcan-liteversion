Rails.application.routes.draw do
  get 'tags/create'
  root to: 'homes#toppage'
  devise_for :users
  resources :link_tags
  resources :tags
  resources :links
  resources :users
  post 'users/:id/edit' => 'users#update'
  post 'tags/first_create' => 'tags#first_create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
