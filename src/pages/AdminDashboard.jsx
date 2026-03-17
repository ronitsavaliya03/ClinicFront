import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Grid,
    Paper,
    Box,
    Alert
} from "@mui/material";
import { getAdminDashboard } from "../services/adminService";

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const fetchData = async () => {
        const res = await getAdminDashboard();

        if (res.status === 200) {
            setData(res.data);
        } else {
            setError("Failed to load dashboard");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const Card = ({ title, value, subtitle }) => (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
            }}
        >
            <Typography variant="subtitle2" color="text.secondary">
                {title}
            </Typography>

            <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>
                {value}
            </Typography>

            {subtitle && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {subtitle}
                </Typography>
            )}
        </Paper>
    );

    return (
        <Container>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Admin Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Overview of clinic activity
                </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {data && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card
                            title="Clinic"
                            value={data.clinicName}
                            subtitle={data.clinicCode}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            title="Users"
                            value={data.userCount}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            title="Appointments"
                            value={data.appointmentCount}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            title="Queue"
                            value={data.queueCount}
                        />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default AdminDashboard;