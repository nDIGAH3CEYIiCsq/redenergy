Empty::Application.routes.draw do
	# The priority is based upon order of creation:
	# first created -> highest priority.

	# Sample of regular route:
	#   match 'products/:id' => 'catalog#view'
	# Keep in mind you can assign values other than :controller and :action

	# Sample of named route:
	#   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
	# This route can be invoked with purchase_url(:id => product.id)

	# Sample resource route (maps HTTP verbs to controller actions automatically):
	#   resources :products

	# Sample resource route with options:
	#   resources :products do
	#     member do
	#       get :short
	#       post :toggle
	#     end
	#
	#     collection do
	#       get :sold
	#     end
	#   end

	# Sample resource route with sub-resources:
	#   resources :products do
	#     resources :comments, :sales
	#     resource :seller
	#   end

	# Sample resource route with more complex sub-resources
	#   resources :products do
	#     resources :comments
	#     resources :sales do
	#       get :recent, :on => :collection
	#     end
	#   end

	# Sample resource route within a namespace:
	#   namespace :admin do
	#     # Directs /admin/products/* to Admin::ProductsController
	#     # (app/controllers/admin/products_controller.rb)
	#     resources :products
	#   end

	# You can have the root of your site routed with "root"
	# just remember to delete public/index.html.
	# root :to => "welcome#index"

	# See how all your routes lay out with "rake routes"

	# This is a legacy wild controller route that's not recommended for RESTful applications.
	# Note: This route will make all actions in every controller accessible via GET requests.
	# match ':controller(/:action(/:id(.:format)))'

	root :to => "home#index"

  match '/Sitemap.xml' => "sitemap#index"
  match '/rss-solutions.xml' => "rss#solutions"
  match '/rss-catalog.xml' => "rss#catalog"
  match '/sitemap.xml' => "sitemap#index"
	match "orders/new" => "orders#create", :via => :post

	match "delivery" => "home#delivery"
	match "guaranty" => "home#guaranty"

	match "email" => "email#index"

	#match "orders/create" => "orders#create"

	match "orders/contact" => "orders#contact"
	match "orders/success" => "orders#success_order"

	match "orders/new" => "orders#index"

	match "catalog/led-lighting" => "catalog#led_lighting"
	match "catalog/uninterruptible_power" => "catalog#uninterruptible_power"
	match "catalog/invertors" => "catalog#invertors"
	match "catalog/wind-turbins" => "catalog#wind_turbines"
  mathc "catalog/wind_generator" => "catalog#wind_generator"
	#match "catalog/batteries-hzy-6-gel" => "catalog#batteries_hzy_6_gel"
	#match "catalog/batteries-hzy-12-gel" => "catalog#batteries_hzy_12_gel"
#	match "catalog/batteries-hzy-2-gel" => "catalog#batteries_hzy_2_gel"
	match "catalog/batteries-hzb-6-12v" => "catalog#batteries_hzb_6_12v"
	match "catalog/batteries-hzb-fa-12v" => "catalog#batteries_hzb_fa_12v"
	match "catalog/batteries-hzs-4-6-12v" => "catalog#batteries_hzs_4_6_12v"
	match "catalog/batteries-hzb-2v" => "catalog#batteries_hzb_2v"
	match "catalog/batteries-hzy-6-12v" => "catalog#batteries_hzy_6_12v"
	match "catalog/batteries-hzy-fa-12v" => "catalog#batteries_hzy_fa_12v"
	match "catalog/batteries-hzy-12v" => "catalog#batteries_hzy_12v"
	match "catalog/batteries-traction" => "catalog#batteries_traction"
	match "catalog/self_power_gas" => "catalog#self_power_gas"
	match "catalog/self_power_gasoline" => "catalog#self_power_gasoline"
	match "catalog/solar-panels" => "catalog#solar_panels"
	match "catalog/optico-acust-ke-doa" => "catalog#optico_acust_ke_doa"
  match "catalog/led_lighting_ke_ccd_184" => "catalog#led_lighting_ke_ccd_184"
  match "catalog/led_lighting_ke_ccd_star" => "catalog#led_lighting_ke_ccd_star"
  match "catalog/led_lighting_ke_ccd_tl418_cl1_2400" => "catalog#led_lighting_ke_ccd_tl418_cl1_2400"

	match "catalog/:alias" => "articles#show"

	match "search" => "search#index"
	match "catalog" => "catalog#index"
	match "about" => "articles#show", :alias => "about"
	match "technologies" => "technologies#index"
	match "solutions" => "solutions#index"
	match "company" => "company#index"

	match "solutions/ind-power-give" => "solutions#ind_power_give"
	match "solutions/unint-power-heating" => "solutions#unint_power_heating"
	match "solutions/electrification-country-house" => "solutions#electrification_country_house"
	match "solutions/autonomous-system-stand-sol" => "solutions#autonomous_system_stand_sol"
	match "solutions/uninterrupted-power-supply-stand-sol" => "solutions#uninterrupted_power_supply_stand_sol"
	match "solutions/energy-efficient-lighting-jkh-220v-50hz" => "solutions#energy_efficient_lighting_jkh_220v_50hz"
	match "catalog/(:alias)" => "articles#show"


	match "admin/accounts/add" => "admin/accounts#add"
	match "admin/login" => "admin/accounts#login"

	namespace :admin do
		resources :articles
	end
	match "home" => "home#index"
	match ':value' => "home#index"
 	match "index.php?page=catalog&category=map" => "home#index"
	match ':value(/:value2(/value3))' => "home#index"
end
