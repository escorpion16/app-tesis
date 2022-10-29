import CustomModal from './CustomModal';
import { Form, Stack } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import escribirLog from '../functions/escribirLog';
// import { editarCliente } from "../functions/clienteCRUD";

const ModalEditarUsuario = ({
	mostrarModal,
	setMostrarModal,
	usuario,
	setUsuarioAEditar,
	usuarioAutor,
}) => {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState('');

	// Información del cliente

	const [usuarioActual, setUsuarioActual] = useState(usuario);

	const [idUsuario] = useState(usuarioActual?.id);
	const [nombre, setNombre] = useState(usuarioActual?.nombre);
	const [apellidos, setApellidos] = useState(usuarioActual?.apellidos);
	const [email] = useState(usuarioActual?.email);
	const [telefono, setTelefono] = useState(usuarioActual?.telefono);
	const [rol, setRol] = useState(usuarioActual?.rol);
	const [password, setPassword] = useState('');

	useEffect(() => {
		setUsuarioActual(usuario);
	}, [usuario]);

	if (!usuario) return null;

	async function submitHandler(e) {
		e.preventDefault();
		setError('');
		setValidated(false);

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			return;
		}

		setValidated(true);

		try {
			let nuevoDocumento = {
				id: idUsuario,
				nombre,
				apellidos,
				email,
				telefono,
				rol,
				password,
			};

			const res = await fetch(
				'https://us-central1-admin-app-tesis.cloudfunctions.net/updateUser',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(nuevoDocumento),
				}
			);

			console.log(res);

			if (res.status === 'success') {
				escribirLog('Edición', nuevoDocumento, usuarioAutor.email);
			}
			console.log('Final info: ', nuevoDocumento);

			setMostrarModal(false);
			setUsuarioAEditar(null);
		} catch (error) {
			setError(error?.message);
		}
	}

	return (
		<CustomModal
			mostrarModal={mostrarModal}
			setMostrarModal={setMostrarModal}
			tipo="Usuario"
			operacion="Editar"
			submitHandler={submitHandler}
			error={error}
			cancel={() => {
				setUsuarioActual(null);
				setUsuarioAEditar(null);
			}}
		>
			<Form validated={validated} onSubmit={submitHandler}>
				<Stack>
					<Form.Control
						id="idUsuario"
						placeholder={idUsuario}
						type="text"
						className="mb-1"
						disabled
					/>

					<Form.Control
						id="nombre"
						placeholder="nombre"
						type="text"
						className="mb-1"
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>

					<Form.Control
						id="apellidos"
						placeholder="apellidos"
						type="text"
						className="mb-1"
						value={apellidos}
						onChange={e => setApellidos(e.target.value)}
					/>

					<Form.Control
						id="email"
						placeholder="email"
						type="text"
						className="mb-1"
						disabled
						value={email}
					/>

					<Form.Control
						id="telefono"
						placeholder="telefono"
						type="text"
						className="mb-1"
						value={telefono}
						onChange={e => setTelefono(e.target.value)}
					/>

					<Form.Select
						id="rol"
						aria-label="Default select"
						className="mb-1"
						value={rol}
						onChange={e => setRol(e.target.value)}
					>
						<option value={rol} key="rol-default">
							{rol}
						</option>
						<option value="administrador">Administrador</option>
						<option value="tecnico">Técnico</option>
					</Form.Select>

					<Form.Control
						id="password"
						placeholder="Contraseña"
						type="password"
						className="mb-1"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</Stack>
			</Form>
		</CustomModal>
	);
};

export default ModalEditarUsuario;
