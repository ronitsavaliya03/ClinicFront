import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert
} from "@mui/material";
import { addReportByAppointment } from "../services/reportsService";
import { useNavigate } from "react-router-dom";

const Report = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        diagnosis: "",
        testRecommended: "",
        remarks: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        const res = await addReportByAppointment(appointmentId, formData);

        if (res.status === 200 || res.status === 201) {
            setSuccess("Report saved");
            navigate("/doctors");
        } else {
            setError("Failed to save report");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" sx={{ mb: 2 }}>
                Add Medical Report
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <TextField
                fullWidth
                label="Diagnosis"
                margin="normal"
                value={formData.diagnosis}
                onChange={(e) =>
                    setFormData({ ...formData, diagnosis: e.target.value })
                }
            />

            <TextField
                fullWidth
                label="Test Recommended"
                margin="normal"
                value={formData.testRecommended}
                onChange={(e) =>
                    setFormData({ ...formData, testRecommended: e.target.value })
                }
            />

            <TextField
                fullWidth
                label="Remarks"
                margin="normal"
                multiline
                rows={3}
                value={formData.remarks}
                onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                }
            />

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit}
            >
                Save Report
            </Button>
        </Container>
    );
};

export default Report;