import { useEffect, useState } from "react";
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
    Alert
} from "@mui/material";
import { getPrescriptions } from "../services/prescriptionsService";

const MyPrescriptions = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const fetchData = async () => {
        const res = await getPrescriptions();

        if (res.status === 200) {
            setData(res.data || []);
        } else {
            setError("Failed to fetch prescriptions");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 3 }}>
                My Prescriptions
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Notes</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.doctor?.name}</TableCell>
                                <TableCell>{item.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default MyPrescriptions;