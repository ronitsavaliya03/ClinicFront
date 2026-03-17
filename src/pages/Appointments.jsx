import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    Box,
    Chip,
    IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../context/AuthProvider";
import { getAppointments, createAppointment, getAppointmentById } from "../services/appointmentService";

const Appointments = () => {
    const { isPatient } = useAuth();

    const [appointments, setAppointments] = useState([]);
    const [open, setOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [formData, setFormData] = useState({
        appointmentDate: "",
        timeSlot: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchAppointments = async () => {
        const data = await getAppointments();
        if (!data.error) {
            setAppointments(data.data || []);
        } else {
            setError("Failed to fetch appointments");
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleSubmit = async () => {
        setError("");
        setSuccess("");
        setOpen(false);

        const response = await createAppointment(formData);

        if (!response.error) {
            setSuccess("Appointment created successfully");
            fetchAppointments();
        } else {
            setError("Failed to create appointment");
        }
    };

    const handleView = async (id) => {
        const data = await getAppointmentById(id);

        if (!data.error) {
            setSelectedAppointment(data.data);
            setDetailOpen(true);
        } else {
            setError("Failed to fetch details");
        }
    };

    const getStatusColor = (status) => {
        if (status === "queued") return "warning";
        if (status === "completed") return "success";
        if (status === "cancelled") return "error";
        return "default";
    };

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4">My Appointments</Typography>

                {isPatient && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}
                    >
                        Book Appointment
                    </Button>
                )}
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time Slot</TableCell>
                            <TableCell>Token</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {appointments.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.appointmentDate}</TableCell>
                                <TableCell>{item.timeSlot}</TableCell>
                                <TableCell>{item.queueEntry?.tokenNumber}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.queueEntry?.status}
                                        color={getStatusColor(item.queueEntry?.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleView(item.id)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Book Appointment</DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        type="date"
                        label="Appointment Date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.appointmentDate}
                        onChange={(e) =>
                            setFormData({ ...formData, appointmentDate: e.target.value })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Time Slot (e.g. 10:00-10:15)"
                        value={formData.timeSlot}
                        onChange={(e) =>
                            setFormData({ ...formData, timeSlot: e.target.value })
                        }
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} fullWidth>
                <DialogTitle>Appointment Details</DialogTitle>

                <DialogContent>
                    {selectedAppointment && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography>ID: {selectedAppointment.id}</Typography>
                            <Typography>Date: {selectedAppointment.appointmentDate}</Typography>
                            <Typography>Time: {selectedAppointment.timeSlot}</Typography>

                            <Typography>
                                Token: {selectedAppointment.queueEntry?.tokenNumber}
                            </Typography>

                            <Typography>
                                Status: {selectedAppointment.queueEntry?.status}
                            </Typography>

                            <Typography variant="h6">Prescription</Typography>

                            {selectedAppointment.prescription?.medicines?.map((med, index) => (
                                <Typography key={index}>
                                    {med.name} - {med.dosage}
                                </Typography>
                            ))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setDetailOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Appointments;