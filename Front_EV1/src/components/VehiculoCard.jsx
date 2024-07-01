import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from '@mui/material';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'n_patente',
    headerName: 'Patente',
    width: 150,
    editable: false,
  },
  {
    field: 'marca',
    headerName: 'Marca',
    width: 150,
    editable: false,
  },
  {
    field: 'modelo',
    headerName: 'Modelo',
    width: 150,
    editable: false,
  },
  {
    field: 'tipo_auto',
    headerName: 'Tipo',
    editable: false,
    width: 150,

  },
  {
    field: 'anio_fabricacion',
    headerName: 'Año',
    editable: false,
    width: 150,

  },
  {
    field: 'tipo_motor',
    headerName: 'Motor',
    editable: false,
    width: 150,

  },
  {
    field: 'n_asientos',
    headerName: 'Asientos',
    editable: false,
    width: 150,

  },
];

export default function VehiculoCard() {

  const [data, setData] = useState(null);
  const [patente, setPatente] = useState("");


  const handleSubmit = () => {
    axios.delete(`http://localhost:8092/vehiculo/eliminar/${patente}`)
      .then(response => {
        console.log(response);
        alert("Vehículo eliminado");
        window.location.reload();
      })
      .catch(() => {
        alert("No se pudo eliminar el vehículo");
      });
  }

  useEffect(() => {
    axios.get('http://localhost:8092/vehiculo')
      .then(response => {
        const newData = response.data.map((item, index) => ({
          ...item,
          id: index, // Añade una propiedad `id` a cada fila
        }));
        setData(newData);
      })
      .catch(() => {
        alert("No hay vehículos registrados");
      });
  }, []);



  return (
    <Box sx={{ height: 371, width: '100%' }}>
      {data ? (
        <DataGrid
          rows={data}
          onCellClick={data => setPatente(data.row.n_patente)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}

        />

      ) : (
        <div>Cargando...</div>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        <Button
          variant='contained'
          color="error"
          onClick={handleSubmit}
        >
          Eliminar
        </Button>
      </Box>

    </Box>



  );
}