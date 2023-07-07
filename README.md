# DoSomethingApp

# Sobre la Aplicación

Plataforma que entrega actividades aleatorias provenientes de la API `https://www.boredapi.com/`. Se puede indicar el tipo de actividad y la cantidad de participantes para la siguiente búsqueda. Además de poder guardar (o eliminar) aquellas que se desea en la lista "Actividades para hacer". Permite crear usuarios y luego ingresar con dichas cuentas.
"DoSomethingApp" es un proyecto puramente Frontend realizado con 'React + Typescript', 'Context' para gestión de estados globales, para estilos se utilizaron componentes de la librería 'React Bootstrap', 'SweetAlert2' para las alertas, 'CSSModules' y "Estilos en línea".
Aclaración: Cómo es un proyecto exclusivamente FrontEnd, los datos de los usuarios quedan alojados en el localStorage, pero si se actualiza la página se perderan los datos del estado global de Context, no persisistiendo las actividades guardadas.

# Para correrla localmente

Clonar el Repositorio en un directorio local.

- Abrir una terminal parado sobre la carpeta raiz y ejecutar: 

npm install

`npm install --force` en caso de que ocurra algun error a la hora de la instalación <br/>

Luego ejececutar:

npm start

Se abrirá una pestaña del navegador en el puerto 3000

===========================================================================================================

# About App

Platform that delivers random activities from the API `https://www.boredapi.com/`. You may indicate the type of activity and the number of participants for the next search. Also you can save (or remove) those activities you want in "Activities to do" list. App allows creating and loging users.
"DoSomethingApp" is a purely Frontend project made with 'React + Typescript', 'Context' for managing of global states. For Styles: components from 'React Bootstrap' library, 'SweetAlert2' for alerts, 'CSSModules' and 'Inline Styles".
Spoiler comment: App is an exclusively FrontEnd project so users data is stored in the localStorage, but if the page is updated, data of global state of Context will be lost, and the saved activities will not persist.

# Run locally

Clone the repository in a local directory.

- On root directory open a terminal and run:

npm install

`npm install --force` in case of error at instalation <br/>

Then run:

npm start

It will open a browser tab on PORT 3000
