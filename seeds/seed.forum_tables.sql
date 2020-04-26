BEGIN;


TRUNCATE topics, threads, users, comments RESTART IDENTITY CASCADE;

INSERT INTO topics (topic_name, topic_content)
VALUES
  ('General', 'General discussion about Pokemon Go.'),
  ('Introduction', 'Introduce yourselves here!'),
  ('Friends & Trading', 'All trading topics go here.'),
  ('Gyms & Raids', 'Post strategy for gym defend and raid battle here.'),
  ('PvP', 'Place for PvP discussion.');

INSERT INTO users (user_name, password, full_name, image)
VALUES
  ('charmander', 'charmander', 'charmander', 'https://img.pokemondb.net/artwork/charmander.jpg'),
  ('bulbasaur', 'bulbasaur', 'bulbasaur', 'https://img.pokemondb.net/artwork/bulbasaur.jpg'),
  ('squirtle', 'squirtle', 'squirtle', 'https://img.pokemondb.net/artwork/squirtle.jpg'),
  ('caterpie', 'caterpie', 'caterpie', 'https://img.pokemondb.net/artwork/caterpie.jpg'),
  ('weedle', 'weedle', 'weedle', 'https://img.pokemondb.net/artwork/weedle.jpg');

INSERT INTO threads (thread_title, thread_content, user_id, topic_id)
VALUES
  ('Hello', 'Please add me, my code is 0123 4567 8910', 1, 3),
  ('Hello!', 'Hi everybody', 2, 2),
  ('Hello everybody!', 'I have been playing pokemon go for 2 years', 3, 2),
  ('5* Raid counter', 'What is the best counter for mewtwo?', 3, 4),
  ('Gym Defend', 'What is the best pokemon for gym defend right now?', 3, 4),
  ('PvP practice', 'Anyone wanna pvp?', 2, 5),
  ('PvP', 'What is the best team for Go Battle Greate League?', 2, 5),
  ('PvP', 'What is the best team for Go Battle Ultra League?', 2, 5),
  ('PvP', 'What is the best team for Go Battle Master League?', 3, 5),
  ('Events', 'When is Valentine event start?', 5, 1),
  ('Community Day', 'Anyone wanna meet up on CD March?', 1, 1),
  ('Hello everybody', 'Please add me, my code is 9898 9898 9898', 3,3);

INSERT INTO comments (content, user_id, thread_id)
VALUES
  ('I added you', 2, 1),
  ('Please send gift', 2, 1),
  ('Wow', 1, 3),
  ('Giratina', 1, 4),
  ('Blissey', 1, 5),
  ('Feb, 14', 1, 10),
  ('Feb, 14', 2, 10),
  ('We can meet at Boston Common', 2, 11),
  ('Great1', 1, 11),
  ('Hello', 4, 2),
  ('Welcome to the community', 3, 2),
  ('Medicham, Steelix and Deoxy', 1, 7),
  ('Toxicroak, Bastiodon and Alteria', 1, 7);

COMMIT;