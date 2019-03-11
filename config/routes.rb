Rails.application.routes.draw do
  post "/login"        => "sessions#create"
  delete "/logout"     => "sessions#destroy"
  resources :users
  get "/profile"       => "users#profile"
  resources :uploads
  post "/uploads/request_link"   => "uploads#request_link"
end
