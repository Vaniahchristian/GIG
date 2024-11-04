import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Box, Alert } from '@mui/material';

const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await axios.post('http://localhost:5000/api/register', form);
            alert("Registered successfully");
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
            <Card sx={{ width: { xs: '100%', sm: 400 }, p: { xs: 2, sm: 3 } }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Register
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            margin="normal"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            margin="normal"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            margin="normal"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Register
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Register;
