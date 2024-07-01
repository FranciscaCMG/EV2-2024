import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from '@mui/material';


export default function VehiculoCard() {

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

    const [listaReparaciones, setlistaReparaciones] = useState(null);
    const [vehiculo, setVehiculo] = useState(null);
    const [reparacion, setReparacion] = useState(null);
    const [id, setId] = useState("");
    const [patente, setPatente] = useState("");
    const [dscReparacion, setDscReparacion] = useState(0.0);
    const [dscDias, setDscDias] = useState(0.0);
    const [dscBono, setDscBono] = useState(0.0);
    const [recVe, setRecVe] = useState(0.0);
    const [recRe, setRecRe] = useState(0.0);
    const [montoRecargo, setMontorecargo] = useState(0.0);
    const [montoDescuento, setMontoDescuento] = useState(0.0);
    const [montoIva, setMontoIva] = useState(0.0);
    const [totalParcial, setTotalParcial] = useState(0.0);
    
    const [totalFinal, setTotalFinal] = useState(0.0);


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
                setlistaReparaciones(response.data);
            })
            .catch(() => {
                alert("No existen reparaciones ingresadas");
            });
    }, []);


    // Función para obtener los datos del vehículo
    useEffect(() => {
        // Función para realizar la solicitud GET con la patente actualizada
        function fetchVehiculo() {
            axios.get(`http://localhost:8092/vehiculo/${patente}`).then(response => {
                setVehiculo(response.data);
            }).catch(() => {
                alert("No se pudo obtener los datos del vehículo");
            });
        }
        // Llama a la función para realizar la solicitud cuando cambia la patente
        if (patente) {
            fetchVehiculo();
        }
    }, [id]);

    useEffect(() => {
        const fetchRecargoVe = () => {
            axios.post(`http://localhost:8090/costo/recargoVe`, {
                n_patente: vehiculo.n_patente,
                marca: vehiculo.marca,
                modelo: vehiculo.modelo,
                tipo_auto: vehiculo.tipo_auto,
                anio_fabricacion: vehiculo.anio_fabricacion,
                tipo_motor: vehiculo.tipo_motor,
                n_asientos: vehiculo.n_asientos,
                kilometraje: vehiculo.kilometraje,
            }).then(response => {
                setRecVe(response.data);
            });
        };

        const fetchReparaciondesc = () => {
            axios.post(`http://localhost:8093/reparacion/reparaciondesc/${vehiculo.n_patente}/${vehiculo.tipo_motor}`).then(response => {
                setDscReparacion(response.data);
            });
        };

        if (vehiculo) {
            fetchRecargoVe();
            fetchReparaciondesc();
        }

    }, [vehiculo]);

    // Función para obtener datos de una reparacion por id
    useEffect(() => {
        const fetchReparacion = async () => {
            try {
                const response = await axios.get(`http://localhost:8093/reparacion/${id}`);
                setReparacion(response.data); // Actualiza el estado con los datos recibidos
            } catch (error) {
                alert("Ocurrió un error al obtener los datos de la reparación id");
                console.error(error);
            }
        };

        // Llama a la función para realizar la solicitud cuando cambia la patente
        if (id) {
            fetchReparacion();
        }
    }, [id]);

    useEffect(() => {
        const fetchRecRe = () => {
            axios.post(`http://localhost:8090/costo/recargoRe`, {
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
            }).then(response => {
                setRecRe(response.data);
            });
        };

        const fetchDescuentoDias = () => {
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
            });
        };

        const fetchDescuentoBono = () => {
            axios.post(`http://localhost:8092/vehiculo/descuentoBono/${reparacion.bono}/${patente}`).then(response => {
                setDscBono(response.data);
            });
        };


        if (reparacion) {
            fetchRecRe();
            fetchDescuentoDias();
            fetchDescuentoBono();
        }

    }, [reparacion]);

    const handleSubmitEliminar = () => {
        axios.delete(`http://localhost:8093/reparacion/eliminar/${id}`)
            .then(response => {
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

    function calculoResultado() {

        var total = reparacion.monto_total_tiporep +
            reparacion.monto_total_tiporep * ((recRe + recVe) / 100) -
            reparacion.monto_total_tiporep * ((dscDias + dscReparacion) / 100) -
            dscBono;
        
        var totalFinal = total + total * (19 / 100);

        var montoRecargo = reparacion.monto_total_tiporep * ((recRe + recVe) / 100);
        var montoDescuento = reparacion.monto_total_tiporep * ((dscDias + dscReparacion) / 100) + dscBono;
        var iva = total * (19 / 100);   

        setMontorecargo(montoRecargo);
        setMontoDescuento(montoDescuento);
        setMontoIva(iva);
        setTotalParcial(total);
    }

    useEffect(() => {
        if (totalParcial > 0) {
            
            axios.patch(`http://localhost:8093/reparacion/modificarReparacionCosto/${id}/${montoDescuento}/${montoRecargo}/${montoIva}/${totalParcial}`);
        }
        console.log("totalParcial", totalParcial);
    }, [totalParcial]);

    function handleSubmitCalculo() {
        calculoResultado();
        alert("Costo Calculado");
        window.location.reload();
    }

    return (
        <Box sx={{ height: 371, width: '100%' }}>
            {listaReparaciones ? (
                <DataGrid
                    rows={listaReparaciones}
                    onCellClick={listaReparaciones => {
                        setId(listaReparaciones.row.id);
                        setPatente(listaReparaciones.row.n_patente);
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