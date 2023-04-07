---
title: "How to delopy a backend project in Render.com"
subtitle: "Deploy a Flask project to Render, migrate database from SQLite to Postgres"
date: "2023-04-06"
---

## Introduction

> The project is backend flask CRUD project - **Pizza order and deliever system**. In development, I used SQLite as my database. There are two relational talbes, users and orders. In user table, it included `id, username, email, password, is_staff, is_active`. In orders table, it included `order_id, pizza_size, order_status, pizza_flavour, qutity, cutormer_id`. I used `flask-sqlalchemy` to create the database and `flask-migrate` to migrate the database.<br>
> If you're interested in viewing more about Flask, check out my [**repo**](https://github.com/yanliu1111/flask-rest-api-project) on how to build, test, and deploy a Flask app.

## Some technologies in this projects

- Flask
- Flask-SQLAlchemy
- Postgres
- Gunicorn - Python WSGI HTTP Server
- psycopg2 - PostgreSQL database adapter for Python
- Render - Deploy and host your web app

Check out the details about [Render](render.com)

## Transfrom database from SQLite to Postgres

Used `HeidiSQL` to connect to the Render server and generate `DATABASE_URL`, and also (but no need for this project) it can export the database to SQL file. (for example)

> postgresql://flask_rest_api_project_user:O777qqqqqqqqqqqqqqqqqqqqq@dgg-cggggggggggggggggggg-a.oregon-postgres.render.com/

I didn't focus on how to work in dev and test environment in this post. After I finished dev and test in local successfully, I would deploy my project to Render website.

So from development to production, what I changed for developing this Flask project.

## Prerequisites

In virtual environment,

```bash
# pip
(venv)$ pip install gunicorn
(venv)$ pip freeze > requirements.txt
(venv)$ pip install psycopg2-binary
(venv)$ pip freeze > requirements.txt
```

## Production configuration

```python
# config.py
import os
import re
...
from decouple import config

BASE_DIR=os.path.dirname(os.path.realpath(__file__))

uri = config("DATABASE_URL")  # or other relevant config var
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
...
...
class ProdConfig(Config):
    SQLALCHEMY_DATABASE_URI=uri
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    DEBUG=config('DEBUG',cast=bool)

config_dict={
    'dev':DevConfig,
    'testing':TestConfig,
    'prodution':ProdConfig
}
```

```python
# runserver.py
from api import create_app
from api.config.config import config_dict
# change the config type from dev to prodution
app= create_app(config=config_dict['prodution'])

if __name__ == '__main__':
    app.run()
```

## Database Initialization

In virtual environment,

```bash
 export DATABASE_URL=postgresql://flask_rest_api_project_user:O777qqqqqqqqqqqqqqqqqqqqq@dgg-cggggggggggggggggggg-a.oregon-postgres.render.com/flask_rest_api_project
# what means of this DATABASE_URL?
# Network type: PostgreSQL (TCP/IP)
# User name: flask_rest_api_project_user
# Password: O777qqqqqqqqqqqqqqqqqqqqq
# Hostname: dgg-cggggggggggggggggggg-a.oregon-postgres.render.com
# port: 5432

export FLASK_APP=api/
echo $FLASK_APP
flask shell
>>>db.create_all() # create tables
```

## Render Deployment Steps

1. Web Service <br>
   Start by creating a new account with Render (if you don't have one). Then, navigate to your dashboard, click on the "New +" button, and select "Web Service".<br>
   Connect your Render account to either your GitLab or GitHub account. Once connected, select the repository to deploy.

2. Fill out the configuration for deploying the Web Service:<br>
   - Environment: Python 3
   - Region: Oregon (us-west)
   - Branch: main
   - Build Command: pip install -r requirements.txt
   - Start Command: gunicorn runserver:app <br>`runserver.py is the file name, app is the variable name`
3. Set Environment Variables<br>
   - DATABASE_URL: postgresql://............... (your database url)
   - PYTHON_VERSION: 3.10.2 (My python version)
   - SECRET_KEY: (your secret key)
   - DEBUG: True
   - JWT_SECRET_KEY: (your jwt secret key)
   - CONFIG_TYPE: production
4. Check the deployment status by clicking on the "Events" tab <br>
   You'll see that the "Deploy" is live once all the configuration changes are applied and the service is updated.

[⬆️ Back to Top](#introduction)
