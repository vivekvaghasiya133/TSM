import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { api, getSociety, updateSociety } from "../../components/Api/api"; // Import the API module
import Header from "../../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the VisibilityIcon for the view button
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik and related components
import * as Yup from "yup";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]); // State to hold the rows data
  const [selectedRow, setSelectedRow] = useState(null); // State to hold the selected row
  const [open, setOpen] = useState(false); // State to control the dialog open/close
  const [editOpen, setEditOpen] = useState(false); // State to control the edit dialog open/close

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const response = await getSociety();
        console.log(response.data.data);
        // Assuming the endpoint to fetch societies
        if (response.data) {
          // Convert each row's _id to id to match the DataGrid's requirement
          // and add a custom id starting from 1
          const formattedRows = response.data.data.map((row, index) => ({
            ...row,
            id: row._id, // Use the real id as the id
            programDate: row.programDate ? new Date(row.programDate).toLocaleDateString('en-GB', { month: 'long', day: 'numeric' }) : 'Invalid', // Format date to show only date and month, or 'Invalid' if null
          }));
          setRows(formattedRows); // Update the state with the formatted data
        }
      } catch (error) {
        console.error('Error fetching societies:', error);
      }
    };

    fetchRows();
  }, []);

  const handleRowClick = (params) => {
    setSelectedRow(params.row); // Set the selected row
    setOpen(true); // Open the dialog
  };

  const handleEditClick = (params) => {
    setSelectedRow(params.row); // Set the selected row
    setEditOpen(true); // Open the edit dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    setEditOpen(false); // Close the edit dialog
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 }, // Adjusted width for the id field
    {
      field: "societyName",
      headerName: "Society Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "pramukhName",
      headerName: "Pramukh Name",
      flex: 1,
    },
    {
      field: "pramukhNumber",
      headerName: "Pramukh Number",
      flex: 1,
    },
    {
      field: "spot",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "programDate",
      headerName: "programDate",
      flex: 1,
    },
    {
      field: "area",
      headerName: "Area",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "seminarDemo",
      headerName: "Seminar Demo",
      flex: 1,
      type: "boolean",
    },
    {
      field: "satisfaction",
      headerName: "Satisfaction",
      flex: 1,
      type: "boolean",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <strong>
            <EditIcon onClick={() => handleEditClick(params)} />
          </strong>
          &nbsp;
          &nbsp;
          &nbsp;
          <strong>
            <VisibilityIcon onClick={() => handleRowClick(params)} />
          </strong>
        </>
      ),
    },
  ];
  // const validationSchema = Yup.object().shape({
  //   programDate: Yup.date()
  //     .nullable()
  //     .typeError("Invalid date")
  //     .notRequired(), // Program date is optional
  // });
  
  return (
    <Box m="20px">
      <Header title="SOCIETIES" subtitle="Managing the Societies" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} />
      </Box>
      ;

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: "#1976d2", color: "#fff", textAlign: "center" }}>
          {selectedRow?.societyName}
        </DialogTitle>
        <DialogContent sx={{ padding: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Pramukh Name:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedRow?.pramukhName}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Pramukh Number:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedRow?.pramukhNumber}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Location:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedRow?.spot}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Status:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedRow?.status}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Program Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedRow?.programDate}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Area:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedRow?.area}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Description:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedRow?.description}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Seminar Demo:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedRow?.seminarDemo ? "Yes" : "No"}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                Satisfaction:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedRow?.satisfaction ? "Yes" : "No"}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>;

      <Dialog open={editOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: "#1976d2", color: "#fff", textAlign: "center" }}>
          Edit {selectedRow?.societyName}
        </DialogTitle>
        <DialogContent sx={{ padding: 2, mt: 2 }}>
          <Formik
            initialValues={{
              _id : selectedRow?._id ,
              societyName: selectedRow?.societyName,
              pramukhName: selectedRow?.pramukhName,
              pramukhNumber: selectedRow?.pramukhNumber,
              spot: selectedRow?.spot,
              status: selectedRow?.status,
              programDate: selectedRow?.programDate,
              area: selectedRow?.area,
              description: selectedRow?.description,
              seminarDemo: selectedRow?.seminarDemo,
              satisfaction: selectedRow?.satisfaction
            }}
            // validationSchema={validationSchema}

            onSubmit={async(values, actions) => {
              const dataToSend = { ...values }
              if (!Yup.date().isValidSync(values.programDate)) {
                delete dataToSend.programDate;
              }
              const response = await updateSociety(values._id , dataToSend)
              console.log(response);
              
              
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Society Name:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field type="text" name="societyName" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Pramukh Name:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field type="text" name="pramukhName" />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Pramukh Number:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field type="text" name="pramukhNumber" />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Location:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field type="text" name="spot" />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Status:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field type="text" name="status" />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Program Date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field type="date" name="programDate" />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Area:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field type="text" name="area" />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Description:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field as="textarea" name="description" />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Seminar Demo:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field type="checkbox" name="seminarDemo" />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Satisfaction:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Field type="checkbox" name="satisfaction" />
                </Grid>
              </Grid>
              <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
                <Button onClick={handleClose} variant="outlined" color="secondary">
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
       
      </Dialog>;
    </Box>
  );
};

export default Team;
