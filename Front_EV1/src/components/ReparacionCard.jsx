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
        field: 'costo_total',
        headerName: 'Costo Total',
        editable: false,
        width: 180,
    },

];

export default function VehiculoCard() {

    const [data, setData] = useState(null);
    const [reparacion, setReparacion] = useState(null);
    const [id, setId] = useState("");
    const [patente, setPatente] = useState("");
    const [vehiculo, setVehiculo] = useState("");
    const [dscReparacion, setDscReparacion] = useState("");
    const [dscDias, setDscDias] = useState("");
    const [dscBono, setDscBono] = useState("");
    const [recVe, setRecVe] = useState("");
    const [recRe, setRecRe] = useState("");
    const [totalFinal, setTotalFinal] = useState("");
    
    const handleCellClick = (data) => {
        setId(data.row.id);
        setPatente(data.row.n_patente);
      };

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

    // Funcion para obtener la lista de reparaciones
    useEffect(() => {
        axios.get('http://localhost:8093/reparacion')
            .then(response => {
                setData(response.data);
            })
            .catch(() => {
                alert("No existen reparaciones ingresadas");
            });
    }, []);

    // Función para obtener los datos del vehículo
    useEffect(() => {
        // Función para realizar la solicitud GET con la patente actualizada
        const fetchVehiculo = async () => {
            try {
                const response = await axios.get(`http://localhost:8092/vehiculo/${patente}`);
                setVehiculo(response.data); // Actualiza el estado con los datos recibidos
                console.log("VEHICULO", response.data);
            } catch (error) {
                alert("Ocurrió un error al obtener los datos del vehículo");
                console.error(error);
            }
        };

        // Llama a la función para realizar la solicitud cuando cambia la patente
        if (patente) {
            fetchVehiculo();
        }
        // Dependencia [patente] para ejecutar cada vez que cambia la patente
    }, [patente]);

    // Función para obtener datos de una reparacion por id
    useEffect(() => {
        // Función para realizar la solicitud GET con la patente actualizada
        const fetchReparacion = async () => {
            try {
                const response = await axios.get(`http://localhost:8093/reparacion/${id}`);
                setReparacion(response.data); // Actualiza el estado con los datos recibidos
                console.log("REPARACION ID", response.data);
            } catch (error) {
                alert("Ocurrió un error al obtener los datos de la reparación id");
                console.error(error);
            }
        };

        // Llama a la función para realizar la solicitud cuando cambia la patente
        if (patente) {
            fetchReparacion();
        }

        // Dependencia [patente] para ejecutar cada vez que cambia la patente
    }, [patente]);


    const handleSubmitEliminar = () => {
        axios.delete(`http://localhost:8093/reparacion/eliminar/${id}`)
          .then(response => {
            console.log(response);
            alert("Vehículo eliminado");
            window.location.reload();
          })
          .catch(() => {
            alert("No se pudo eliminar el vehículo");
          });
      }
    const handleSubmitListo = () => {
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

    const handleSubmitRetiro = () => {
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

    const handleSubmitCalculo = () => {
        // Descuentos
        axios.post(`http://localhost:8093/reparacion/reparaciondesc/${patente}/${vehiculo.tipo_motor}`)
            .then(response => {
                setDscReparacion(response.data);
                console.log("Reparacion", response.data);
            })
            .catch(error => {
                console.log(error);
            });
        
            axios.post(`http://localhost:8090/costo/descuentoDias`, {
                n_patente: reparacion.n_patente,
                fecha_ing: reparacion.fecha_ing,
                hora_ing: reparacion.hora_ing,
                bono: reparacion.bono,
                tipo_reparaciones: reparacion.tipo_reparaciones,
                monto_total_tiporep: reparacion.monto_total_tiporep,
                recargo: reparacion.recargo,
                descuento: reparacion.descuento,
                iva: reparacion.iva,
                costo_total: reparacion.costo_total,
                fecha_sal: reparacion.fecha_sal,
                hora_sal: reparacion.hora_sal,
                fecha_sal_cli: reparacion.fecha_sal_cli,
                hora_sal_cli: reparacion.hora_sal_cli,
            })
                .then(response => {
                    setDscDias(response.data);
                    console.log("Dias", response.data);
                })
                .catch(error => {
                    console.log(error);
                });


    
        //http://localhost:8093/reparacion/reparaciondesc/BBCC22/HIBRIDO  POST CHECK 10%
        //http://localhost:8090/costo/descuentoDias // jSON REPARACIONES  POST CHECK  0%
        //http://localhost:8092/vehiculo/descuentoBono/true/BBCC22  POST  70.000

        // Recargos
        //http://localhost:8090/costo/recargoVe // JSON VEHICULO POST
        //http://localhost:8090/costo/recargoRe // JSON REPARACIONES POST

        // T1 = DATA.MONTO_TOTAL_TIPOREP + DATA.MONTO_TOTAL_TIPOREP*[DESCUENTOS-RECARGOS] 
        // TOTAL_FINAL= T1 + T1*DATA.IVA

        // Guaradar Reparacion nueva con montos nuevos :
        // http://localhost:8093/reparacion/modificarReparacionCosto/id/desc/rec/total_final PATCH

    };

    useEffect(() => {
        axios.get('http://localhost:8093/reparacion')
            .then(response => {
                setData(response.data);
            })
            .catch(() => {
                alert("No existen reparaciones ingresadas");
            });
    }, []);

    return (
        <Box sx={{ height: 300, width: '100%' }}>
            {data ? (
                <DataGrid
                    rows={data}
                    onCellClick={data => {
                        setId(data.row.id);
                        setPatente(data.row.n_patente);
                    }}
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

            <Grid container spacing={3} justifyContent="center">
                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant='contained'
                            color="warning"
                            onClick={handleSubmitListo}
                        >
                            Reparacion Lista
                        </Button>
                    </Box>
                </Grid>

                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant='contained'
                            color="success"
                            onClick={handleSubmitRetiro}
                        >
                            Retiro Cliente
                        </Button>
                    </Box>
                </Grid>

                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant='contained'
                            color="primary"
                            onClick={handleSubmitCalculo}
                        >
                            Calcular Costo
                        </Button>
                    </Box>
                </Grid>

                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant='contained'
                            color="error"
                            onClick={handleSubmitEliminar}
                        >
                            Eliminar
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </Box>

    )
}