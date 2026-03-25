package com.pseudocodewebstudio.backend; // Asegúrate de que el paquete sea el correcto

import com.pseudocodewebstudio.backend.persistence.crud.CrudExerciseEntity;
import com.pseudocodewebstudio.backend.persistence.entity.Exercise;
import com.pseudocodewebstudio.backend.persistence.entity.ExerciseType;
import com.pseudocodewebstudio.backend.persistence.entity.Option;
import com.pseudocodewebstudio.backend.persistence.repository_impl.ExerciseEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import java.util.List;

//@Component
public class DataInitializer implements CommandLineRunner {

    private final CrudExerciseEntity exerciseEntityRepository;

    @Autowired
    public DataInitializer(CrudExerciseEntity exerciseEntityRepository) {
        this.exerciseEntityRepository = exerciseEntityRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Iniciando la inicialización de datos de prueba...");

        // Crear Ejercicio 1: Selección Múltiple
        Exercise exercise1 = new Exercise();
        exercise1.setTitle("Variables en PseInt");
        exercise1.setStatement("¿Cuál es la palabra clave para definir una variable de tipo texto?");
        exercise1.setType(ExerciseType.MULTIPLE_CHOICE);
        exercise1.setCodeSnippet("Definir miVariable Como ______;");

        Option option1_1 = new Option();
        option1_1.setText("Entero");
        option1_1.setCorrect(false);
        option1_1.setExercise(exercise1);

        Option option1_2 = new Option();
        option1_2.setText("Caracter");
        option1_2.setCorrect(true);
        option1_2.setExercise(exercise1);

        Option option1_3 = new Option();
        option1_3.setText("Logico");
        option1_3.setCorrect(false);
        option1_3.setExercise(exercise1);

        exercise1.setOptions(List.of(option1_1, option1_2, option1_3));
        exerciseEntityRepository.save(exercise1);

        // Crear Ejercicio 2: Verdadero o Falso
        Exercise exercise2 = new Exercise();
        exercise2.setTitle("Comentarios");
        exercise2.setStatement("En PseInt, los comentarios de una sola línea se hacen con '//'.");
        exercise2.setType(ExerciseType.TRUE_FALSE);

        Option option2_1 = new Option();
        option2_1.setText("Verdadero");
        option2_1.setCorrect(true);
        option2_1.setExercise(exercise2);

        Option option2_2 = new Option();
        option2_2.setText("Falso");
        option2_2.setCorrect(false);
        option2_2.setExercise(exercise2);

        exercise2.setOptions(List.of(option2_1, option2_2));
        exerciseEntityRepository.save(exercise2);

        System.out.println("Datos de prueba cargados. Total de ejercicios: " + exerciseEntityRepository.count());
    }
}