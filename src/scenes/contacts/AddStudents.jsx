import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button, TextField, Typography, Container, Grid, Autocomplete } from '@mui/material'
// import { getSocieties } from '../../api/societies' // Assuming this is the API call to fetch societies
import { addStudent, getSociety } from '../../components/Api/api'

function AddStudents() {
    const [societies, setSocieties] = useState([])

    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                const response = await getSociety()
                setSocieties(response.data.data)
            } catch (error) {
                console.error('Error fetching societies:', error)
            }
        }

        fetchSocieties()
    }, [])

    return (
        <Container maxWidth="sm" sx={{ marginTop: '20px' }}>
            <Typography variant="h5" align="center" sx={{ marginBottom: '20px' }}>
                Add Students
            </Typography>
            <Formik
                initialValues={{
                    studentName: '',
                    contactNumber: '',
                    societyName: ''
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.studentName) {
                        errors.studentName = 'Required';
                    }
                    if (!values.contactNumber) {
                        errors.contactNumber = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async(values, { setSubmitting, resetForm }) => {
                    console.log(values);
                    // Reset only studentName and contactNumber
                    resetForm({
                        values: {
                            studentName: '',
                            contactNumber: '',
                            societyName: values.societyName // Keep societyName as is
                        }
                    });
                    const response = await addStudent(values)
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    type="text"
                                    name="studentName"
                                    placeholder="Student Name"
                                    fullWidth
                                    variant="outlined"
                                />
                                <ErrorMessage name="studentName" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    type="text"
                                    name="contactNumber"
                                    placeholder="Contact Number"
                                    fullWidth
                                    variant="outlined"
                                />
                                <ErrorMessage name="contactNumber" component="div" />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={societies.map(society => ({ label: society.societyName, value: society._id }))}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => {
                                        if (value) {
                                            setFieldValue('societyName', value.value);
                                        } else {
                                            setFieldValue('societyName', ''); // Clear value if nothing is selected
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="societyName"
                                            placeholder="Society Name"
                                            fullWidth
                                            variant="outlined"
                                        />
                                    )}
                                />
                                <ErrorMessage name="societyName" component="div" />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '20px' }}>
                                <Button type="submit" disabled={isSubmitting} sx={{backgroundColor:"#fff" , color:"#000" , fontSize:'18px' , fontWeight:800}} variant="contained" fullWidth>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default AddStudents
