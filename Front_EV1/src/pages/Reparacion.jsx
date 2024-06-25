import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import FormReparacion from "../components/FormReparacion";
import axios from "axios";


export default function Reparacion() {

    const [patente, setPatente] = useState("");
    const [existencia, setExistencia] = useState(false);
    const [data, setData] = useState(null);

    function formPart(props) {
        const existencia = props;
        if (existencia) {
            return <FormReparacion data={data} />;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8092/vehiculo/${patente}`).then((response) => {
            setData(response.data);
            setExistencia(true);
        }
        ).catch((error) => {
            console.log(error);
            alert("La patente ingresada no existe en la base de datos");
            setExistencia(false);
        });
    }

    return (
        <>
            <h1 style={{ textAlign: 'center', margin: '0px' }}>Registro de Reparaciones</h1>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    paddingTop: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <h4 style={{marginTop:'0px'}} >Patente</h4>
                        <TextField
                            id="patente"
                            label="Ingrese la patente del vehículo"
                            variant="outlined"
                            fullWidth
                            required
                            value={patente}
                            onChange={(e) => setPatente(e.target.value.toUpperCase())}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            color="warning"
                            variant="outlined"
                            sx={{ mt: 3, mb: 2, marginLeft: 0, marginTop: 7 }}
                        >
                            Revisar Patente
                        </Button>
                    </Grid>
                </Grid>

                {formPart(existencia)}

            </Box>

        </>
    );
}


