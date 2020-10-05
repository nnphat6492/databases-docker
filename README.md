# data-docker
mysqlbinlog --start-position=219 --stop-position=219 /var/lib/mysql/mysql-bin.000009 | sql -u root -psecret


mysqldump  -u root -psecret --all-databases --events --routines --master-data=2> dump_file
mysql  -u root -psecret < dump_file

CREATE USER 'user1'@'localhost' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON  test_recovery.* TO 'user1'@'*';
GRANT SELECT, SHOW VIEW, RELOAD, REPLICATION CLIENT, EVENT, TRIGGER ON *.* TO 'user1'@'*';
GRANT LOCK TABLES ON *.* TO 'user1'@'*';
GRANT PROCESS ON *.* TO 'user1'@'localhost'
FLUSH PRIVILEGES;

mysql  -u user1 -psecret < dump_file
mysqldump  -u user1 -psecret --database test_recovery --events --routines --master-data=2> dump_file
