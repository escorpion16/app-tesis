import CustomModal from "./CustomModal";
import getNumeroFactura from "../functions/getNumeroFactura";
import { Form, Stack, InputGroup, Button } from "react-bootstrap";

import { useState, useEffect } from "react";
import incrementarNumeroFactura from "../functions/incrementarNumeroFactura";
import { nuevaFactura } from "../functions/facturaCRUD";

const ModalNuevaFactura = ({
  mostrarModal,
  setMostrarModal,
  clientes,
  usuarios,
  usuarioAutor,
}) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  // const [modo, setModo] = useState("");

  // Información de factura
  const [cliente, setCliente] = useState("");
  const [comentario, setComentario] = useState("");
  const [equipos, setEquipos] = useState([
    {
      marca: "",
      serie: "",
      accesorios: "",
      servicio: "",
    },
  ]);
  const [estado, setEstado] = useState("");
  const [idFactura, setIdFactura] = useState(-1);
  const [precio, setPrecio] = useState(0);
  const [tecnico, setTecnico] = useState("");

  useEffect(() => {
    getNumeroFactura().then(setIdFactura);
  }, [mostrarModal]);

  async function submitHandler(e) {
    e.preventDefault();
    setError("");
    setValidated(false);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    setValidated(true);

    try {
      let nuevoDocumento = {
        idFactura,
        cliente,
        comentario,
        equipos,
        estado,
        precio,
        tecnico,
      };

      await nuevaFactura(nuevoDocumento, usuarioAutor.email);
      await incrementarNumeroFactura(idFactura).then(() =>
        setIdFactura((prev) => prev + 1)
      );

      console.log("Final info: ", nuevoDocumento);

      setMostrarModal(false);
      setCliente("");
      setComentario("");
      setEquipos([]);
      setEstado("");
      setPrecio(0);
      setTecnico("");
      setEquipos([
        [
          {
            marca: "",
            serie: "",
            accesorios: "",
            servicio: "",
          },
        ],
      ]);
      setValidated(false);
    } catch (error) {
      setError(error?.message);
    }
  }

  return (
    <CustomModal
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      tipo="Factura"
      operacion="Nueva"
      submitHandler={submitHandler}
      error={error}
    >
      <Form validated={validated} onSubmit={submitHandler}>
        <Stack>
          <Form.Control
            id="factura"
            placeholder={`Factura #00${idFactura}`}
            type="text"
            className="mb-1"
            disabled
          />
          {clientes && (
            <Form.Select
              id="cliente"
              aria-label="Default select"
              className="mb-1"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            >
              <option key="cliente-default">Seleccionar cliente</option>
              <option
                key="cliente-nuevo"
                onClick={() => {
                  // setIsModalAñadir(false);
                  // setIsModalAñadirCliente(true);
                  setMostrarModal(false);
                }}
              >
                Nuevo cliente
              </option>
              {clientes.map((cliente, i) => (
                <option
                  key={cliente.nombre + i}
                  value={cliente.nombre + " " + cliente.apellidos}
                >
                  {cliente.nombre + " " + cliente.apellidos}
                </option>
              ))}
            </Form.Select>
          )}

          {equipos &&
            equipos.map((equipo, i) => (
              <div key={i}>
                <Form.Select
                  id={`tipo-${i}`}
                  aria-label="Default select"
                  className="mb-1 w-75 mx-auto"
                  value={equipo.tipo}
                  onChange={(e) => {
                    let nuevosEquipos = [...equipos];
                    nuevosEquipos[i].tipo = e.target.value;
                    setEquipos([...nuevosEquipos]);
                  }}
                >
                  <option key="tipo-default">Seleccionar tipo</option>
                  <option value="laptop">Laptop</option>
                  <option value="pc">PC</option>
                  <option value="tablet">Tablet</option>
                  <option value="impresora">Impresora</option>
                  <option value="monitor">Monitor</option>
                  <option value="teléfono">Teléfono</option>
                  <option value="otro">Otro</option>
                </Form.Select>

                <Form.Select
                  id={`marca-${i}`}
                  aria-label="Default select"
                  className="mb-1 w-75 mx-auto"
                  value={equipo.marca}
                  onChange={(e) => {
                    equipos[i].marca = e.target.value;
                    setEquipos([...equipos]);
                  }}
                >
                  <option key="marca-default">Seleccionar marca</option>
                  <option value="Apple">Apple</option>
                  <option value="Dell">Dell</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Lexmark">Lexmark</option>
                  <option value="Canon">Canon</option>
                  <option value="LG">LG</option>
                  <option value="HP">HP</option>
                  <option value="Asus">Asus</option>
                  <option value="Acer">Acer</option>
                  <option value="Alienware">Alienware</option>
                  <option value="Razer">Razer</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Xiaomi">Xiaomi</option>
                </Form.Select>

                <Form.Control
                  id={`serie-${i}`}
                  placeholder="Serie"
                  type="text"
                  className="mb-1 w-75 mx-auto"
                  value={equipo.serie}
                  onChange={(e) => {
                    equipos[i].serie = e.target.value;
                    setEquipos([...equipos]);
                  }}
                />
                <Form.Control
                  id={`accesorios-${i}`}
                  placeholder="Accesorios"
                  type="text"
                  className="mb-1 w-75 mx-auto"
                  value={equipo.accesorios}
                  onChange={(e) => {
                    equipos[i].accesorios = e.target.value;
                    setEquipos([...equipos]);
                  }}
                />
                <Form.Control
                  id={`servicio-${i}`}
                  placeholder="Servicio"
                  type="text"
                  className="mb-1 w-75 mx-auto"
                  value={equipo.servicio}
                  onChange={(e) => {
                    equipos[i].servicio = e.target.value;
                    setEquipos([...equipos]);
                  }}
                />

                {i + 1 < equipos.length && (
                  <div
                    className="w-100 bg-secondary"
                    style={{ height: "1px" }}
                  ></div>
                )}
              </div>
            ))}
          <Button
            className="mb-1"
            onClick={() =>
              setEquipos([
                ...equipos,
                {
                  marca: "",
                  serie: "",
                  accesorios: "",
                  servicio: "",
                },
              ])
            }
          >
            Nuevo equipo
          </Button>
          <Button
            variant="danger"
            className="mb-1 "
            onClick={() => {
              if (equipos > 1) {
                setEquipos([...equipos.slice(0, equipos.length - 1)]);
              } else {
                setEquipos([
                  {
                    marca: "",
                    serie: "",
                    accesorios: "",
                    servicio: "",
                  },
                ]);
              }
            }}
          >
            Quitar equipo
          </Button>
          <Form.Select
            id="estado"
            aria-label="Default select example"
            className="mb-1"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option>Seleccionar estado</option>
            <option value="Ingresado">Ingresado</option>
            <option value="Diagnostico">Diagnostico</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Reparado">Reparado</option>
            <option value="Entregado">Entregado</option>
          </Form.Select>
          <Form.Control
            id="comentario"
            placeholder="comentario"
            type="text"
            className="mb-1"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
          <InputGroup className="mb-1">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              id="precio"
              aria-label="Amount (to the nearest dollar)"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </InputGroup>
          {usuarios && (
            <Form.Select
              id="marca"
              aria-label="Default select"
              className="mb-1"
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
            >
              <option key="tecnico-default">Seleccionar técnico</option>
              {usuarios.map((tecnico) => (
                <option
                  key={tecnico.nombre + tecnico.apellidos}
                  value={tecnico.nombre + " " + tecnico.apellidos}
                >
                  {tecnico.nombre + " " + tecnico.apellidos}
                </option>
              ))}
            </Form.Select>
          )}
        </Stack>
      </Form>
    </CustomModal>
  );
};

export default ModalNuevaFactura;
