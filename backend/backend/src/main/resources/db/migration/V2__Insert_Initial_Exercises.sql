-- V2__Insert_Initial_Exercises.sql

-- EJERCICIO 1: SELECCIÓN MÚLTIPLE
INSERT INTO exercises (id, title, statement, type, code_snippet)
VALUES (1, 'Variables en PseInt', '¿Cuál es la palabra clave para definir una variable de tipo texto?', 'MULTIPLE_CHOICE', 'Definir miVariable Como ______;');

-- Opciones para el Ejercicio 1
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (1, 'Entero', false, 1);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (2, 'Caracter', true, 1);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (3, 'Logico', false, 1);


-- EJERCICIO 2: VERDADERO O FALSO
INSERT INTO exercises (id, title, statement, type)
VALUES (2, 'Comentarios', 'En PseInt, los comentarios de una sola línea se hacen con ''//''.', 'TRUE_FALSE');

-- Opciones para el Ejercicio 2
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (4, 'Verdadero', true, 2);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (5, 'Falso', false, 2);


-- EJERCICIO 3: RELLENAR EL ESPACIO
INSERT INTO exercises (id, title, statement, type, code_snippet)
VALUES (3, 'Definir Variables Numéricas', 'Completa la sentencia para definir una variable para números enteros.', 'FILL_IN_THE_BLANKS', 'Definir miNumero Como ______;');

-- Opción/Respuesta para el Ejercicio 3
-- Guardamos la respuesta en minúsculas para facilitar la comparación en el frontend.
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (6, 'entero', true, 3);


-- EJERCICIO 4: SELECCIÓN MÚLTIPLE (OTRO)
INSERT INTO exercises (id, title, statement, type)
VALUES (4, 'Operadores de Asignación', '¿Cuál es el operador correcto para asignar un valor a una variable en PseInt?', 'MULTIPLE_CHOICE');

-- Opciones para el Ejercicio 4
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (7, '=', false, 4);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (8, '<-', true, 4);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (9, '==', false, 4);


-- EJERCICIO 5: ARRASTRAR Y SOLTAR (DRAG AND DROP)
INSERT INTO exercises (id, title, statement, type)
VALUES (5, 'Algoritmo de Suma Simple', 'Ordena los siguientes bloques para crear un algoritmo que lea dos números, los sume y muestre el resultado.', 'DRAG_AND_DROP');

-- Opciones para el Ejercicio 5
-- ¡IMPORTANTE! El orden en que se insertan no tiene por qué ser el correcto.
-- El frontend se encargará de mezclarlos. La respuesta correcta se define por el orden que tú decidas.
-- Por ahora, el campo 'is_correct' no es tan relevante, pero lo mantenemos por consistencia.
-- El frontend validará el orden de los IDs (10, 11, 12, 13, 14).
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (10, 'Inicio', true, 5);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (11, 'Leer numero1, numero2', true, 5);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (12, 'resultado <- numero1 + numero2', true, 5);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (13, 'Escribir resultado', true, 5);
INSERT INTO options (id, text, is_correct, exercise_id)
VALUES (14, 'Fin', true, 5);

-- Actualizar las secuencias de IDs de PostgreSQL al final de todo
-- (Borra las líneas 'setval' anteriores y deja solo estas al final del archivo)
SELECT setval('exercises_id_seq', (SELECT MAX(id) FROM exercises), true);
SELECT setval('options_id_seq', (SELECT MAX(id) FROM options), true);