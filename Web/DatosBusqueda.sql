create database AnalisisDB; 
use AnalisisDB;

create table Pagina(
numeroPagina int not null,
nombrePagina varchar(100) not null,
palabra varchar(45) not null,
primary key (numeroPagina, nombrePagina)
);

#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';