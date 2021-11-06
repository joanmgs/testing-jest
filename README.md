Para poder realizar los test, hasta el momento:

1. instale aunque no estoy seguro si sea necesaria esta (más básica):
    yarn add --dev react-test-renderer 
o esta (más completa, y creo que es la que debe instalarse): 
    yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
Aquí se instala react-test-renderer que es la librería para poder renderizar componentes de react
y los otros son para hacer uso de babel y que funcione con el siguiente paso la lectura de archivos .jsx
El link con esta información: 
* https://www.npmjs.com/package/jest-css-modules

2. Luego cree el archivo babel.config.js en la carpeta raíz (es decir, es hermano de la carpeta src, json...)
y le agregue lo siguiente:
    module.exports = {
        presets: ['@babel/preset-env', '@babel/preset-react'],
    };
Para que pueda realizar sin problemas la lectura de los archivos .jsx
Link con esta información:
* https://stackoverflow.com/questions/63005011/support-for-the-experimental-syntax-jsx-isnt-currently-enabled

3. Lo siguiente es que los componentes a probar deben tener importado react, es decir, deben tener:
    import React from "react";
También el archivo test.js debe tenerlo, adicionalmente a este para hacer las pruebas de renderizado de componente específico importar react-test-renderer:
    import renderer from "react-test-renderer";
No hay link esto lo solucione probando xD

4. Para que funcione también debe activarse la lectura del CSS para esto instalar:
    npm i jest-css-modules
y luego en el package.json (si, en ese mismo, no en el package-lock.json), debajo de "name", agregar:
    "jest": {
        "moduleNameMapper": {
            "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
        }
    },
Aquí el link a la librería: https://www.npmjs.com/package/jest-css-modules

5. Hasta aquí ya deberían funcionar las pruebas con el comando que se le haya indicado en el package json. En este archivo cree dos comandos:
    "test": "jest",
    "test:update": "yarn test -u",
    "test:coverage": "jest --coverage"
el primero npm run test o npm test
el segundo para actualizar el snapshot 
el tercero para hacer el informe. Este crea una carpeta en la raíz llamad coverage, si ingresa a la carpeta Icov-report, y luego al index.html y se le da open with Live Server (con click derecho), aparecerá una página con todo el informe más visual.

6. Cuando se están realizando tests con @testing-library/react es necesario agregar en el package.json al jest:
    "testEnvironment": "jsdom"
Aquí la razón más clara:
* https://stackoverflow.com/questions/69227566/consider-using-the-jsdom-test-environment


---- Documentos extra que estuve revisando para usar Jest
* Matchers: https://jestjs.io/docs/using-matchers
* React testing library API: https://testing-library.com/docs/react-testing-library/api
* Queries: https://testing-library.com/docs/queries/byrole
* Mathcers adicionales y personalizados: https://github.com/testing-library/jest-dom (es la librería jsdom)
