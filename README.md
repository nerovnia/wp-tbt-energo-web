
# 

sudo chown -R :33 wordpress-files/

## Start container
docker compose up -d --force-recreate
docker compose up -d --build
docker compose -f src/docker/docker-compose.yml up

## Stop container

docker compose down -v


## PHP

docker compose exec wordpress php -v


user in original docker compose config 48
user in first-migration-wp:4.6.2 docker compose config 33


# Get mySQL Backup

sudo docker exec wp_mysql_57 mysqldump -u wp_user -pwp_password wordpress_db > /home/volodymyr/work/PHP/260528/tbt-energo.com/compose/original/migration_milestone_5.6.2.sql