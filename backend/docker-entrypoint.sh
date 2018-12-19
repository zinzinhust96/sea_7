#!/bin/sh

set -e

while true; do
    flask db upgrade
    if [[ "$?" == "0" ]]; then
        break
    fi
    echo Waiting for database, retrying in 5 secs...
    sleep 5
done
echo Successfully migrated database

exec "$@"
