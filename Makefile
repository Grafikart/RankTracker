.PHONY: seed
seed:
	php artisan migrate:fresh --seed
