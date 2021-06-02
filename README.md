to run :    
    npm run start


--------------------------------------------------------------------------------------------
Direcciones

Para gastos:
    /expend  -> GET:. Header seleccionas usuario, si el usuario se pasa como 0 muestra total de registros. Por parametro seleccionar gastos activos o ya borrados ['user-id']
    /expend  -> POST: Ingresar nuevo valor pasando el HEADER ID DEL USUARIO ['user-id']
    /expend  -> PUT: enviamos por header id de gasto a modificar (expen-id)
    /expend -> DELETE: codigo de gasto por header (expen-id)
    /expendate -> GET: fechas starDate, endDate por params. Usuario por header

Para Mona:
    /mona   -> GET:. Header seleccionas usuario, si el usuario se pasa como 0 muestra total de registros. Por parametro seleccionar gastos activos o ya borrados ['user-id']
    /mona   -> POST: Ingresar nuevo valor pasando el HEADER ID DEL USUARIO ['user-id']
    /mona -> PUT: enviamos por header id de gasto a modificar (mona-id)
    /monadelete/:mona_id -> DELETE: codigo de mona por header (mona-id)
    /monadates -> GET: fechas starDate, endDate por params. Usuario por header ['user-id']

Para Users:
    /user -> GET. ['user-id'] = 0 y state_code en params = 1, muestra todos los usuarios activos. Se pueden buscar usuarios pasando su id
    /user -> POST Creacion de usuario
    /user -> DELETE Cambia su state a 0 pasando id por heade ['user-id']
    /dash ->Muestra totales por usuario con header ['user-id']

Para Ahorros:
    /save -> Muestra todos los ahorros
    /savedelete -> Ahorros eliminados
    /save/:user_id/:state_code -> Ahorros por usuario
    /save -> Creacion de ahorro (POST)
    /save/:save_id -> Modificar ahorro (PUT)
    /savedelete/:save_id ->Eliminar ahorro(PUT)
    /save/:user_id/:startDate/:endDate -> saves entre fechas por usuario