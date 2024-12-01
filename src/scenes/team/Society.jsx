import { Box, Button, TextField, useTheme, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { tokens } from '../../theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addSociety } from '../../components/Api/api';

function Society() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const formik = useFormik({
        initialValues: {
            societyName: '',
            pramukhName: '',
            pramukhNumber: '',
            spot: '',
            area: '',
            description: '',
            programDate: ''
        },
        validationSchema: yup.object({
            societyName: yup.string().required('Society Name is required'),
            pramukhName: yup.string().nullable(),
            pramukhNumber: yup.string().nullable(),
            spot: yup.string().nullable(),
            area: yup.string().required('Area is required'),
            description: yup.string().nullable(),
            programDate: yup.date().nullable()
        }),
        onSubmit: async(values) => {
            console.log(values);
            const response = await addSociety(values)
            console.log(response);
            formik.resetForm(); // Reset form after submission
        }
    });

    return (
        <Box m="20px">
            <Header title="SOCIETY" subtitle="Add New Society" />
            
            <form onSubmit={formik.handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns={isNonMobile ? "repeat(4, minmax(0, 1fr))" : "1fr"}
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? "span 2" : "span 4" },
                        backgroundColor: colors.primary[400],
                        padding: "20px",
                        borderRadius: "4px",
                        width: "100%",
                        maxWidth: "1200px",
                        margin: "0 auto"
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Society Name"
                        name="societyName"
                        value={formik.values.societyName}
                        onChange={formik.handleChange}
                        error={!!formik.errors.societyName}
                        helperText={formik.errors.societyName}
                        sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Pramukh Name"
                        name="pramukhName"
                        value={formik.values.pramukhName}
                        onChange={formik.handleChange}
                        error={!!formik.errors.pramukhName}
                        helperText={formik.errors.pramukhName}
                        sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Pramukh Number"
                        name="pramukhNumber"
                        value={formik.values.pramukhNumber}
                        onChange={formik.handleChange}
                        error={!!formik.errors.pramukhNumber}
                        helperText={formik.errors.pramukhNumber}
                        sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Location"
                        name="spot"
                        value={formik.values.spot}
                        onChange={formik.handleChange}
                        error={!!formik.errors.spot}
                        helperText={formik.errors.spot}
                        sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Area"
                        name="area"
                        value={formik.values.area}
                        onChange={formik.handleChange}
                        error={!!formik.errors.area}
                        helperText={formik.errors.area}
                        sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={!!formik.errors.description}
                        helperText={formik.errors.description}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Program Date"
                        name="programDate"
                        value={formik.values.programDate}
                        onChange={formik.handleChange}
                        error={!!formik.errors.programDate}
                        helperText={formik.errors.programDate}
                        sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button 
                        type="submit" 
                        color="secondary" 
                        variant="contained"
                        sx={{
                            width: isNonMobile ? "auto" : "100%",
                            padding: "10px 20px"
                        }}
                    >
                        Add New Society
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default Society
