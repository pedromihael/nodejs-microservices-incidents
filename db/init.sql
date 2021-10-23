CREATE DATABASE ms_incidents;

CREATE USER ms_dev with password 'docker';

GRANT ALL PRIVILEGES ON DATABASE ms_incidents TO ms_dev;
