import React from 'react';
import getDeviceStatus from '../functions/getDeviceStatus';

function Index() {
	const [inputValue, setInputValue] = React.useState('');
	const [estatus, setEstatus] = React.useState(undefined);
	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				display: 'grid',
				placeContent: 'center',
			}}>
			<h1>Estatus:</h1>
			<div style={{ width: '50%', display: 'flex', margin: '0 auto' }}>
				<input
					type="text"
					placeholder="Ingresa id o factura"
					id="search-status"
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
				/>
				<button onClick={() => getDeviceStatus(inputValue).then(setEstatus)}>
					Buscar
				</button>
			</div>

			{estatus === null && (
				<p style={{ textAlign: 'center' }}>
					No se encontró el dispositivo, pruebe con otra factura o id.
				</p>
			)}
			{(estatus !== null) & (estatus !== undefined) ? (
				<p>
					{' '}
					El <strong>{estatus.equipo}</strong> de{' '}
					<strong> {estatus.propietario}</strong> se encuentra la fase:{' '}
					<strong>{estatus.estado}</strong>
				</p>
			) : null}
		</div>
	);
}

export default Index;
