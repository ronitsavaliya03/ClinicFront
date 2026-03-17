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

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Admin Dashboard
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {data && (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Clinic</Typography>
                            <Typography>{data.clinicName}</Typography>
                            <Typography>{data.clinicCode}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Users</Typography>
                            <Typography>{data.userCount}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Appointments</Typography>
                            <Typography>{data.appointmentCount}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Queue</Typography>
                            <Typography>{data.queueCount}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default AdminDashboard;