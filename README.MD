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


### Integración del lado del Front-End

<details>
<summary> Props del Front </summary>

| Prop               | Tipo                               | Obligatorio | Descripción                                                                                                                                                                                                                                                                           |
| ------------------ | ---------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `surveyId`         | `string`                           | ✅ Sí        | Es el ID de la encuesta que quieres mostrar. En esta demo se obtiene desde la URL usando `useParams()`.                                                                                                                                                                               |
| `fetchUrl`         | `string`                           | ✅ Sí      | Es la URL base para hacer la solicitud **GET** y obtener los datos de la encuesta. Por ejemplo: `http://localhost:3000/api/surveys/survey.php?id=`. Se añadirá automáticamente el `surveyId` al final.                               |
| `responseUrl`      | `string`                           | ✅ Sí      | Es la URL donde se envían las respuestas con una solicitud **POST**.                                                                                                                                          |
| `onAlert`          | `(message: string, type?: string)` | ❌ No        | Función que se ejecuta para mostrar una alerta dependiendo del estado de la encuesta (error, éxito, advertencia). Puedes personalizarla como quieras (modal, toast, etc.). En esta demo se usa la librería [`react-toastify`](https://fkhadra.github.io/react-toastify/introduction). |
| `apiUrl`           | `string`                           | ❌ No        | Si prefieres una URL base en lugar de `fetchUrl` o `responseUrl` individuales, puedes usar este prop como raíz para los endpoints `/surveys` y `/responses`. No se usa en esta demo.                                                                                                  |
| `onSubmit`         | `(responses) => Promise<void>`     | ❌ No        | Si quieres manejar tú mismo el envío de respuestas, puedes pasar tu propia función `onSubmit`. Si no se define, se hará un POST automáticamente a `responseUrl`.                                                                                                                      |
| `loadingText`      | `string`                           | ❌ No        | Texto que se muestra mientras la encuesta está cargando. Por defecto: `"Cargando encuesta..."`.                                                                                                                                                                                       |
| `submitButtonText` | `string`                           | ❌ No        | Texto del botón de envío. Por defecto: `"Enviar respuestas"`.                                                                                                                                                                                                                         |
| `className`        | `string`                           | ❌ No        | Clase CSS personalizada para aplicar estilos adicionales al contenedor del widget.                                                                                                                                                                                                    |


</details>

<details>
<summary> Integración con React </summary>

</details>

<details>
<summary> Integración con Vue </summary>

</details>

<details>
<summary> Integración con Angular </summary>

</details>



### Integración del lado del Back-End






















