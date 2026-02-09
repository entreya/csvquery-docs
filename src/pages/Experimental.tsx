import { Container, Typography, Paper, Box, Divider } from '@mui/material';

export default function Experimental() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Experimental Features
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Preview upcoming features and experimental capabilities of the CsvQuery engine.
            </Typography>


            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Column Addition and Updation
                </Typography>
                <Typography variant="body2" paragraph>
                    Future updates to CsvQuery will introduce dynamic schema modifications, allowing users to:
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                    <Typography component="li" variant="body2">
                        <strong>Add Columns:</strong> Inject new columns into existing datasets with default values or derived data.
                    </Typography>
                    <Typography component="li" variant="body2">
                        <strong>Update Columns:</strong> Modify data types or rename headers without full re-indexing.
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" color="text.secondary">
                    Status: In Analysis
                </Typography>
            </Paper>
        </Container>
    );
}
