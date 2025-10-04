CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('John Doe', 'https://en.wikipedia.org/wiki/Relational_database', 'Relational databases rule the world');
insert into blogs (author, url, title) values ('Matti Meikäläinen', 'https://en.wikipedia.org/wiki/MongoDB', 'MongoDB is webscale');