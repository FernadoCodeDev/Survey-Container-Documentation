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
     fetchUrl="Ruta para obtener encuesta"
     responseUrl="Ruta para guardar respuestas"
     onAlert="Función para mostrar alertas. Puedes usar react-toastify"
     />
    </div>

  );
}

export default SurveyContainer;
```


</details>

<details>
<summary> Integración con Vue </summary>

</details>

<details>
<summary> Integración con Angular </summary>

</details>

</details>



<details>
<summary>⚙️ Integración del lado del Back-End</summary>

<details>
<summary> Tablas de la base de datos </summary>

</details>

<details>
<summary> Integración con PHP </summary>

</details>

<details>
<summary> Integración con Node.JS </summary>

</details>

</details>






















