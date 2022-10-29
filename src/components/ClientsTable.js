import { Button, Table } from "react-bootstrap";

const ClientsTable = ({
  clientes,
  isAdmin,
  setClienteAEditar,
  setMostrarModalEditarCliente,
  setMostrarModalNuevoCliente,
  eliminarCliente,
  usuarioActual,
}) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {isAdmin && (
        <tbody>
          {clientes &&
            clientes.map((client, index) => (
              <tr key={index}>
                <td>{client.id}</td>
                <td>{client.dni}</td>
                <td>{client.nombre}</td>
                <td>{client.apellidos}</td>
                <td>{client.email}</td>
                <td>{client.telefono}</td>

                <td>
                  {isAdmin && (
                  <Button
                    variant="dark"
                    onClick={() => {
                      setClienteAEditar({ ...client });
                      setMostrarModalEditarCliente(true);
                    }}
                  >
                    Editar
                  </Button>
                  )}
                  {isAdmin && (
                    <Button
                      variant="danger"
                      className="ms-3"
                      onClick={() => {
                        eliminarCliente(client, usuarioActual.email);
                      }}
                    >
                      Eliminar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      )}
      </Table>
      {isAdmin && (
      <Button onClick={() => setMostrarModalNuevoCliente(true)}>
        Añadir cliente
      </Button>
      )}
    
    </>
  );
};

export default ClientsTable;
