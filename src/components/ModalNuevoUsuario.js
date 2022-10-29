import CustomModal from './CustomModal';
import { Form, Stack } from 'react-bootstrap';

import { useState } from 'react';
import escribirLog from '../functions/escribirLog';
// import getNumeroCliente from "../functions/getNumeroCliente";
// import { nuevoCliente } from "../functions/clienteCRUD";
// import incrementarNumeroCliente from "../functions/incrementarNumeroCliente";

const ModalNuevoUsuario = ({ mostrarModal, setMostrarModal, usuarioAutor }) => {
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState('');

	// Información de factura
	const [idUsuario, setIdUsuario] = useState('');
	const [nombre, setNombre] = useState('');
	const [apellidos, setApellidos] = useState('');
	const [email, setEmail] = useState('');
	const [telefono, setTelefono] = useState('');
	const [rol, setRol] = useState('');
	const [password, setPassword] = useState('');

	//   useEffect(() => {
	//     getNumeroCliente().then(setIdCliente);
	//   }, [mostrarModal]);

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

			//   await nuevoCliente(nuevoDocumento, usuarioAutor.email);
			//   await incrementarNumeroCliente(idCliente).then(() => {
			//     setIdCliente((prev) => prev + 1);
			//   });

			const res = await fetch(
				'https://us-central1-admin-app-tesis.cloudfunctions.net/createUser',
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
				escribirLog('Creación', nuevoDocumento, usuarioAutor.email);
			}
			console.log('Final info: ', nuevoDocumento);

			setMostrarModal(false);
			setValidated(false);

			setIdUsuario('');
			setNombre('');
			setApellidos('');
			setEmail('');
			setTelefono('');
			setRol('');
			setPassword('');
		} catch (error) {
			setError(error?.message);
		}
	}

	return (
		<CustomModal
			mostrarModal={mostrarModal}
			setMostrarModal={setMostrarModal}
			tipo="Usuario"
			operacion="Nuevo"
			submitHandler={submitHandler}
			error={error}
		>
			<Form validated={validated} onSubmit={submitHandler}>
				<Stack>
					<Form.Control
						id="idUsuario"
						placeholder={`AA1`}
						type="text"
						className="mb-1"
						value={idUsuario}
						onChange={e => setIdUsuario(e.target.value)}
						// disabled
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
						value={email}
						onChange={e => setEmail(e.target.value)}
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
						<option>Seleccionar rol</option>
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

export default ModalNuevoUsuario;
