# Test programación Lab Banco Bice + Douglas Ibáñez

Este proyecto es una aplicación desarrollada en Angular versión 12.0.2, y se ejecuta sobre NodeJS versión 14.15.0.

Permite obtener datos de indicadores financieros desde la API http://indecon.site/last.
Una vez ya obtenidos los datos, la aplicación permite manipularlos con un objeto local.
Se utiliza como fuente el siguiente tutorial: https://bezkoder.com/angular-12-crud-app/

# ¿Qué hay de nuevo?
+ Permite acciones de listado, ver detalle, agregar y eliminar datos.
+ Persistencia local de datos a través de objeto service.
+ Configuración de proxy para evitar error CORS (Cross-Origin Resource Sharing) al consumir servicios desde API.
+ Custom Pipe, para corrección de ortografía de datos extraídos de la API.
+ Manejo de caché, para que la llamada a API se ejecute sólo 1 vez.
+ Validaciones de formulario.
+ Control de errores.
+ Configuración regional "locale es-CL", para visualización de datos numéricos y decimales.
+ Test unitarios para el service que consume le API.

# Instalación
1. git clone https://github.com/dougibanez/bicelab-test.git
2. npm install
3. npm install --save lodash
4. npm install --save-dev @types/lodash
5. npm start

# Test unitarios
1. ng test
