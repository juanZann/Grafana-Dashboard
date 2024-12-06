// src/components/AddNewPlaceForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel, Paper, styled } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const PRIMARY_COLOR = '#0091EA';
const LIGHT_BACKGROUND_COLOR = '#FFFFFF';
const LIGHT_TEXT_COLOR = '#070D10';

const StyledFormContainer = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  backgroundColor: LIGHT_BACKGROUND_COLOR,
  color: LIGHT_TEXT_COLOR,
});

const AddNewPlaceForm = ({ onAddPlace, placeToEdit, onEditComplete }) => {
  const [placeName, setPlaceName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [status, setStatus] = useState('In Progress');
  const [ticketAdded, setTicketAdded] = useState(false); // New state for ticket

  useEffect(() => {
    if (placeToEdit) {
      setPlaceName(placeToEdit.site_name);
      setDescription(placeToEdit.description);
      setDate(placeToEdit.date);
      setStatus(placeToEdit.status);
      setTicketAdded(placeToEdit.ticketAdded || false); // Populate ticketAdded if editing
    }
  }, [placeToEdit]);

  const handleAddOrEditPlace = () => {
    if (placeName.trim() && description.trim()) {
      const placeData = {
        id: placeToEdit ? placeToEdit.id : uuidv4(),
        site_name: placeName,
        description,
        date,
        status,
        ticketAdded,
      };

      if (placeToEdit) {
        onEditComplete(placeData);
      } else {
        onAddPlace(placeData);
      }

      // Reset form fields
      setPlaceName('');
      setDescription('');
      setDate(new Date().toISOString().substr(0, 10));
      setStatus('In Progress');
      setTicketAdded(false);
    }
  };

  return (
    <StyledFormContainer>
      <Typography variant="h5" gutterBottom>
        {placeToEdit ? 'Edit Place' : 'Add New Site Analysis'}
      </Typography>
      <TextField
        label="Site Name"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <FormControl fullWidth style={{ marginBottom: '10px' }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Finished">Finished</MenuItem>
          <MenuItem value="To Ask">To Ask</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={ticketAdded}
            onChange={(e) => setTicketAdded(e.target.checked)}
            sx={{
              color: PRIMARY_COLOR,
              '&.Mui-checked': {
                color: PRIMARY_COLOR,
              },
            }}
          />
        }
        label="Ticket Added"
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleAddOrEditPlace}>
        {placeToEdit ? 'Save Changes' : 'Add Site Analysis'}
      </Button>
    </StyledFormContainer>
  );
};

export default AddNewPlaceForm;