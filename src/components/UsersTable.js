import { Button, Table } from "react-bootstrap";

const UsersTable = ({
  usuarios,
  isAdmin,
  setUsuarioAEditar,
  setMostrarModalEditarUsuario,
  setMostrarModalNuevoUsuario,
  eliminarUsuario,
  usuarioActual,
}) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios &&
            usuarios.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.apellidos}</td>
                <td>{user.email}</td>
                <td>{user.telefono}</td>
                <td>{user.rol}</td>

                <td>
                  {isAdmin && (
                  <Button
                    variant="dark"
                    onClick={() => {
                      setUsuarioAEditar({ ...user });
                      setMostrarModalEditarUsuario(true);
                    }}
                  >
                    Editar
                  </Button>
                  )}
                  {isAdmin && (
                    <Button
                      variant="danger"
                      className="ms-3"
                      onClick={async () => {
                        const res = await fetch(
                          "https://us-central1-admin-app-tesis.cloudfunctions.net/deleteUser",
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              id: user.id,
                              email: user.email,
                            }),
                          }
                        );

                        const data = await res.json();
                        console.log(data);
                      }}
                    >
                      Eliminar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {isAdmin && (
      <Button onClick={() => setMostrarModalNuevoUsuario(true)}>
        Añadir usuario
      </Button>
      )}
    </>
  );
};

export default UsersTable;
