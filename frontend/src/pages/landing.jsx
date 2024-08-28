import React, { useState } from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button } from '@mui/material';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meetingCode, setMeetingCode] = useState('');

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleJoinAsGuest = () => {
        if (meetingCode.trim()) {
            navigate(`/${meetingCode}`);
            handleCloseModal();
        }
    };

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>VideoMeet</h2>
                </div>
                <div className='navlist'>
                    <p onClick={handleOpenModal}>Join as Guest</p>
                    <p onClick={() => navigate("/auth")}>Register</p>
                    <div onClick={() => navigate("/auth")} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>
                    <p>Cover a distance by Apna Video Call</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src="/mobile.png" alt="" />
                </div>
            </div>

            {/* Modal for joining as a guest */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box className="modalBox">
                    <h2>Join a Meeting as Guest</h2>
                    <TextField
                        label="Meeting Code"
                        variant="outlined"
                        fullWidth
                        value={meetingCode}
                        onChange={(e) => setMeetingCode(e.target.value)}
                        style={{ marginBottom: "20px" }}
                    />
                    <Button variant="contained" onClick={handleJoinAsGuest} fullWidth>
                        Join
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
