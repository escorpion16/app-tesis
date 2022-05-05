import React from 'react';

import { Modal, Stack, Form, Button, InputGroup } from 'react-bootstrap';

import editarProducto from '../functions/editarProducto';
import generateEmailNotification from '../functions/generateEmailNotification';
import getNumeroFactura from '../functions/getNumeroFactura';

function ModalEditar({
	isModalEditar,
	setIsModalEditar,
	actualizarEstadoProductos,
	productoEditar,
	setProductoEditar,
	usuario,
}) {
	function editarProductoModal() {
		//obtener infor del formulario
		let infoProducto = {};
		infoProducto.equipo = document.getElementById('equipo').value;
		infoProducto.marca = document.getElementById('marca').value;
		infoProducto.serie = document.getElementById('serie').value;
		infoProducto.accesorios = document.getElementById('accesorios').value;
		infoProducto.estado = document.getElementById('estado').value;
		infoProducto.comentario = document.getElementById('comentario').value;
		infoProducto.precio = document.getElementById('precio').value;
		infoProducto.propietario = document.getElementById('propietario').value;
		infoProducto.cedula = document.getElementById('cedula').value;
		infoProducto.email = document.getElementById('email').value;
		infoProducto.telefono = document.getElementById('telefono').value;
		infoProducto.idFactura = productoEditar?.idFactura;
		// enviar informacion a firebase

		editarProducto(deviceState, usuario?.email);
		if (deviceState.estado === 'Reparado')
			generateEmailNotification(
				deviceState.email,
				deviceState.propietario,
				deviceState.equipo
			);
		// cerrar modal
		setProductoEditar(null);
		actualizarEstadoProductos();
		setIsModalEditar(false);
	}

	const [deviceState, setDeviceState] = React.useState({
		...productoEditar,
	});

	return (
		<Modal
			show={isModalEditar}
			onHide={() => {
				setIsModalEditar(false);
				setProductoEditar(null);
			}}>
			<Modal.Header>
				<Modal.Title>Editar equipo</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack>
						<Form.Control
							id="factura"
							type="text"
							className="mb-1"
							value={'00' + deviceState.idFactura}
							disabled
						/>
						<Form.Select
							id="equipo"
							aria-label="Default select"
							className="mb-1"
							value={deviceState.equipo}
							onChange={e => {
								setDeviceState({
									...deviceState,
									equipo: e.target.value,
								});
							}}>
							<option value="Impresora">Impresora</option>
							<option value="Laptop">Laptop</option>
							<option value="Smartphone">Smartphone</option>
							<option value="Monitor">Monitor</option>
							<option value="PC Desktop">PC Desktop</option>
							<option value="Tablet">Tablet</option>
						</Form.Select>

						<Form.Select
							id="marca"
							aria-label="Default select"
							className="mb-1"
							value={deviceState.marca}
							onChange={e => {
								setDeviceState({
									...deviceState,
									marca: e.target.value,
								});
							}}>
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
							id="serie"
							placeholder="serie"
							type="text"
							className="mb-1"
							value={deviceState.serie}
							onChange={e => {
								console.log(e.target.value);
								setDeviceState({
									...deviceState,
									serie: e.target.value,
								});
							}}
						/>

						<Form.Control
							id="accesorios"
							placeholder="accesorios"
							type="text"
							className="mb-1"
							value={deviceState.accesorios}
							onChange={e => {
								setDeviceState({
									...deviceState,
									accesorios: e.target.value,
								});
							}}
						/>

						<Form.Select
							id="estado"
							aria-label="Default select example"
							className="mb-1"
							value={deviceState.estado}
							onChange={e => {
								setDeviceState({
									...deviceState,
									estado: e.target.value,
								});
							}}>
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
							value={deviceState.comentario}
							onChange={e => {
								setDeviceState({
									...deviceState,
									comentario: e.target.value,
								});
							}}
						/>

						<InputGroup className="mb-1">
							<InputGroup.Text>$</InputGroup.Text>
							<Form.Control
								id="precio"
								aria-label="Amount (to the nearest dollar)"
								value={deviceState.precio}
								onChange={e => {
									setDeviceState({
										...deviceState,
										precio: e.target.value,
									});
								}}
							/>
						</InputGroup>

						<Form.Control
							id="propietario"
							placeholder="propietario"
							type="text"
							className="mb-1"
							value={deviceState.propietario}
							onChange={e => {
								setDeviceState({
									...deviceState,
									propietario: e.target.value,
								});
							}}
						/>

						<Form.Control
							id="cedula"
							placeholder="cedula"
							type="text"
							className="mb-1"
							value={deviceState.cedula}
							onChange={e => {
								setDeviceState({
									...deviceState,
									cedula: e.target.value,
								});
							}}
						/>

						<Form.Control
							id="email"
							placeholder="email"
							type="text"
							className="mb-1"
							value={deviceState.email}
							onChange={e => {
								setDeviceState({
									...deviceState,
									email: e.target.value,
								});
							}}
						/>

						<Form.Control
							id="telefono"
							placeholder="telefono"
							type="text"
							value={deviceState.telefono}
							onChange={e => {
								setDeviceState({
									...deviceState,
									telefono: e.target.value,
								});
							}}
						/>
					</Stack>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => {
						setIsModalEditar(false);
						setProductoEditar(null);
					}}>
					Cancelar
				</Button>
				<Button variant="primary" onClick={editarProductoModal}>
					Editar
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalEditar;
