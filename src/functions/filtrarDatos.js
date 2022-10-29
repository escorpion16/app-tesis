const filtrarDatos = (datos, filtro) => {
  // TODO: Filtrar por equipos

  return datos.filter((dato) => {
    return Object.values(dato).some((valor) => {
      return valor.toString().toLowerCase().includes(filtro.toLowerCase());
    });
  });
};

export default filtrarDatos;
