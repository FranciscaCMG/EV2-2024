import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import OutboxIcon from '@mui/icons-material/Outbox';


const tipo = [

    {
        value: 'SEDAN',
        label: 'Sedan',
    },
    {
        value: 'HATCHBACK',
        label: 'Hatchback',
    },
    {
        value: 'SUV',
        label: 'SUV',
    },
    {
        value: 'PICKUP',
        label: 'Pickup',

    },
    {
        value: 'FURGONETA',
        label: 'Furgoneta',
    },
];



const motor = [

    {
        value: 'GASOLINA',
        label: 'Gasolina',
    },
    {
        value: 'DIESEL',
        label: 'Diésel',
    },
    {
        value: 'HIBRIDO',
        label: 'Híbrido',
    },
    {
        value: 'ELECTRICO',
        label: 'Eléctrico',

    },
];

export default function Registro() {

    const [patente, setPatente] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [tipoVehiculo, setTipoVehiculo] = useState("");
    const [anio, setAnio] = useState("");
    const [motorVehiculo, setMotorVehiculo] = useState("");
    const [asientos, setAsientos] = useState("");
    const [kilometraje, setKilometraje] = useState("");

    const [error, setError] = useState(
        {
            errorPatente: false,
            errorMarca: false,
            errorModelo: false,
            errorTipoVehiculo: false,
            errorAnio: false,
            errorMotorVehiculo: false,
            errorAsientos: false,
            errorKilometraje: false,
            message: 'Este campo es requerido',

        }
    );
    const [helperText, setHelperText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!patente || !marca || !modelo || !tipoVehiculo || !anio || !motorVehiculo || !asientos || !kilometraje) {
            setError({
                ...error,
                errorPatente: !patente,
                errorMarca: !marca,
                errorModelo: !modelo,
                errorTipoVehiculo: !tipoVehiculo,
                errorAnio: !anio,
                errorMotorVehiculo: !motorVehiculo,
                errorAsientos: !asientos,
                errorKilometraje: !kilometraje,
            });
            setHelperText('Este campo es requerido');
        } else {
            setError({
                errorPatente: false,
                errorMarca: false,
                errorModelo: false,
                errorTipoVehiculo: false,
                errorAnio: false,
                errorMotorVehiculo: false,
                errorAsientos: false,
                errorKilometraje: false,
                message: 'Este campo es requerido',
            });
            axios.
                post('http://localhost:8092/vehiculo', {

                    n_patente: patente.toLocaleUpperCase(),
                    marca: marca.toLocaleUpperCase(),
                    modelo: modelo.toLocaleUpperCase(),
                    tipo_auto: tipoVehiculo,
                    anio_fabricacion: anio,
                    tipo_motor: motorVehiculo,
                    n_asientos: asientos,
                    kilometraje: kilometraje
                })
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
            alert('Vehículo ingresado correctamente');

        }

    }

    return (
        <>

            <h1 style={{ textAlign: 'center' }}>Registro de Vehículos</h1>


            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2} >

                    <Grid item xs={6}>
                        <h4>Patente</h4>
                        <TextField

                            id="patente"
                            label="Ingrese la patente del vehículo"
                            fullWidth
                            error={error.errorPatente}
                            helperText={error.errorPatente ? helperText : ''}
                            required
                            value={patente}
                            onChange={(e) => setPatente(e.target.value.toUpperCase())}

                        > </TextField>
                    </Grid>
                    <Grid item xs={6}>

                        <h4>Marca</h4>
                        <TextField

                            id="marca"
                            label="Ingrese la marca del vehículo"
                            fullWidth
                            error={error.errorMarca}
                            helperText={error.errorMarca ? helperText : ''}
                            required
                            value={marca}
                            onChange={(e) => setMarca(e.target.value.toUpperCase())}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Modelo</h4>
                        <TextField
                            id="modelo"
                            label="Ingrese el modelo del vehículo"
                            fullWidth
                            error={error.errorModelo}
                            helperText={error.errorModelo ? helperText : ''}
                            required
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value.toUpperCase())}

                        > </TextField>
                    </Grid>
                    <Grid item xs={6}>

                        <h4>Tipo</h4>
                        <TextField

                            id="tipo"
                            select
                            label="Ingrese el tipo del vehículo"
                            fullWidth
                            error={error.errorTipoVehiculo}
                            helperText={error.errorTipoVehiculo ? helperText : ''}
                            required
                            value={tipoVehiculo}
                            onChange={(e) => setTipoVehiculo(e.target.value.toUpperCase())}
                        >
                            {tipo.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Año Fabricación</h4>
                        <TextField
                            id="anio"
                            label="Ingrese el año de fabricación del vehículo"
                            fullWidth
                            error={error.errorAnio}
                            helperText={error.errorAnio ? helperText : ''}
                            required
                            value={anio}
                            onChange={(e) => setAnio(e.target.value.toUpperCase())}

                        > </TextField>
                    </Grid>
                    <Grid item xs={6}>

                        <h4>Motor</h4>
                        <TextField

                            id="motor"
                            select
                            label="Ingrese el motor del vehículo"
                            fullWidth
                            error={error.errorMotorVehiculo}
                            helperText={error.errorMotorVehiculo ? helperText : ''}
                            required
                            value={motorVehiculo}
                            onChange={(e) => setMotorVehiculo(e.target.value.toUpperCase())}
                        >
                            {motor.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Número Asientos</h4>
                        <TextField
                            id="asientos"
                            label="Ingrese el número de asientos del vehículo"
                            fullWidth
                            error={error.errorAsientos}
                            helperText={error.errorAsientos ? helperText : ''}
                            required
                            value={asientos}
                            onChange={(e) => setAsientos(e.target.value)}

                        > </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Kilometraje</h4>
                        <TextField
                            id="kilometraje"
                            label="Ingrese el kilometraje del vehículo"
                            fullWidth
                            error={error.errorKilometraje}
                            helperText={error.errorKilometraje ? helperText : ''}
                            required
                            value={kilometraje}
                            onChange={(e) => setKilometraje(e.target.value)}

                        > </TextField>
                    </Grid>

                </Grid>
                <div>
                    <Button
                        startIcon={<OutboxIcon />}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 30, mb: 2, width: '20rem', marginTop: '2rem' }}
                    >Ingresar Vehículo</Button>
                </div>

            </Box>
        </>
    );
}