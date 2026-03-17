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
import { getReports } from "../services/reportsService";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");

    const fetchReports = async () => {
        const res = await getReports();

        if (res.status === 200) {
            setReports(res.data || []);
        } else {
            setError("Failed to fetch reports");
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 3 }}>
                My Medical Reports
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Diagnosis</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>Remarks</TableCell>
                            <TableCell>Doctor</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {reports.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.diagnosis}</TableCell>
                                <TableCell>{item.testRecommended}</TableCell>
                                <TableCell>{item.remarks}</TableCell>
                                <TableCell>{item.doctor?.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Reports;