import React, { useEffect, useState } from 'react';
import { Container, Stack, Button, Form, Tabs, Tab } from 'react-bootstrap';

import InvoicesTable from '../components/InvoicesTable';
import ClientsTable from '../components/ClientsTable';
import UsersTable from '../components/UsersTable';

import signOut from '../functions/cerrarSesion';
import getCurrentUser from '../functions/getCurrentUser';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/credenciales';
import ModalNuevaFactura from '../components/ModalNuevaFactura';
import ModalEditarFactura from '../components/ModalEditarFactura';
import { eliminarFactura } from '../functions/facturaCRUD';

import ModalNuevoCliente from '../components/ModalNuevoCliente';
import ModalEditarCliente from '../components/ModalEditarCliente';
import { eliminarCliente } from '../functions/clienteCRUD';
import ModalNuevoUsuario from '../components/ModalNuevoUsuario';
import ModalEditarUsuario from '../components/ModalEditarUsuario';
import filtrarDatos from '../functions/filtrarDatos';

const NewHome = ({ usuario }) => {
	const [facturas, setFacturas] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	const [clientes, setClientes] = useState([]);
	const [facturasFiltradas, setFacturasFiltradas] = useState(null);
	const [usuariosFiltrados, setUsuariosFiltrados] = useState(null);
	const [clientesFiltrados, setClientesFiltrados] = useState(null);

	const [busqueda, setBusqueda] = useState('');

	const [mostrarModalNuevaFactura, setMostrarModalNuevaFactura] =
		useState(false);
	const [mostrarModalEditarFactura, setMostrarModalEditarFactura] =
		useState(false);
	const [facturaAEditar, setFacturaAEditar] = useState('');

	const [mostrarModalNuevoUsuario, setMostrarModalNuevoUsuario] =
		useState(false);
	const [mostrarModalEditarUsuario, setMostrarModalEditarUsuario] =
		useState(false);
	const [usuarioAEditar, setUsuarioAEditar] = useState(false);

	const [mostrarModalNuevoCliente, setMostrarModalNuevoCliente] =
		useState(false);
	const [mostrarModalEditarCliente, setMostrarModalEditarCliente] =
		useState(false);
	const [clienteAEditar, setClienteAEditar] = useState(false);

	const [isAdmin, setIsAdmin] = useState(false);
	const [currentUserData, setCurrentUserData] = useState(null);

	const obtenerUsuarioActual = async () => {
		try {
			const usuarioActual = await getCurrentUser();

			setCurrentUserData({
				...usuarioActual,
				fullName: usuarioActual.nombre + ' ' + usuarioActual.apellidos,
			});
			if (usuarioActual.rol === 'administrador') setIsAdmin(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		obtenerUsuarioActual();

		const unsubscribeFromInvoices = onSnapshot(
			collection(db, 'invoices'),
			snapshot => {
				const data = snapshot.docs.map(doc => doc.data());

				if (currentUserData?.rol === 'administrador') {
					// todo: filtrar si es admin o no y mostrar solo sus facturas
					setFacturas(data.sort((a, b) => +a.idFactura - +b.idFactura));
				} else {
					setFacturas(
						data
							.filter(factura => factura.tecnico === currentUserData?.fullName)
							.sort((a, b) => +a.idFactura - +b.idFactura)
					);
				}
			}
		);

		const unsubscribeFromUsers = onSnapshot(
			collection(db, 'users'),
			snapshot => {
				const data = snapshot.docs.map(doc => doc.data());
				console.log(data);

				setUsuarios(data.sort((a, b) => +a.id - +b.id));
			}
		);

		const unsubscribeFromClients = onSnapshot(
			collection(db, 'clients'),
			snapshot => {
				const data = snapshot.docs.map(doc => doc.data());
				console.log(data);

				setClientes(data.sort((a, b) => +a.id - +b.id));
			}
		);

		return () => {
			unsubscribeFromInvoices();
			unsubscribeFromUsers();
			unsubscribeFromClients();
		};
	}, [currentUserData?.rol, currentUserData?.fullName]);

	const [tabIndex, setTabIndex] = useState('home');

	return (
		<Container fluid>
			<ModalNuevaFactura
				mostrarModal={mostrarModalNuevaFactura}
				setMostrarModal={setMostrarModalNuevaFactura}
				clientes={clientes}
				usuarios={usuarios}
				usuarioAutor={usuario}
			/>

			{facturaAEditar && (
				<ModalEditarFactura
					mostrarModal={mostrarModalEditarFactura}
					setMostrarModal={setMostrarModalEditarFactura}
					factura={facturaAEditar}
					clientes={clientes}
					usuarios={usuarios}
					usuarioAutor={usuario}
					setFacturaAEditar={setFacturaAEditar}
					currentUserData={currentUserData}
				/>
			)}

			<ModalNuevoCliente
				mostrarModal={mostrarModalNuevoCliente}
				setMostrarModal={setMostrarModalNuevoCliente}
				usuarioAutor={usuario}
			/>

			{clienteAEditar && (
				<ModalEditarCliente
					mostrarModal={mostrarModalEditarCliente}
					setMostrarModal={setMostrarModalEditarCliente}
					cliente={clienteAEditar}
					setClienteAEditar={setClienteAEditar}
					usuarioAutor={usuario}
				/>
			)}

			<ModalNuevoUsuario
				mostrarModal={mostrarModalNuevoUsuario}
				setMostrarModal={setMostrarModalNuevoUsuario}
				usuarioAutor={usuario}
			/>

			{usuarioAEditar && (
				<ModalEditarUsuario
					mostrarModal={mostrarModalEditarUsuario}
					setMostrarModal={setMostrarModalEditarUsuario}
					usuario={usuarioAEditar}
					setUsuarioAEditar={setUsuarioAEditar}
					usuarioAutor={usuario}
				/>
			)}

			<Stack direction="horizontal" className="mt-3 justify-content-between">
				<p style={{ fontSize: 24 }}>
					Bienvenido, {usuario?.email} {isAdmin ? '(ADMIN)' : ''}
				</p>
				<Button onClick={signOut}>Cerrar sesión</Button>
			</Stack>
			<hr />

			<Form
				onSubmit={e => {
					e.preventDefault();
					if (busqueda) {
						setFacturasFiltradas(filtrarDatos(facturas, busqueda));
						setUsuariosFiltrados(filtrarDatos(usuarios, busqueda));
						setClientesFiltrados(filtrarDatos(clientes, busqueda));
					}
				}}
			>
				<Stack direction="horizontal">
					<Form.Group controlId="busqueda" className="w-75 m-3">
						<Form.Control
							type="text"
							placeholder="Buscar"
							onChange={e => setBusqueda(e.target.value)}
							value={busqueda}
						/>
					</Form.Group>
					<Button variant="dark" type="submit">
						Buscar
					</Button>
					<Button
						variant="light"
						className="m-3"
						onClick={e => {
							setBusqueda('');
							setFacturasFiltradas(null);
							setUsuariosFiltrados(null);
							setClientesFiltrados(null);
						}}
					>
						Resetear
					</Button>
				</Stack>
			</Form>

			<hr />

			<Tabs
				id="tab-container"
				activeKey={tabIndex}
				onSelect={k => setTabIndex(k)}
				className="mb-3"
			>
				<Tab eventKey="home" title="Facturas">
					<InvoicesTable
						facturas={facturasFiltradas ?? facturas}
						isAdmin={isAdmin}
						setMostrarModalNuevaFactura={setMostrarModalNuevaFactura}
						setFacturaAEditar={setFacturaAEditar}
						setMostrarModalEditarFactura={setMostrarModalEditarFactura}
						eliminarFactura={eliminarFactura}
						usuarioActual={usuario}
					/>
				</Tab>

				<Tab eventKey="clients" title="Clientes">
					<ClientsTable
						clientes={clientesFiltrados ?? clientes}
						isAdmin={isAdmin}
						setMostrarModalNuevoCliente={setMostrarModalNuevoCliente}
						setClienteAEditar={setClienteAEditar}
						setMostrarModalEditarCliente={setMostrarModalEditarCliente}
						eliminarCliente={eliminarCliente}
						usuarioActual={usuario}
					/>
				</Tab>

				<Tab eventKey="users" title="Usuarios">
					<UsersTable
						usuarios={
							isAdmin
								? usuariosFiltrados ?? usuarios
								: usuarios.filter(u => u.email === usuario.email)
						}
						isAdmin={isAdmin}
						setMostrarModalNuevoUsuario={setMostrarModalNuevoUsuario}
						setUsuarioAEditar={setUsuarioAEditar}
						setMostrarModalEditarUsuario={setMostrarModalEditarUsuario}
						// eliminarUsuario={eliminarUsuario}
						usuarioActual={usuario}
					/>
				</Tab>
			</Tabs>
		</Container>
	);
};

export default NewHome;
