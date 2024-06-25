/* eslint-disable react/prop-types */
import * as React from 'react';
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
    const [tipoArray, setTipoRep] = useState("");
    const [activacion, setActivacion] = useState(false);
    const [dataTipo, setDataTipo] = useState(null);

    const [state, setState] = React.useState({
        uno: false,
        dos: false,
        tres: false,
        cuatro: false,
        cinco: false,
        seis: false,
        siete: false,
        ocho: false,
        nueve: false,
        diez: false,
        once: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once } = state;

    useEffect(() => {
        const numbers = [uno && "1", dos && "2", tres && "3", cuatro && "4", cinco && "5",
        seis && "6", siete && "7", ocho && "8", nueve && "9", diez && "10", once && "11"]
            .filter(Boolean); 
            setTipoRep(numbers.join(","));

    }, [state]);

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



    async function calcularTotalTipo() {
        try {
            const response = await axios.post(`http://localhost:8090/costo/totalTipo/${tipoArray}/${data.tipo_motor}`, {});
            setDataTipo(response.data);
            console.log(response);
            console.log("COSTO TOTAL TIPO", response.data);
            return response.data; // Devolvemos el resultado para que se pueda usar en guardarReparacion()
        } catch (error) {
            console.log("Error en calcularTotalTipo:", error);
            throw error; // Lanzamos el error para que lo maneje el siguiente nivel
        }
    }
    
    async function guardarReparacion() {
        try {
            var fecha = fechaActualyHora();
            // Obtenemos el resultado de calcularTotalTipo()
            const dataTipo = await calcularTotalTipo(); 
            const response = await axios.post('http://localhost:8093/reparacion', {
                n_patente: data.n_patente,
                fecha_ing: fechaIng(fecha),
                hora_ing: horaIng(fecha),
                bono: activacion,
                tipo_reparaciones: tipoArray,
                monto_total_tiporep: dataTipo,
                recargo: null,
                descuento: null,
                iva: null,
                costo_total: null,
                fecha_sal: null,
                hora_sal: null,
                fecha_sal_cli: null,
                hora_sal_cli: null,
            });
            console.log(response);
            // Aquí puedes hacer cualquier otra cosa después de guardar la reparación
            alert("Reparación ingresada con éxito");
            window.location.reload(); 
        } catch (error) {
            console.log("Error en guardarReparacion:", error);
            throw error; // Lanzamos el error para que lo maneje el siguiente nivel
        }
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await guardarReparacion();
        } catch (error) {
            console.log("Error en handleSubmit:", error);
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
                    <h4 >Tipo de Reparación</h4>
                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={uno} onChange={handleChange} name="uno" />}
                                label="1"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={dos} onChange={handleChange} name="dos" />}
                                label="2"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={tres} onChange={handleChange} name="tres" />}
                                label="3"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={cuatro} onChange={handleChange} name="cuatro" />}
                                label="4"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={cinco} onChange={handleChange} name="cinco" />}
                                label="5"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={seis} onChange={handleChange} name="seis" />}
                                label="6"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={siete} onChange={handleChange} name="siete" />}
                                label="7"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={ocho} onChange={handleChange} name="ocho" />}
                                label="8"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={nueve} onChange={handleChange} name="nueve" />}
                                label="9"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={diez} onChange={handleChange} name="diez" />}
                                label="10"
                                labelPlacement="top" />
                            <FormControlLabel
                                value="top"
                                control={<Checkbox checked={once} onChange={handleChange} name="once" />}
                                label="11"
                                labelPlacement="top" />
                        </FormGroup>
                    </FormControl>

                </Grid >

                {data.marca === 'TOYOTA' || data.marca === 'FORD' || data.marca === 'HYUNDAI' || data.marca === 'HONDA' ? 
                <Grid item xs={6} container justifyContent="center" alignItems="center" style={{ padding: 0 }}>

                    <Typography>No</Typography>
                    <FormControlLabel sx={{ paddingLeft: 0, paddingRight: 0, }} 
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

                        sx={{ mt: 3, mb: 2, marginLeft: 0, marginTop: 3, width: '20rem' }}
                    >
                        Ingresar Reparación
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
