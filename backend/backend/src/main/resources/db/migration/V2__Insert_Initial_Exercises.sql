-- Insertar el primer ejercicio
INSERT INTO exercises (id, title, statement, type, code_snippet)
VALUES (1, 'Variables en PseInt', '¿Cuál es la palabra clave para definir una variable de tipo texto?', 'MULTIPLE_CHOICE', 'Definir miVariable Como ______;');

-- Insertar las opciones para el primer ejercicio
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (1, 'Entero', false, 1);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (2, 'Caracter', true, 1);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (3, 'Logico', false, 1);

-- Insertar el segundo ejercicio
INSERT INTO exercises (id, title, statement, type)
VALUES (2, 'Comentarios', 'En PseInt, los comentarios de una sola línea se hacen con ''//''.', 'TRUE_FALSE');

-- Insertar las opciones para el segundo ejercicio
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (4, 'Verdadero', true, 2);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (5, 'Falso', false, 2);

-- PostgreSQL necesita que actualicemos las secuencias para los IDs autogenerados
-- Esto asegura que el siguiente 'INSERT' sin ID comience desde el 3 para ejercicios y 6 para opciones
SELECT setval('exercises_id_seq', (SELECT MAX(id) FROM exercises));
SELECT setval('options_id_seq', (SELECT MAX(id) FROM options));