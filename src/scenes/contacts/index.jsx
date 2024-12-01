import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataStudents } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { getStudent } from "../../components/Api/api";
import { useEffect, useState } from "react";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const response = await getStudent();
        console.log(response.data.data , "Data");
    
        
        // Convert each row's _id to id to match the DataGrid's requirement
        const formattedRows = response.data.data.map((row) => ({
          ...row,
          id: row._id,
          societyName : row.societyName.societyName // Use the real id as the id
        }));
        setStudents(formattedRows); 
      
      } catch (error) {
        console.error('Error fetching societies:', error);
      }
    };

    fetchRows();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "studentName", headerName: "Student Name" },
    { field: "contactNumber", headerName: "Contact Number" },
    { field: "attendSeminar", headerName: "Attend Seminar",flex: 1,
      type: "boolean" },
    { field: "attendDemo", headerName: "Attend Demo" ,flex: 1,
      type: "boolean" },
    { field: "societyName", headerName: "Society Name"},
    { field: "followupDetails", headerName: "Follow-up Details" },
  ];

  return (
    <Box m="20px">
      <Header
        title="STUDENTS"
        subtitle="List of Students for Future Reference"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
