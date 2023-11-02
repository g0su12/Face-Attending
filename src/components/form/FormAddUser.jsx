import React, {useState} from 'react';
import {
  Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography
} from '@mui/material';

function FormAddUser() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    id: '',
    role: 'teacher',
    birthday: '',
    gender: 'male',
    mainClass: '',
    name: '',
    photo: '',
    deviceId: '',
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData, [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (<Container maxWidth="sm">
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">MUI Form</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>Role:</FormLabel>
          <RadioGroup row name="role" value={formData.role} onChange={handleChange}>
            <FormControlLabel value="teacher" control={<Radio/>} label="Teacher"/>
            <FormControlLabel value="student" control={<Radio/>} label="Student"/>
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Birthday"
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel>Gender:</FormLabel>
          <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Main Class"
            name="mainClass"
            value={formData.mainClass}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Photo"
            name="photo"
            type="file"
            value={formData.photo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Device ID"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  </Container>);
}

export default FormAddUser;