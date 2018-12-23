# My finance

## Prerequirement (Docker is recommended to install below dependencies)

- Python 3.6.7
- MySQL 5.7.12
- RabbitMQ 3.6.x (required for celery worker processes)

## Setup development environment
Install requirements:
```shell
# inside virtual environment:
$ pip install -r requirements.txt
``` 
Create `.env` file with configuration for the application (`.env-template` file is an example)
```
BCRYPT_HASH_PREFIX=4 # bcrypt hash prefix
DB_HOST=localhost # mysql hostname
DB_USER=root # mysql user
DB_PASS=some_password # mysql password
DB_NAME=some_db_name # mysql database name
AUTH_TOKEN_EXPIRY_DAYS=1 # JWT token expiration days
ITEMS_PER_PAGE=5 # items per page for pagination
EMAIL_ADDRESS=example_mail@gmail.com # email used to send mail
EMAIL_PASSWORD=password # email password
```

Create database and its structure
```shell
flask db upgrade
```

Seed data for database
```shell
python seed.py
```

Run test
```shell
nose2 --verbose
```

Start web (when there is env variable `FLASK_ENV=development`, the program reads configuration from `.env` file)
```
FLASK_ENV=development flask run
```
Start celerybeat scheduler:
```
FLASK_ENV=development celery -A app.celery beat --loglevel=INFO
```
Start celery worker:
```
FLASK_ENV=development celery -A app.celery worker --loglevel=INFO
```

## Docker
Requirements: Docker, Docker-compose

### Setup environment:
```
$ cd build/docker
$ sh build.sh
$ sh deploy.sh
```
Migrate db: 
```
$ docker exec -it flask_app_container_name flask db upgrade
```
Seed db:
```
$ docker exec -it flask_app_container_name python seed.py
```

API endpoints: `localhost`

Admin endpoints: `localhost:8080`

Celery flower endpoints `localhost:5555`
