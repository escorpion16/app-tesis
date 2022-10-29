import CustomModal from './CustomModal';
import { Form, Stack, InputGroup, Button } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { editarFactura } from '../functions/facturaCRUD';
import generateEmailNotification from '../functions/generateEmailNotification';

const ModalEditarFactura = ({
	mostrarModal,
	setMostrarModal,
	clientes,
	usuarios,
	factura,
	usuarioAutor,
	setFacturaAEditar,
	currentUserData,
}) => {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState('');

	// Información de factura

	const [facturaActual, setFacturaActual] = useState({ ...factura });
	const [cliente, setCliente] = useState(facturaActual?.cliente);
	const [comentario, setComentario] = useState(facturaActual?.comentario);
	const [equipos, setEquipos] = useState(facturaActual?.equipos);
	const [estado, setEstado] = useState(facturaActual?.estado);
	const [idFactura] = useState(facturaActual?.idFactura);
	const [precio, setPrecio] = useState(facturaActual?.precio);
	const [tecnico, setTecnico] = useState(facturaActual?.tecnico);

	useEffect(() => {
		setFacturaActual(factura);
		console.log(facturaActual);
	}, [factura, facturaActual]);

	if (!factura) return null;

	async function submitHandler(e) {
		e.preventDefault();
		setError('');

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

			let emailCliente = clientes.find(
				client => `${client.nombre} ${client.apellidos}` === cliente
			).email;

			await editarFactura(nuevoDocumento, usuarioAutor?.email);
			if (estado === 'Reparado') {
				generateEmailNotification(
					emailCliente,
					cliente,
					equipos.map(equipo => equipo.marca).join(', ')
				);
			}

			console.log('Final info: ', nuevoDocumento);

			setMostrarModal(false);
			setFacturaAEditar(null);
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
			operacion="Editar"
			submitHandler={submitHandler}
			error={error}
			cancel={() => {
				setFacturaActual(null);
				setFacturaAEditar(null);
			}}
		>
			<Form validated={validated} onSubmit={submitHandler}>
				<Stack>
					<Form.Control
						id="factura"
						enabled={false}
						placeholder={`Factura #00${idFactura}`}
						type="text"
						className="mb-1"
					/>
					{clientes && (
						<Form.Select
							id="cliente"
							aria-label="Default select"
							className="mb-1"
							value={cliente}
							disabled={currentUserData?.rol !== 'administrador'}
							onChange={e => setCliente(e.target.value)}
							required
						>
							<option key="cliente-default">{facturaActual?.cliente}</option>
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
									value={cliente.nombre + ' ' + cliente.apellidos}
								>
									{cliente.nombre + ' ' + cliente.apellidos}
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
									disabled={currentUserData?.rol !== 'administrador'}
									value={equipo.tipo}
									onChange={e => {
										let nuevosEquipos = [...equipos];
										nuevosEquipos[i].tipo = e.target.value;
										setEquipos([...nuevosEquipos]);
									}}
									required
								>
									<option key="tipo-default">{equipo.tipo}</option>
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
									disabled={currentUserData?.rol !== 'administrador'}
									onChange={e => {
										equipos[i].marca = e.target.value;
										setEquipos([...equipos]);
									}}
									required
								>
									<option key="marca-default">{equipo?.marca}</option>
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
									disabled={currentUserData?.rol !== 'administrador'}
									className="mb-1 w-75 mx-auto"
									value={equipo.serie}
									onChange={e => {
										equipos[i].serie = e.target.value;
										setEquipos([...equipos]);
									}}
									required
								/>

								<Form.Control
									id={`accesorios-${i}`}
									placeholder="Accesorios"
									type="text"
									disabled={currentUserData?.rol !== 'administrador'}
									className="mb-1 w-75 mx-auto"
									value={equipo.accesorios}
									onChange={e => {
										equipos[i].accesorios = e.target.value;
										setEquipos([...equipos]);
									}}
									required
								/>
								<Form.Control
									id={`servicio-${i}`}
									placeholder="Servicio"
									type="text"
									disabled={currentUserData?.rol !== 'administrador'}
									className="mb-1 w-75 mx-auto"
									value={equipo.servicio}
									onChange={e => {
										equipos[i].servicio = e.target.value;
										setEquipos([...equipos]);
									}}
									required
								/>

								{i + 1 < equipos.length && (
									<div
										className="w-100 bg-secondary"
										style={{ height: '1px' }}
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
									marca: '',
									serie: '',
									accesorios: '',
									servicio: '',
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
										marca: '',
										serie: '',
										accesorios: '',
										servicio: '',
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
						onChange={e => setEstado(e.target.value)}
						required
					>
						<option>{estado}</option>
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
						onChange={e => setComentario(e.target.value)}
						required
					/>
					<InputGroup className="mb-1">
						<InputGroup.Text>$</InputGroup.Text>
						<Form.Control
							id="precio"
							aria-label="Amount (to the nearest dollar)"
							value={precio}
							disabled={currentUserData?.rol !== 'administrador'}
							onChange={e => setPrecio(e.target.value)}
							required
						/>
					</InputGroup>

					{usuarios && (
						<Form.Select
							id="marca"
							aria-label="Default select"
							className="mb-1"
							value={tecnico}
							disabled={currentUserData?.rol !== 'administrador'}
							onChange={e => setTecnico(e.target.value)}
							required
						>
							<option value={tecnico} key="tecnico-default">
								{tecnico}
							</option>
							{usuarios.map(tecnico => (
								<option
									key={tecnico.nombre + tecnico.apellidos}
									value={tecnico.nombre + ' ' + tecnico.apellidos}
								>
									{tecnico.nombre + ' ' + tecnico.apellidos}
								</option>
							))}
						</Form.Select>
					)}
				</Stack>
			</Form>
		</CustomModal>
	);
};

export default ModalEditarFactura;
