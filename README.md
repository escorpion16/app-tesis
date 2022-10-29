# Fix my phone

## Instrucciones

Antes de comenzar a trabajar no olvides añadir las credenciales de tu aplicación en src/firebase/credenciales.js

- Ejecuta npm install
- Añade tus credenciales en src/firebase/credenciales
- Ejecuta npm start para correr el ambiente de desarrollo

## Todos completados

- Eliminar comentario, precio y accesorio como campos de búsqueda
- Se puede buscar estatus por cedula y id de factura
- Al buscar el estado de un equipo se devuelve el equipo, propietario y estado

## Todos completados (17/07/2022)

- [x] Retroalimentación visual al ingresar con un correo o contraseña erróneos
- [x] Vista para crear usuarios administradores y técnicos
  - [x] Crear, modificar o eliminar
- Roles
  - Administrador
    - [x] Usuarios: Crear, modificar, eliminar usuarios
    - [x] Equipos: Eliminar
    - [x] Clientes: Eliminar
  - Técnico
    - [x] Equipo: Crear, modificar
    - [x] Cliente: Crear
- [x] Selección de técnico al añadir un equipo
- [x] Nueva vista de facturas
- [x] Actualizar modal de edición de facturas

## Todos nuevos (18/07/2022)

- [x] Clientes: ID autoincremental
- [x] Función para crear usuario sin iniciar sesión inmediatamente
- [x] Usuarios: Refresh en nuevo usuario
- [x] Usuarios: Eliminar usuario y documento de Firestore
- [x] Facturas: Refresh
- [x] Facturas: Select para elegir tipo [laptop, pc, tablet, impresora, monitor]
- [ ] Buscador \*\*\*
- [ ] Arreglar nuevo buscador de index para reflejar el nuevo modelo

## lasfito

Mejoras en la app:
1.- En el perfil técnico solo debe mostrarse las facturas que están asignadas al técnico que ingreso al sistema.

2.- el técnico solo podrá modificar en el modal editar: comentario y estados. Los otros campos deben estar inhabilitados.

3.- Revisar la extensión Tigger email para que se envíe el email de notificación al cliente.
