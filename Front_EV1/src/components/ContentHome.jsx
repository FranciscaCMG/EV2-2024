import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ContentHome() {


    return (
        <Container>
            <Box
                my={4} // Margen en la parte superior e inferior
                display="flex"
                alignItems="center"
                sx={{
                    border: '1px solid #2980B9', // Borde sólido de 2px de grosor, color azul claro
                    borderRadius: '10px', // Borde redondeado de 10px
                    padding: '20px', // Espaciado interno
                    maxWidth: '600px', // Ancho máximo del Box
                    margin: 'auto', // Centrar en la página
                    

                }}
            >
                <Grid container spacing={3} borderRadius={'50px'} >
                    <Typography variant="h4" component="h1" gutterBottom style={{ paddingTop: '24px', paddingLeft: '24px', margin: '0px', color: '#2980B9' }}>
                        Elige el servicio a realizar
                    </Typography>
                    <Grid item xs={12} >
                        <Link to="/registro" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#D6EAF8', padding: '10px', border: '1px solid #2980B9', borderRadius: '4px' }}>
                                    <Typography variant="h6" component="h2" gutterBottom color={'#1F618D'}>
                                        Ingresar un vehículo
                                    </Typography>
                                </Box>
                            </Paper>
                        </Link>
                    </Grid>

                    <Grid item xs={12}>
                        <Link to="/reparacion" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#D6EAF8', padding: '10px', border: '1px solid #2980B9', borderRadius: '4px' }}>
                                    <Typography variant="h6" component="h2" gutterBottom color={'#1F618D'}>
                                        Ingresar una reparación
                                    </Typography>
                                </Box>
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/listado" style={{ textDecoration: 'none', cursor: 'pointer' }}>

                            <Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', padding: '10px', border: '1px solid #2980B9', borderRadius: '4px' }}>
                                    <Typography variant="h6" component="h2" gutterBottom color={'#2980B9'}>
                                        Listar vehículos
                                    </Typography>
                                </Box>
                            </Paper>

                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/listado-reparacion" style={{ textDecoration: 'none', cursor: 'pointer' }}>

                            <Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', padding: '10px', border: '1px solid #2980B9', borderRadius: '4px' }}>
                                    <Typography variant="h6" component="h2" gutterBottom color={'#2980B9'}>
                                        Listar reparaciones
                                    </Typography>
                                </Box>
                            </Paper>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );

}