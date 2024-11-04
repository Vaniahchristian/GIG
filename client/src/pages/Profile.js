import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('https://gig-backend.onrender.com/api/profile', {
                    headers: { 'x-auth-token': token }
                });
                setUser(res.data);
            } catch (error) {
                setError("Failed to fetch profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
                <Alert severity="error" fullWidth>{error}</Alert>
            </Box>
        );
    }

    return user ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
            <Card sx={{ width: { xs: '100%', sm: 400 }, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Welcome, {user.username}
                    </Typography>
                    <Typography variant="body1" align="center">
                        <strong>Email:</strong> {user.email}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    ) : null;
};

export default Profile;
