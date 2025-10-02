# **Survey Container** 
![SurveyContainer](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Readme/SurveyContainer.png)

# 📦 Survey Container

**Survey Container** es una solución completa desarrollada como parte de una prueba técnica para construir un sistema de encuestas internas modular, reutilizable y escalable.

[![Dependencia-NPM](https://img.shields.io/static/v1?message=Dependencia-NPM&logo=npm&label=&color=CB3837&logoColor=white&labelColor=&style=for-the-badge)](https://www.npmjs.com/package/survey-container)

## Una forma sencilla de integrar survey container a tu proyecto

Desde la configuración de tu base de datos hasta la integración en tu frontend, estos pasos te guiarán en todo el proceso para comenzar a usar la dependencia survey container de forma eficiente y rápida.

### Instala la dependencia

Crea una base de datos y Asegúrate de incluir las tablas requeridas:
**Survey, Question y Response**, siguiendo la estructura definida en la documentación.

### Prepara el backend

Agrega los archivos para gestionar métricas, encuestas y respuestas:
**metrics, questions, getResponse, postResponse, create, survey**

### Instala la dependencia

Desde la terminal ejecuta:

```
npm i survey-container
```

### Evita versiones antiguas

Las versiones anteriores pueden contener errores ya corregidos. Siempre revisa el package.json y actualiza si es necesario para evitar comportamientos inesperados.


### Integra en tu componente 

Importa el paquete según tu framework Y usa el componente con los props necesarios (surveyId, fetchUrl, responseUrl, etc.).

### ¡Listo para usar!

Una vez configurado todo, podrás mostrar encuestas, recolectar respuestas y analizar métricas fácilmente.
Disfruta de una integración limpia, extensible y flexible.


# Integración en el Front-End y Back-end

<details>
<summary>🎨 Integración del lado del Front-End</summary>

<details>
<summary> Props del Front </summary>

| Prop               | Tipo                               | Obligatorio | Descripción                                                                                                                                                                                                                                                                           |
| ------------------ | ---------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `surveyId`         | `string`                           | ✅ Sí        | Es el ID de la encuesta que quieres mostrar. En esta demo se obtiene desde la URL usando `useParams()`.                                                                                                                                                                               |
| `fetchUrl`         | `string`                           | ✅ Sí      | Es la URL base para hacer la solicitud **GET** y obtener los datos de la encuesta. Por ejemplo: `http://localhost:3000/api/surveys/survey.php?id=`. Se añadirá automáticamente el `surveyId` al final.                               |
| `responseUrl`      | `string`                           | ✅ Sí      | Es la URL donde se envían las respuestas con una solicitud **POST**.                                                                                                                                          |
| `onAlert`          | `(message: string, type?: string)` | ❌ No        | Función que se ejecuta para mostrar una alerta dependiendo del estado de la encuesta (error, éxito, advertencia). Puedes personalizarla como quieras (modal, toast, etc.) |
| `apiUrl`           | `string`                           | ❌ No        | Si prefieres una URL base en lugar de `fetchUrl` o `responseUrl` individuales, puedes usar este prop como raíz para los endpoints `/surveys` y `/responses`.                                                                                                   |
| `onSubmit`         | `(responses) => Promise<void>`     | ❌ No        | Si quieres manejar tú mismo el envío de respuestas, puedes pasar tu propia función `onSubmit`. Si no se define, se hará un POST automáticamente a `responseUrl`.                                                                                                                      |
| `loadingText`      | `string`                           | ❌ No        | Texto que se muestra mientras la encuesta está cargando. Por defecto: `"Cargando encuesta..."`.                                                                                                                                                                                       |
| `submitButtonText` | `string`                           | ❌ No        | Texto del botón de envío. Por defecto: `"Enviar respuestas"`.                                                                                                                                                                                                                         |
| `className`        | `string`                           | ❌ No        | Clase CSS personalizada para aplicar estilos adicionales al contenedor del widget.                                                                                                                                                                                                    |

</details>

<details>
<summary> Integración con React </summary>

# Integración con React

El componente **SurveyContainer** te permite integrar encuestas de manera sencilla dentro de tu aplicación desarrollada con React. Con él, puedes mostrar formularios interactivos y personalizables sin necesidad de implementar toda la lógica desde cero.

## Componente

Para utilizar el componente **SurveyWidget** de la dependencia **survey container**, primero debes importarlo en tu proyecto de React. Este componente es flexible, permitiendo usar rutas propias para obtener y guardar encuestas.

Además, puedes integrar librerías de notificaciones como **react-toastify**, lo que facilita mostrar mensajes personalizados, por ejemplo:

- **Encuesta enviada con éxito**
- **Ocurrió un error al cargar la encuesta**

De esta forma, garantizas una mejor experiencia de usuario al manejar tanto confirmaciones como errores dentro de tu aplicación.

```
import React from "react";
import { useParams } from "react-router-dom";
import { SurveyWidget } from "survey-container";

function SurveyContainer() {

    const { surveyId } = useParams();

    return (
        <div className="">
            <SurveyWidget
                surveyId={surveyId}
                fetchUrl="Route to access the survey"
                responseUrl="Path to save answers"
                onAlert="Function to display alerts. You can use react-toastify"
            />
        </div>
    );

}
export default SurveyContainer;
```


</details>

<details>
<summary> Integración con Vue </summary>

# Integración con Vue JS

El componente **Survey Container** te permite integrar encuestas de manera sencilla dentro de tu aplicación desarrollada con Vue. Con él, puedes mostrar formularios interactivos y personalizables sin necesidad de implementar toda la lógica desde cero.

## Componente

Para utilizar el componente **SurveyWidget** de la dependencia **survey container**, primero debes importarlo en tu proyecto de Vue. Este componente es flexible, permitiendo usar rutas propias para obtener y guardar encuestas.

Además, puedes integrar librerías de notificaciones como **Vue Toastification**, lo que facilita mostrar mensajes personalizados, por ejemplo:

- **Encuesta enviada con éxito**
- **Ocurrió un error al cargar la encuesta**

De esta forma, garantizas una mejor experiencia de usuario al manejar tanto confirmaciones como errores dentro de tu aplicación.

```
<template>
    <div class="">
        <SurveyWidget :surveyId="surveyId" fetchUrl="Route to access the survey"
            responseUrl="Path to save answers"
            onAlert="Función para mostrar alertas. Puedes usar vue-toastification" />
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { SurveyWidget } from 'survey-container';

export default {
    components: {
        SurveyWidget
    },
    setup() {
        const route = useRoute();
        const surveyId = route.params.surveyId;

        return {
            surveyId
        };
    }
};
</script>
```

</details>

<details>
<summary> Integración con Angular </summary>

# Integración con Angular

El componente **SurveyContainer** te permite integrar encuestas de manera sencilla dentro de tu aplicación desarrollada con Angular. Con él, puedes mostrar formularios interactivos y personalizables sin necesidad de implementar toda la lógica desde cero.

## Componente

Para utilizar el componente **SurveyWidget** de la dependencia **survey container**, primero debes importarlo en tu proyecto de Angular. Este componente es flexible, permitiendo usar rutas propias para obtener y guardar encuestas.

Además, puedes integrar librerías de notificaciones como **ngx-toastr**, lo que facilita mostrar mensajes personalizados, por ejemplo:

- **Encuesta enviada con éxito**
- **Ocurrió un error al cargar la encuesta**

De esta forma, garantizas una mejor experiencia de usuario al manejar tanto confirmaciones como errores dentro de tu aplicación.

```
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SurveyWidget } from "survey-container";

@Component({
  selector: "app-survey-container",
  template: `
    <div class="">
      <survey-widget
        [surveyId]="surveyId"
        [fetchUrl]="'Route to access the survey'"
        [responseUrl]="'Path to save answers'"
        [onAlert]="showAlert"
      ></survey-widget>
    </div>
  `,
})
export class SurveyContainerComponent {
  surveyId: string;

  constructor(private route: ActivatedRoute) {
    this.surveyId = this.route.snapshot.paramMap.get("surveyId");
  }

  showAlert(message: string) {
    // Function to display alerts. You can use ngx-toastr
  }
}

```

</details>

</details>



<details>
<summary>⚙️ Integración del lado del Back-End</summary>

Para que el componente **Survey Container** funcione correctamente, es necesario configurar en el backend una serie de endpoints que gestionen encuestas, preguntas, métricas y respuestas.

<details>
<summary> Tablas de la base de datos </summary>

Para ejecutar la dependencia se necesitara tener siertos campos en la base de datos, el script de creación de base de datos, tablas y campos requeridos:
script de creación de base de datos

```
CREATE TABLE IF NOT EXISTS Survey (
  id VARCHAR(36) PRIMARY KEY,
  qualification VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Question (
  id VARCHAR(36) PRIMARY KEY,
  text TEXT NOT NULL,
  surveyId VARCHAR(36),
  FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Response (
  id VARCHAR(36) PRIMARY KEY,
  content TEXT NOT NULL,
  questionId VARCHAR(36),
  FOREIGN KEY (questionId) REFERENCES Question(id) ON DELETE CASCADE
);
```

[schema.sql](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Database/schema.sql)

</details>

<details>
<summary> Integración con PHP </summary>

En el caso de usar **PHP**, la estructura básica de archivos recomendada es la siguiente:

```
Carpeta/
├── metrics/    
│   └── metrics.php           // Obtiene todas las encuestas
├── questions/    
│   └── questions.php         // Obtiene las preguntas de una encuesta
├── response/    
│   ├── getResponse.php       // Obtiene las respuestas
│   └── postResponse.php      // Guarda las respuestas
├── surveys/    
│   ├── create.php            // Crea una nueva encuesta
│   └── survey.php            // Obtiene una encuesta por ID
```

## metrics

El archivo `metrics.php` expone un endpoint encargado de recuperar todas las encuestas disponibles.

Esto permite, por ejemplo, generar reportes o listados globales para su administración.

[metrics.php](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/PHP/metrics/metrics.php)

## questions

El archivo `questions.php` obtiene las preguntas asociadas a una encuesta específica.

De esta manera, se asegura que cada encuesta cargue únicamente las preguntas correspondientes a su configuración.

[questions.php](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/PHP/questions/questions.php)

## response

En la carpeta `response/` se encuentran dos archivos clave:

`getResponse.php` → Devuelve las respuestas ya almacenadas de una encuesta.

`postResponse.php` → Recibe y guarda las nuevas respuestas enviadas por los usuarios.

Estos endpoints permiten manejar tanto la consulta como el registro de información de manera organizada.

[getResponse.php](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/PHP/response/getResponse.php)

[postResponse.php](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/PHP/response/postResponse.php)

## surveys

Dentro de la carpeta `surveys/` se gestionan las encuestas propiamente dichas:

`create.php` → Permite crear una nueva encuesta en el sistema.

`survey.php` → Obtiene la información de una encuesta específica a partir de su ID único.

[create.php](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/PHP/surveys/create.php)

[survey.php](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/PHP/surveys/survey.php)

</details>

<details>
<summary> Integración con Node.JS </summary>

En el caso de usar **NodeJS**, la estructura básica de archivos recomendada es la siguiente:

```
Carpeta/
├── metrics/    
│   └── metrics.js           // Obtiene todas las encuestas
├── questions/    
│   └── questions.js         // Obtiene las preguntas de una encuesta
├── response/    
│   ├── getResponse.js       // Obtiene las respuestas
│   └── postResponse.js      // Guarda las respuestas
├── surveys/    
│   ├── create.js            // Crea una nueva encuesta
│   └── survey.js            // Obtiene una encuesta por ID
```

## metrics

El archivo `metrics.js` expone un endpoint encargado de recuperar todas las encuestas disponibles.

Esto permite, por ejemplo, generar reportes o listados globales para su administración.

[metrics.js](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/NodeJS/metrics/metrics.js)

## questions

El archivo `questions.js` obtiene las preguntas asociadas a una encuesta específica.

De esta manera, se asegura que cada encuesta cargue únicamente las preguntas correspondientes a su configuración.

[questions.js](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/NodeJS/questions/questions.js)

## response

En la carpeta `response/` se encuentran dos archivos clave:

`getResponse.js` → Devuelve las respuestas ya almacenadas de una encuesta.

`postResponse.js` → Recibe y guarda las nuevas respuestas enviadas por los usuarios.

Estos endpoints permiten manejar tanto la consulta como el registro de información de manera organizada.

[getResponse.js](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/NodeJS/response/getResponse.js)

[postResponse.js](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/NodeJS/response/postResponse.js)

## surveys

Dentro de la carpeta `surveys/` se gestionan las encuestas propiamente dichas:

`create.js` → Permite crear una nueva encuesta en el sistema.

`survey.js` → Obtiene la información de una encuesta específica a partir de su ID único.

[create.js](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/NodeJS/surveys/create.js)

[survey.js](https://github.com/FernadoCodeDev/Survey-Container-Documentation/blob/main/Backend-Integration/NodeJS/surveys/survey.js)


</details>

</details>






















