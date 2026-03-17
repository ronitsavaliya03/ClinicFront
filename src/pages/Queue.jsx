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
    Button,
    Box,
    Chip,
    Alert,
    TextField
} from "@mui/material";
import { getQueue, updateQueue } from "../services/queueService";
import { useAuth } from "../context/AuthProvider";

const Queue = () => {
    const { isReceptionist } = useAuth();

    const today = new Date().toISOString().split("T")[0];

    const [date, setDate] = useState(today);
    const [queue, setQueue] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchQueue = async (selectedDate) => {
        const res = await getQueue(selectedDate);

        if (res.status === 200) {
            setQueue(res.data || []);
        } else {
            setError("Failed to fetch queue");
        }
    };
    useEffect(() => {
        fetchQueue(date);
    }, [date]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchQueue(date);
        }, 5000);

        return () => clearInterval(interval);
    }, [date]);

    const handleUpdate = async (id, status) => {
        setError("");
        setSuccess("");

        const res = await updateQueue(id, { status });

        if (!res.data?.error) {
            setSuccess("Status updated");
            fetchQueue(date);
        } else {
            setError("Failed to update status");
        }
    };

    const getColor = (status) => {
        if (status === "waiting") return "warning";
        if (status === "in-progress") return "info";
        if (status === "done") return "success";
        if (status === "skipped") return "error";
        return "default";
    };

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4">Queue Management</Typography>

                <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Token</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {queue.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.tokenNumber}</TableCell>
                                <TableCell>{item.appointment?.patient?.name}</TableCell>
                                <TableCell>{item.appointment?.patient?.phone}</TableCell>

                                <TableCell>
                                    <Chip
                                        label={item.status}
                                        color={getColor(item.status)}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    {isReceptionist && item.status === "waiting" && (
                                        <>
                                            <Button
                                                size="small"
                                                onClick={() => handleUpdate(item.id, "in-progress")}
                                            >
                                                In Progress
                                            </Button>

                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => handleUpdate(item.id, "skipped")}
                                            >
                                                Skip
                                            </Button>
                                        </>
                                    )}

                                    {isReceptionist && item.status === "in_progress" && (
                                        <Button
                                            size="small"
                                            color="success"
                                            onClick={() => handleUpdate(item.id, "done")}
                                        >
                                            Done
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

export default Queue;