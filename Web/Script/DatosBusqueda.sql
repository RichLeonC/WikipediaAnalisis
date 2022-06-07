create database AnalisisDB; 
use AnalisisDB;

create table Pagina(
numeroPagina int not null,
nombrePagina varchar(100) not null,
palabra varchar(45) not null,
cantidadRe int not null,
primary key (numeroPagina, nombrePagina,palabra,cantidadRe)
);

create table EstadisticaGeneral(
	cantTitulos int not null,
    cantPalabrasDistintas int not null,
    cantSubtitulo int not null
);


insert into EstadisticaGeneral values(346, 17835, 234);

drop table  Pagina;
insert into Pagina values(1,'pag1','hello',2);
insert into Pagina values(1,'pag1','hello1',5);
insert into Pagina values(1,'pag1','hello2',8);
insert into Pagina values(1,'pag1','hello3',1);
insert into Pagina values(1,'pag1','hello5',9);
insert into Pagina values(1,'pag1','hello7',1);
insert into Pagina values(1,'pag1','hello9',6);
insert into Pagina values(1,'pag1','hello4',3);
insert into Pagina values(2,'pag1','hello',3);
insert into Pagina values(2,'pag1','hello1',2);
insert into Pagina values(2,'pag1','hello2',3);
insert into Pagina values(2,'pag1','hello3',6);
insert into Pagina values(2,'pag1','hello5',3);
insert into Pagina values(2,'pag1','hello7',4);
insert into Pagina values(2,'pag1','hello9',3);
insert into Pagina values(2,'pag1','hello4',5);
 
select * from Pagina where palabra = 'empir' || palabra = 'english' group by numeroPagina,nombrePagina; 
select * from Pagina;
select * from EstadisticaGeneral;
delete from  Pagina;
select sum(Pagina.cantidadRe) as cantidad from Pagina where Pagina.numeroPagina = 1;
select max(Pagina.cantidadRe) as MasVeces from Pagina where Pagina.numeroPagina = 1;


#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';