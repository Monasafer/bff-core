to run :    
    npm run start


--------------------------------------------------------------------------------------------
Direcciones

Para gastos:
    /expend    -> Muestra todos los gastos de todos los usuarios
    /expendelete  -> Muestra todos los gastos eliminados de todos los usuarios
    /expend/:user_id -> Muestra gastos pasandole codigo de usuario
    /expendelete/:user_id  -> Muestra gastos borrados por usuario
    /expend    -> Ingresar nuevo valor(POST)
    /expend/:expen_id -> Con put le pasamos el codigo de gasto que queremos modificar
    /expendelete/:expen_id -> Con put y el codigo de gasto lo modificamos a state_code 0

Para Mona:
    /mona   ->Muestra totalidad de valores 
    /monadelete ->Muestra todos los valores eliminados
    /mona/:user_id ->Mona por Usuario
    /monadelete/:user_id ->Mona eliminado por usuario
    /mona ->Con post para ingresar un nuevo valor
    /mona/:mona_id ->Modificar ingresando codigo de mona
    /monadelete/:mona_id ->Eliminar registro con id

Para Users:
    /user ->Muestra todos los usuarios
    /user/:user_id ->Busqueda de usuario
    /Createuser ->Crea usuario, verifica que el mail sea correcto (POST)
    /dash/:id ->Muestra totales por usuario

Para Ahorros:
    /save -> Muestra todos los ahorros
    /savedelete -> Ahorros eliminados
    /save/:user_id -> Ahorros por usuario
    /save -> Creacion de ahorro (POST)
    /save/:save_id -> Modificar ahorro (PUT)
    /savedelete/:save_id ->Eliminar ahorro(PUT)