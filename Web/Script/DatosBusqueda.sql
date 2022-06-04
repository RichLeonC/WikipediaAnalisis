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
insert into Pagina values(1,'pag1','hello1');
insert into Pagina values(1,'pag1','hello2');
insert into Pagina values(1,'pag1','hello3');
insert into Pagina values(1,'pag1','hello5');
insert into Pagina values(1,'pag1','hello7');
insert into Pagina values(1,'pag1','hello9');
insert into Pagina values(1,'pag1','hello4');
 
select * from Pagina where palabra = 'empir' || palabra = 'english' group by numeroPagina,nombrePagina; 
select * from Pagina;

select count(Pagina.numeroPagina) as cantidad from Pagina where Pagina.numeroPagina = 1;

#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';