"use client";

import React, { DragEvent, ChangeEvent } from 'react';
import { Box, Button, Card, CardHeader, Grid, Paper, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';

const DragDropArea = styled(Paper)(({ theme }) => ({
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px dashed #ccc',
}));

const ImageComponent: React.FC = () => {

    const [image, setImage] = React.useState<string | null>(null);
    const [zoneName, setZoneName] = React.useState('East zone');
    const [cellNumber, setCellNumber] = React.useState('');
    const [plateNumber, setPlateNumber] = React.useState('');
    const [plateGroup, setPlateGroup] = React.useState('');
    const [classifiedGrade, setClassifiedGrade] = React.useState('');

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleImageUpload(file);
    };

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
                setImage(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleAnalyse = () => {
        const grades = ['A', 'B', 'C', 'D'];
        const randomGrade = grades[Math.floor(Math.random() * grades.length)];
        setClassifiedGrade(randomGrade);
    };

    const handlePlateNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setPlateNumber(input);

        const num = parseInt(input, 10);
        if (!isNaN(num) && num > 0) {
            // Use modulo operation to determine the plate group
            const groupNumber = (num % 3 === 1) ? 'A1' : (num % 3 === 2) ? 'A2' : 'A3';
            setPlateGroup(groupNumber);
        } else {
            setPlateGroup('');
        }
    };



    const handleSubmit = () => {
        const data = {
            zoneName,
            cellNumber,
            plateNumber,
            plateGroup,
            classifiedGrade,
        };

        axios.post('http://localhost:5000/cell_data', data)
            .then((response) => {
                console.log('Submitted successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
            });
    };

    return (
        <Card >
            <CardHeader title="Grade Image" />

            <Box sx={{ display: 'flex', p: 2, paddingTop: '40px', paddingBottom: '15px' }}>
                <Box sx={{ width: '60%', pr: 2 }}>
                    <DragDropArea onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                        {image ? (
                            <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        ) : (
                            <Typography>Drag and drop an image here</Typography>
                        )}
                    </DragDropArea>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files[0]) {
                                handleImageUpload(e.target.files[0]);
                            }
                        }}
                    />
                    <label htmlFor="image-upload">
                        <Button variant="contained" component="span" sx={{ marginLeft: 17, marginTop: 2 }}>
                            Upload Image
                        </Button>
                    </label>
                </Box>
                <Box sx={{ width: '40%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Zone Name"
                                value={zoneName}
                                onChange={(e) => setZoneName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Cell Number"
                                value={cellNumber}
                                onChange={(e) => setCellNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Plate Number"
                                value={plateNumber}
                                onChange={handlePlateNumberChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Plate Group"
                                value={plateGroup}
                                disabled // Make this field read-only
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={handleAnalyse} fullWidth>
                                Analyse
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Classified Grade: {classifiedGrade}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={handleSubmit} fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Card>
    );
};

export default ImageComponent;
