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
    cantLinksActivos int not null,
    cantLinksNoActivos int not null,
    cantReferencias int not null,
    cantImgAlt int not null,
    cantImg int not null
    
);
drop table EstadisticaGeneral;



drop table  Pagina;
 
select * from Pagina where palabra = 'empir' || palabra = 'english' group by numeroPagina,nombrePagina; 
select * from Pagina;
select * from EstadisticaGeneral;
delete from  Pagina;
select sum(Pagina.cantidadRe) as cantidad from Pagina where Pagina.numeroPagina = 1;
select max(Pagina.cantidadRe) as MasVeces from Pagina where Pagina.numeroPagina = 1;

select * from Pagina order by cantidadRe desc limit 10;
insert into EstadisticaGeneral values(25000,15000);

#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';