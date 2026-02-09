import { Container, Typography, Paper, Box, Step, StepLabel, Stepper } from '@mui/material';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';

export default function RoadmapPage() {
    const steps = [
        {
            label: 'Phase 1: Foundation',
            description: 'Core CSV parsing, indexing, and basic query support (Select, Where, Limit).'
        },
        {
            label: 'Phase 2: Advanced Querying',
            description: 'Aggregation, Group By, and improved filtering logic.'
        },
        {
            label: 'Phase 3: Relational Features (Current Focus)',
            description: 'Introduction of JOINs (Inner, Left, Right) to query across multiple CSV files.'
        },
        {
            label: 'Phase 4: Optimization',
            description: 'SIMD acceleration, caching layers, implementation of SQL-like window functions, and distributed query support.'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <MapTwoToneIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                    Roadmap
                </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" paragraph>
                Our development path for CsvQuery.
            </Typography>

            <Paper sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    Upcoming Features
                </Typography>

                <Typography variant="body1" paragraph>
                    <strong>Joins will be introduced.</strong> We are actively working on enabling SQL-like JOIN operations to link datasets efficiently.
                </Typography>

                <Stepper orientation="vertical" activeStep={2}>
                    {steps.map((step) => (
                        <Step key={step.label}>
                            <StepLabel>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{step.label}</Typography>
                            </StepLabel>
                            <Box sx={{ mb: 2, pl: 2 }}>
                                <Typography variant="body2" color="text.secondary">{step.description}</Typography>
                            </Box>
                        </Step>
                    ))}
                </Stepper>
            </Paper>
        </Container>
    );
}
