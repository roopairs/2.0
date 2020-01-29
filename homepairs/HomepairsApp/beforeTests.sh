#!/bin/bash
psql -c "CREATE USER dummy WITH PASSWORD 'pass4dummy';"

psql -c "ALTER USER dummy WITH CREATEDB;"

psql -c "CREATE DATABASE testboop OWNER dummy;"

python manage.py runserver
