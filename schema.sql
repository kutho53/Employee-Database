DROP database if EXISTS  employees;

create database employees;

drop table if exists department;

create table department(
    id serial primary key,
    name varchar(30) unique not null
);

drop table if exists role;

create table role(
    id serial primary key,
    title varchar(30) unique not null,
    salary decimal not null,
    department_id integer not null,
    FOREIGN KEY (department_id)
    references department(id)
    on delete set NULL
);

drop table if exists employee;

create table employee(
    id serial primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer not null,
    manager_id integer,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    on delete set null
);

