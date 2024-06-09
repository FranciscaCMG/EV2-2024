/* eslint-disable react/prop-types */
import Checkbox from '@mui/material/Checkbox';
import OutboxIcon from '@mui/icons-material/Outbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button, Grid, Switch, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function FormReparacion(props) {

    const data = props.data;
    console.log("DATAAAAA props", data);
    const [tipoArray, setTipoRep] = useState([]);
    const [reparacion, setReparacion] = useState(null);
    const [activacion, setActivacion] = useState(false);
    const [montoTotal, setMontoTotal] = useState(0);

 

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

    function handleSubmit(event) {

        event.preventDefault();
        var fecha = fechaActualyHora();
        console.log("ME EJECUTE")

        axios.post('http://localhost:8093/reparacion', {
            n_patente: data.n_patente,
            fecha_ing: fechaIng(fecha),
            hora_ing: horaIng(fecha),
            bono: activacion,
            monto_total_tiporep: null,
            recargo: null,
            descuento: null,
            iva: null,
            costo_total: null,
            fecha_sal: null,
            hora_sal: null,
            fecha_sal_cli: null,
            hora_sal_cli: null,
        }).then(response => {
            console.log(response);
            alert("Reparación Ingresada Correctamente");
        }).catch(error => {
            console.log(error);
        });

        for (let i = 0; i < tipoArray.length; i++) {
            console.log("entrefor");
            axios.get(`http://localhost:8090/costo/tipo/${tipoArray[i]}/${data.tipo_motor}/${data.n_patente}`);
        }
    }


    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <h4>Fecha y Hora De Ingreso</h4>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        value={fechaActualyHora()}
                        onClick={fechaActualyHora}
                        fullWidth
                    > </TextField>
                </Grid>

                <Grid item xs={6}>
                    <h4>Tipo de Reparación</h4>
                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="1"
                                onClick={(e) => arrayTipo(e, 1)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="2"
                                onClick={(e) => arrayTipo(e, 2)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="3"
                                onClick={(e) => arrayTipo(e, 3)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="4"
                                onClick={(e) => arrayTipo(e, 4)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="5"
                                onClick={(e) => arrayTipo(e, 5)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="6"
                                onClick={(e) => arrayTipo(e, 6)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="7"
                                onClick={(e) => arrayTipo(e, 7)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="8"
                                onClick={(e) => arrayTipo(e, 8)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="9"
                                onClick={(e) => arrayTipo(e, 9)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="10"
                                onClick={(e) => arrayTipo(e, 10)}
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox />}
                                label="11"
                                onClick={(e) => arrayTipo(e, 11)}
                                labelPlacement="top" />
                        </FormGroup>
                    </FormControl>

                </Grid>

                {data.marca === 'TOYOTA' || data.marca === 'FORD' || data.marca === 'HYUNDAI' || data.marca === 'HONDA' ? <Grid item xs={6} container justifyContent="center" alignItems="center">

                    <Typography>No</Typography>
                    <FormControlLabel
                        onClick={(e) => setActivacion(e.target.checked)}
                        value="top"
                        control={<Switch color="primary" />}
                        label="Aplicar Bono Por Marca"
                        labelPlacement="top"
                    />
                    <Typography>Si</Typography>
                </Grid> : null}

            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item>
                    <Button
                        startIcon={<OutboxIcon />}
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}

                        sx={{ mt: 3, mb: 2, marginLeft: 0, marginTop: 6, width: '20rem' }}
                    >
                        Ingresar Reparación
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
