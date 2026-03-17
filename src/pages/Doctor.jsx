import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Chip,
    Alert,
    Button
} from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { getDoctorQueue } from "../services/doctorService";
import { useNavigate } from "react-router-dom";

const DoctorQueue = () => {
    const { isDoctor } = useAuth();

    const navigate = useNavigate();
    const [queue, setQueue] = useState([]);
    const [error, setError] = useState("");

    const fetchQueue = async () => {
        const res = await getDoctorQueue();

        if (res.status === 200) {
            setQueue(res.data || []);
        } else {
            setError("Failed to fetch queue");
        }
    };

    const handleAddPrescription = (appointmentId) => {
        console.log("Add prescription for appointment:", appointmentId);
        navigate(`/prescriptions/${appointmentId}`);
    }

    useEffect(() => {
        fetchQueue();
    }, []);

    const getColor = (status) => {
        if (status === "waiting") return "warning";
        if (status === "in-progress") return "info";
        if (status === "done") return "success";
        return "default";
    };

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4">Doctor Queue</Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Token</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {queue.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.tokenNumber}</TableCell>
                                <TableCell>{item.patientName}</TableCell>

                                <TableCell>
                                    <Chip
                                        label={item.status}
                                        color={getColor(item.status)}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    {isDoctor && item.status === "in_progress" && (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleAddPrescription(item.appointmentId)}
                                        >
                                            Add Prescription
                                        </Button>
                                    )}
                                
                                    {isDoctor && item.status === "in_progress" && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => navigate(`/report/${item.appointmentId}`)}
                                        >
                                            Add Report
                                        </Button>
                                    )}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default DoctorQueue;