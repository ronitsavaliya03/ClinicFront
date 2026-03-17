import { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert
} from "@mui/material";
import { addPrescriptionByAppointment } from "../services/prescriptionsService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Prescription = () => {
    const { appointmentId } = useParams();
    const [medicines, setMedicines] = useState([
        { name: "", dosage: "", duration: "" }
    ]);
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleMedicineChange = (index, field, value) => {
        const updated = [...medicines];
        updated[index][field] = value;
        setMedicines(updated);
    };

    const addMedicine = () => {
        setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
    };

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        const data = {
            medicines,
            notes
        };

        const res = await addPrescriptionByAppointment(appointmentId, data);

        if (res.status === 200 || res.status === 201) {
            setSuccess("Prescription saved");
            navigate("/doctors");
        } else {
            setError("Failed to save prescription");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" sx={{ mb: 2 }}>
                Add Prescription
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            {medicines.map((med, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Medicine Name"
                        margin="normal"
                        value={med.name}
                        onChange={(e) =>
                            handleMedicineChange(index, "name", e.target.value)
                        }
                    />

                    <TextField
                        fullWidth
                        label="Dosage"
                        margin="normal"
                        value={med.dosage}
                        onChange={(e) =>
                            handleMedicineChange(index, "dosage", e.target.value)
                        }
                    />

                    <TextField
                        fullWidth
                        label="Duration"
                        margin="normal"
                        value={med.duration}
                        onChange={(e) =>
                            handleMedicineChange(index, "duration", e.target.value)
                        }
                    />
                </Box>
            ))}

            <Button onClick={addMedicine} sx={{ mb: 2 }}>
                Add Medicine
            </Button>

            <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit}
            >
                Save Prescription
            </Button>
        </Container>
    );
};

export default Prescription;