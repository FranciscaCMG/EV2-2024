import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Grid } from '@mui/material';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'n_patente',
        headerName: 'Patente',
        width: 150,
        editable: false,
    },
    {
        field: 'fecha_ing',
        headerName: 'Fecha Ingreso',
        width: 180,
        editable: false,
    },
    {
        field: 'hora_ing',
        headerName: 'Hora Ingreso',
        width: 180,
        editable: false,
    },
    {
        field: 'fecha_sal',
        headerName: 'Fecha Listo',
        width: 180,
        editable: false,
    },
    {
        field: 'fecha_sal_cli',
        headerName: 'Fecha Salida',
        editable: false,
        width: 180,

    },
    {
        field: 'monto_total',
        headerName: 'Monto Total',
        editable: false,
        width: 180,
    },

];

export default function VehiculoCard() {

    const [data, setData] = useState(null);
    const [id, setId] = useState("");

    function fechaIng(fechaCompleta) {
        let fecha = fechaCompleta.split(",");
        return fecha[1];
    }

    function horaIng(fechaCompleta) {
        let fecha = fechaCompleta.split(",");
        return fecha[2];
    }

    function fechaActualyHora() {
        var fecha = new Date();

        var diaSemana = fecha.toLocaleDateString("es-CL", { weekday: 'long', timeZone: "America/Santiago" });
        var fechaActual = fecha.toLocaleString("es-CL", { timeZone: "America/Santiago" });

        // Convertir a mayúsculas y eliminar tildes
        diaSemana = diaSemana.toUpperCase();
        diaSemana = diaSemana.normalize("NFD").replace(/[\u0300-\u036f]/g, "");



        return diaSemana + "," + fechaActual;
    }

    const handleSubmit = () => {
        var fecha = fechaActualyHora();
        var fecha_sal = fechaIng(fecha);
        var hora_sal = horaIng(fecha);

        console.log("Fecha y Hora de Salida", fecha_sal, hora_sal);
        console.log("ID de la reparación", id);

        axios.patch(`http://localhost:8093/reparacion/modificarListo/${id}/${fecha_sal}/${hora_sal}`)
            .then(response => {
                console.log("Se editó la reparación Listo", response.data);
                alert("Reparación Lista");
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });

    };

    const handleSubmit2 = () => {
        var fecha = fechaActualyHora();
        var fecha_sal = fechaIng(fecha);
        var hora_sal = horaIng(fecha);

        console.log("Fecha y Hora de Salida", fecha_sal, hora_sal);
        console.log("ID de la reparación", id);

        axios.patch(`http://localhost:8093/reparacion/modificarSalida/${id}/${fecha_sal}/${hora_sal}`)
            .then(response => {
                console.log("Se editó la reparación Listo", response.data);
                alert("Reparación Finalizada");
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });

    };

    useEffect(() => {
        axios.get('http://localhost:8093/reparacion')
            .then(response => {
                setData(response.data);
            })
            .catch(() => {
                alert("No entró a la base de datos");
            });
    }, []);



    return (
        <Box sx={{ height: 371, width: '100%' }}>
            {data ? (
                <DataGrid
                    rows={data}
                    onCellClick={data => setId(data.row.id)}
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
                <div>Loading...</div>
            )}

            <Grid container spacing={3} justifyContent="center">
                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant='contained'
                            color="warning"
                            onClick={handleSubmit}
                        >
                            Reparacion Lista
                        </Button>
                    </Box>
                </Grid>

                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant='contained'
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Calcular Costo
                        </Button>
                    </Box>
                </Grid>

                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant='contained'
                            color="success"
                            onClick={handleSubmit2}
                        >
                            Retiro Cliente
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </Box>

    )
}