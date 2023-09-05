\echo "Delete and recreate vtrade db?"
\prompt "Return for yes or control-C to cancel >" answer

DROP DATABASE vtrade;
CREATE DATABASE vtrade;
\connect vtrade;

\i vtrade-schema.sql
\i vtrade-seed.sql

