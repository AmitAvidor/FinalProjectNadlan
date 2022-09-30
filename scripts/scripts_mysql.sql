create database final;

use final;
create table users(
id int auto_increment,
name varchar (50),
email varchar (100),
password varchar (255),
phone varchar (10),
primary key(id)
);