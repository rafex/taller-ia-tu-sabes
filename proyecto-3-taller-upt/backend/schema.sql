-- Esquema SQLite para mensajes
drop table if exists messages;
create table messages (
    id integer primary key autoincrement,
    content text not null,
    created_at datetime default current_timestamp
);