# Pseudocodex - Plataforma Interactiva de Aprendizaje de Lógica con pseudocodigo

![Logo de PseInt Web Studio](frontend/src/assets/logo.png)

**Pseudocodex** es una aplicación web full-stack diseñada para ayudar a estudiantes y entusiastas de la programación a aprender y practicar los fundamentos de la lógica de algoritmos, inspirada en la popular herramienta PseInt. La plataforma ofrece ejercicios interactivos, un sistema de progresión y una interfaz limpia y moderna.

**Visita la aplicación en vivo:** https://pseudocodex.netlify.app/

---

## 🚀 Funcionalidades Principales

*   **Ejercicios Interactivos:** Resuelve ejercicios de diferentes tipos:
    *   **Selección Múltiple:** Elige la opción correcta.
    *   **Verdadero o Falso:** Valida afirmaciones sobre lógica de programación.
    *   **Rellenar el Espacio (Fill in the Blank):** Escribe la palabra clave que falta.
    *   **Arrastrar y Soltar (Drag and Drop):** Arrastra y suelta en un orden específico.
*   **Sistema de Progresión:** Los ejercicios se desbloquean consecutivamente a medida que el usuario completa el anterior, creando un camino de aprendizaje estructurado.
*   **Autenticación de Usuarios:** Sistema completo de registro e inicio de sesión con credenciales seguras.
*   **Gestión de Sesión Persistente:** La sesión del usuario se mantiene activa incluso después de recargar la página, gracias al uso de JSON Web Tokens (JWT).
*   **Diseño Responsivo:** Interfaz completamente adaptada para una experiencia óptima tanto en escritorio como en dispositivos móviles.
*   **Feedback Instantáneo:** Los usuarios reciben una respuesta visual inmediata al comprobar sus respuestas.

---

## 🛠️ Stack Tecnológico

Este proyecto fue construido utilizando una arquitectura moderna y desacoplada, con un backend robusto que sirve una API RESTful a un frontend dinámico.

### **Backend (Java / Spring Boot)**

*   **Framework:** Spring Boot 3
*   **Seguridad:** Spring Security 6 (Autenticación basada en JWT)
*   **Acceso a Datos:** Spring Data JPA con Hibernate como implementación de ORM.
*   **Base de Datos:** PostgreSQL
*   **Migraciones:** Flyway para una gestión versionada y segura del esquema de la base de datos.
*   **Validación:** Jakarta Bean Validation para la integridad de los datos de entrada.
*   **Servidor de Aplicaciones:** Embebido (Tomcat)
*   **Despliegue:** Microsoft Azure App Service

### **Frontend (React / TypeScript)**

*   **Framework:** React 18
*   **Lenguaje:** TypeScript
*   **Herramientas de Construcción:** Vite (con transpilación SWC)
*   **Enrutamiento:** React Router DOM v6
*   **Gestión de Estado:** React Context API
*   **Estilos:** CSS Modules / CSS Plano con una paleta de colores centralizada.
*   **Iconos:** React Icons
*   **Despliegue:** Netlify / Vercel

### **Base de Datos**

*   **Servicio:** Supabase (PostgreSQL como servicio en la nube)

---

## ⚙️ Configuración y Ejecución Local

Para ejecutar este proyecto en tu máquina local, necesitarás tener instalado Java (JDK 21+), Node.js, y Git.

### **1. Configuración del Backend**

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/franmbv/PseudoCode_Web_Studio.git
    cd PseudoCode_Web_Studio/backend
    ```

2.  **Configura los secretos:**
    *   Navega a `src/main/resources/`.
    *   Crea un archivo llamado `env.properties`.
    *   Añade las siguientes variables con tus propias credenciales:
        ```properties
        # Secretos para el desarrollo local
        DB_PASSWORD=TU_CONTRASEÑA_DE_POSTGRESQL
        JWT_SECRET=TU_SECRETO_JWT_EN_BASE64
        ```
    *   *Nota: La base de datos y las tablas se crearán y poblarán automáticamente gracias a Flyway al iniciar la aplicación por primera vez.*

3.  **Ejecuta la aplicación:**
    *   Abre el proyecto en IntelliJ IDEA.
    *   Ejecuta la clase principal `BackendApplication.java`.
    *   El servidor se iniciará en `http://localhost:8080`.

### **2. Configuración del Frontend**

1.  **Navega a la carpeta del frontend:**
    ```bash
    cd ../frontend 
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura la URL de la API:**
    *   En la raíz de la carpeta `frontend`, crea un archivo `.env`.
    *   Añade la siguiente línea para que apunte a tu backend local:
        ```
        VITE_API_BASE_URL=http://localhost:8080
        ```

4.  **Ejecuta la aplicación:**
    ```bash
    npm run dev
    ```
    *   La aplicación de desarrollo estará disponible en `http://localhost:5173`.

---

## 📸 Screenshots 

**Página de Inicio de Sesión:**
<img width="1356" height="640" alt="image" src="https://github.com/user-attachments/assets/7179ca8b-1025-471a-b744-c7ec6d2df2e7" />

**Página de Home:**
<img width="1360" height="642" alt="image" src="https://github.com/user-attachments/assets/3bfc2d5f-2151-4cb7-9d71-8b6bca97aee2" />

**Página de Ejercicio:**
<img width="1357" height="643" alt="image" src="https://github.com/user-attachments/assets/33c10ea0-db6b-4631-aeec-7da488f76f9f" />

---

## 🌟 Aprendizajes Clave

Este proyecto fue una oportunidad para profundizar en:
*   La construcción de una API REST segura con Spring Boot y Spring Security.
*   La gestión del ciclo de vida de una base de datos con Flyway.
*   La implementación de un sistema de autenticación completo basado en JWT.
*   El desarrollo de un frontend moderno y tipado con React y TypeScript.
*   La gestión de estado global en React a través de Context API.
*   El despliegue de una aplicación full-stack en plataformas en la nube como Azure y Netlify.

---

## 👨‍💻 Autor

**Franner Bermudez**
*   **GitHub:** [@franmbv](https://github.com/franmbv)
*   **LinkedIn:** [Franner Bermudez](www.linkedin.com/in/franner-bermudez-99b4a91a2)
