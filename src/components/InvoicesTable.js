import { Table, Button } from "react-bootstrap";


const InvoicesTable = ({
  facturas,
  isAdmin,
  setFacturaAEditar,
  setMostrarModalEditarFactura,
  setMostrarModalNuevaFactura,
  eliminarFactura,
  usuarioActual,

  
}) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Factura</th>
            <th>Cliente</th>
            <th>Equipos</th>
            <th>Estado</th>
            <th>Comentario</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas &&
            facturas.map((invoice, index) => (
              <tr key={index}>
                <td>00{invoice?.idFactura}</td>
                <td>{invoice?.cliente}</td>
                <td>
                  {invoice?.equipos.map((equipo, i) => (
                    <div key={JSON.stringify(equipo) + i}>
                      <p>{`${i + 1}) ${equipo?.tipo} ${equipo?.marca} ${
                        equipo?.serie
                      }`}</p>
                      {equipo?.accesorios && (
                        <p>Accesorios: {equipo?.accesorios}</p>
                      )}
                      <p>Servicio: {equipo?.servicio}</p>
                    </div>
                  ))}
                </td>
                <td>{invoice?.estado}</td>
                <td>{invoice?.comentario}</td>
                <td>{invoice?.precio}</td>
                <td>
                  
                  <Button
                    variant="dark"
                    onClick={() => {
                      setFacturaAEditar({ ...invoice });
                      setMostrarModalEditarFactura(true);
                    }}
                  >
                    Editar
                  </Button>
                  
                  {isAdmin && (
                    <Button
                      variant="danger"
                      className="ms-3"
                      onClick={() =>
                        eliminarFactura(invoice, usuarioActual.email)
                      }
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
      <Button onClick={() => setMostrarModalNuevaFactura(true)}>
        Añadir factura
      </Button>
      )}
    </>
  );
};

export default InvoicesTable;
