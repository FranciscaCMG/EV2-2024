
import FondoHome from "../components/FondoHome";
import ContentHome from "../components/ContentHome";
import { Typography, Grid } from "@mui/material";
import Box from '@mui/material/Box';



export default function Home() {


    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h4" component="h1" gutterBottom style={{ paddingTop: '0px', paddingLeft: '24px', margin: '0px', color: '#1F618D ', textAlign: 'center' }}>
                                ¡Bienvenido/a a AUTOFIX!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FondoHome />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <ContentHome />
                    </Grid>
                </Grid>
            </Box>
        </>
    );

}