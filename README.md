# Proyecto Books

El siguiente proyecto soportar las necesidades de una tienda de alquiler de
libros.

---
## Requerimientos

Para el desarrollo, solo necesitará Node.js y un paquete global de nodo, npm, instalado en su entorno.

### Node
- #### Node instalacion en widows

  simplemente [official Node.js website](https://nodejs.org/) y descargue el instalador.
Además, asegúrese de tener `git` disponible en su PATH,` npm` podría necesitarlo (puede encontrar (git [here](https://git-scm.com/)).

- #### Node instalacion en Ubuntu

  Puede instalar nodejs y npm fácilmente con apt install, simplemente ejecute los siguientes comandos..

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Otros sistemas operativos
  Puede encontrar más información sobre la instalación en el [official Node.js website](https://nodejs.org/) y ene [official NPM website](https://npmjs.org/).

Si la instalación fue exitosa, debería poder ejecutar el siguiente comando.

    $ node --version
    v

    $ npm --version
    v

Si necesita actualizar `npm`, puede hacerlo usando.
    
    $ npm install npm -g

---

## Instalacion

    $ https://github.com/farango0728/books.git
    $ cd books
    $ npm install

## Configure app

Crear el archivo .env y configurar las siguientes variables

- PPName = 
- DBDriver = 
- DBHost = 
- DBUser = 
- DBName = 
- DBPassword = 
- TOKEN_SECRET = 

## Ejecutar en Desarrollo

    $ npm run dev

## Ejecutar en Produccion

    $ npm run build
    
## Ejecutar en Test
  Al Hacer las pruebas tener encuenta que la base de datos se encuentra relacionado. cuidado con los insert en la base de datos

    $ npm run test

---
## Tecnologias implementadas
- ### Nodejs
  [official Node.js website](https://nodejs.org/)
- ### Hapi
  [official Hapi website](https://hapi.dev/)
- ### Base de datos Mysql
  [official Mysql website](https://www.mysql.com/)
- ### TypeOrm
  [official Typeorm website](https://typeorm.io/)
- ### Jest
  [official Jest website](https://jestjs.io/)
- ### Typescript
  [official typescript website](https://www.typescriptlang.org/)

---
## Documentacion Api
- ### Insomnia Design
  [official Insomnia Design website](https://insomnia.rest/product/design)
---

## Edictor Codigo
- ### Visual Studio Code
  [official visual Studio code website](https://code.visualstudio.com/)
  
  ---

## Cliente HTTP
- ### Postman
  [official postman website](https://www.postman.com/)
  
    ---

## Data Fake
- ### Fake
  llamar al enpoint http://localhost:9000/api/fake/db
  
- #### usario admin = pruebaAdmin@gmail.com y password = 987654321
- #### usuario cliente = prueba@gmail.com y password =    123456789


## Autenticación y Autorización
- ### Autenticacion
-
![image](https://user-images.githubusercontent.com/20598508/112151514-4d754200-8baf-11eb-9401-8118e404abe2.png)
  
- ### Autorización

- se efectua en login, el sistema genera el token, ese token se debe de colocar en cada llamado de los enpoint
-![image](https://user-images.githubusercontent.com/20598508/112151857-ae9d1580-8baf-11eb-81e3-913b8f22cd6e.png)

- se validad el scope del usuario para los ingresos a los enpoint
