TRUNCATE comments, threads, topics, users RESTART IDENTITY CASCADE;

INSERT INTO topics (topic_name, topic_content)
VALUES
  ('General', 'General discussion about Pokemon Go.'),
  ('Introduction', 'Introduce yourselves here!'),
  ('Friends & Trading', 'All trading topics go here.'),
  ('Gyms & Raids', 'Post strategy for gym defend and raid battle here.'),
  ('PvP', 'Place for PvP discussion.');

INSERT INTO users (username, password, name)
VALUES
  ('user1', 'user1', 'user1'),
  ('user2', 'user2', 'user2'),
  ('user3', 'user3', 'user3'),
  ('user4', 'user4', 'user4'),
  ('user5', 'user5', 'user5');

INSERT INTO threads (thread_title, thread_content, user_id, topic_id)
VALUES
  ('Hello', 'Please add me, my code is 0123 4567 8910', 1, 3),
  ('Hello!', 'Hi everybody', 2, 2),
  ('5* Raid counter', 'What is the best counter for mewtwo?', 3, 4),
  ('PvP practice', 'Anyone wanna pvp?', 2, 5),
  ('Events', 'When is Valentine event start?', 5, 1),
  ('Hello', 'Please add me, my code is 0123 4567 8910', 3,3);

INSERT INTO comments (content, user_id, thread_id)
VALUES
  ('hello', 1, 1),
  ('hello2', 2, 2),
  ('hello3', 3, 3),
  ('hello4', 1, 4),
  ('hello5', 1, 2),
  ('hello6', 1, 5);



