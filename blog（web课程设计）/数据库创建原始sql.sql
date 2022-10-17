create database bolg;
use bolg;
create table blog_types(
id int not null primary key auto_increment,
type_name varchar(20)
);

create table blog_detail(
	id int not null primary key auto_increment,
    type_id int,
    title varchar(50),
    add_time date,
	introduce varchar(50),
    view_count int,
    content text,
    
    foreign key fk_blog_detail_blog_types(type_id)
    	-- 外键来自哪里
    	references blog_types(id)
    	-- 外键发生相应操作时的反应
    	on update cascade
    	on delete no action
);

create table user_table(
    id int primary key auto_increment,
    username varchar(20) not null,
    password varchar(20) not null,
    permission int
);