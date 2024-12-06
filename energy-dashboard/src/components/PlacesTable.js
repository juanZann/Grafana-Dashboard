// src/components/PlacesTable.js
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  styled,
} from '@mui/material';

const PRIMARY_COLOR = '#0091EA'; // Define a primary color
const StyledTableContainer = styled(TableContainer)({
  marginTop: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#070D10', // Dark text color
});

const PlacesTable = ({ places, onEditPlace, onDeletePlace }) => {
  if (places.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>
        No places added yet.
      </Typography>
    );
  }

  // Sort places by date
  const sortedPlaces = [...places].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Function to get the background color based on the status
  const getRowColor = (status) => {
    switch (status) {
      case 'Finished':
        return '#E8F5E9'; // Soft green
      case 'In Progress':
        return '#FFFDE7'; // Light yellow
      case 'To Ask':
        return '#FFF3E0'; // Soft orange
      default:
        return 'transparent'; // Default background color
    }
  };

  return (
    <StyledTableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: '10px', textAlign: 'center', color: PRIMARY_COLOR }}>
        Places Added
      </Typography>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>Place Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Date Added</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Ticket Added</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlaces.map((place) => (
            <TableRow key={place.id} sx={{ backgroundColor: getRowColor(place.status) }}>
              <TableCell>{place.site_name}</TableCell>
              <TableCell>{place.description}</TableCell>
              <TableCell>{new Date(place.date).toLocaleDateString()}</TableCell> {/* Format date */}
              <TableCell>{place.status}</TableCell>
              <TableCell>{place.ticketAdded ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => onEditPlace(place.id)} sx={{ marginRight: '10px' }}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => onDeletePlace(place.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default PlacesTable;