include .env
export

.PHONY: seed
seed:
	php artisan migrate:fresh --seed

lint:
	vendor/bin/pint
	bun run format
	bun run lint

.PHONY: deploy
deploy: ## Deploy a new version on the server
	bun run build
	rsync -avH ./public/build/ -e ssh $(SERVER_NAME):~/sites/$(SERVER_DOMAIN)/public/build/
	ssh -A $(SERVER_NAME) 'cd ~/sites/$(SERVER_DOMAIN) && git pull origin main && make install'

.PHONY: pushdb
pushdb: ## Send the local database online
	 rsync -avH ./database/database.sqlite -e ssh $(SERVER_NAME):~/sites/$(SERVER_DOMAIN)/database/database.sqlite

.PHONY: install
install: ## Install the project (on infomaniak)
	/opt/php8.4/bin/composer install --no-dev --optimize-autoloader
	/opt/php8.4/bin/php artisan cache:clear
	/opt/php8.4/bin/php artisan optimize
