import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Typography, Button, Grid, Paper, Select, MenuItem, Switch } from '@mui/material';
import { styled } from '@mui/system';

const DARK_BACKGROUND_COLOR = '#070D10';
const LIGHT_BACKGROUND_COLOR = '#FFFFFF';
const DARK_TEXT_COLOR = '#FFFFFF';
const LIGHT_TEXT_COLOR = '#070D10';

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [placeName, setPlaceName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To ask');
  const [editPlaceId, setEditPlaceId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // State for theme

  useEffect(() => {
    const savedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    setPlaces(savedPlaces);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const sortPlacesByDate = (placesList) => {
    return placesList.sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified));
  };

  const handleAddOrUpdatePlace = () => {
    if (placeName.trim() && description.trim()) {
      if (editPlaceId) {
        const updatedPlaces = places.map((place) =>
          place.id === editPlaceId
            ? { ...place, site_name: placeName, description, status, dateModified: new Date().toISOString() }
            : place
        );
        setPlaces(sortPlacesByDate(updatedPlaces));
        setEditPlaceId(null);
      } else {
        const newPlace = {
          id: uuidv4(),
          site_name: placeName,
          description,
          status,
          dateModified: new Date().toISOString(),
        };
        setPlaces((prevPlaces) => sortPlacesByDate([...prevPlaces, newPlace]));
      }
      setPlaceName('');
      setDescription('');
      setStatus('To ask');
    }
  };

  const handleDeletePlace = (id) => {
    const updatedPlaces = places.filter((place) => place.id !== id);
    setPlaces(sortPlacesByDate(updatedPlaces));
  };

  const handleEditPlace = (place) => {
    setEditPlaceId(place.id);
    setPlaceName(place.site_name);
    setDescription(place.description);
    setStatus(place.status);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Colors and styles based on the theme
  const backgroundColor = isDarkMode ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR;
  const textColor = isDarkMode ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR;
  const paperBackgroundColor = isDarkMode ? '#0E1215' : '#F5F5F5';

  return (
    <StyledHomePage style={{ backgroundColor, color: textColor }}>
      <Header>
        <TitleWrapper>
          <Typography variant="h4" gutterBottom>
            Manage Places
          </Typography>
        </TitleWrapper>
        <ThemeToggle>
          <Typography variant="body1" style={{ marginRight: '10px' }}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Typography>
          <Switch checked={isDarkMode} onChange={handleThemeToggle} />
        </ThemeToggle>
      </Header>

      <CenteredContainer>
        <StyledPaper style={{ backgroundColor: paperBackgroundColor }}>
          <Typography variant="h6">{editPlaceId ? 'Edit Place' : 'Add New Place'}</Typography>
          <TextField
            label="Place Name"
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
            style={{ marginBottom: '10px' }}
          />
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          >
            <MenuItem value="To ask">To ask</MenuItem>
            <MenuItem value="In progress">In progress</MenuItem>
            <MenuItem value="Finished">Finished</MenuItem>
          </Select>
          <StyledButton variant="contained" onClick={handleAddOrUpdatePlace}>
            {editPlaceId ? 'Save Changes' : 'Add New Place'}
          </StyledButton>
        </StyledPaper>
      </CenteredContainer>

      <Grid container spacing={2}>
        {places.map((place) => (
          <Grid item xs={12} key={place.id}>
            <StyledPaper style={{ backgroundColor: paperBackgroundColor }}>
              <Typography variant="h6">{place.site_name}</Typography>
              <Typography variant="body1">{place.description}</Typography>
              <Typography variant="body2">Status: {place.status}</Typography>
              <Typography variant="body2">
                Last Modified: {new Date(place.dateModified).toLocaleString()}
              </Typography>
              <StyledButton
                variant="outlined"
                color="secondary"
                onClick={() => handleDeletePlace(place.id)}
                style={{ marginRight: '10px' }}
              >
                Delete
              </StyledButton>
              <StyledButton variant="outlined" onClick={() => handleEditPlace(place)}>
                Edit
              </StyledButton>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </StyledHomePage>
  );
};

// Styled components
const StyledHomePage = styled('div')({
  padding: '40px',
  maxWidth: '1000px',
  margin: '0 auto',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  minHeight: '100vh',
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  position: 'relative',
});

const TitleWrapper = styled('div')({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});

const ThemeToggle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
});

const CenteredContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
});

const StyledButton = styled(Button)({
  backgroundColor: PRIMARY_COLOR,
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#007BB5',
  },
});

export default HomePage;
