create database AnalisisDB; 
use AnalisisDB;

create table Pagina(
numeroPagina int not null,
nombrePagina varchar(100) not null,
palabra varchar(45) not null,
primary key (numeroPagina, nombrePagina,palabra)
);

delete from Pagina;
insert into Pagina values(1,'pag1','hello');
select * from Pagina where palabra = 'empir' || palabra = 'english' group by numeroPagina,nombrePagina; 
select * from Pagina
#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';