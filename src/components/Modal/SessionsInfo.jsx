import Paper from "@mui/material/Paper";
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {child, get} from "firebase/database";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export default function SessionInfo({studentId, openModal, setOpenModal, currentCourse, dbRef}) {
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const arrayAttendance = {};
  const fetchData = async () => {
    const sessionInfo = currentCourse.sessions;
    const promises = [];
    for (const date in sessionInfo) {
      for (const id in sessionInfo[date]) {
        const promise = get(child(dbRef, `Sessions/` + date + "/" + id + "/students/" + studentId))
          .then((snapshot) => {
            if (snapshot.exists()) {
              arrayAttendance[`${date}/${id}`] = snapshot.val();
            }
          });
        promises.push(promise);
      }
    }

    try {
      // Wait for all promises to resolve
      await Promise.all(promises);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchData().then(r => {
      setAttendanceStatus(arrayAttendance);
    });
  }, [currentCourse]);

  const handleFormatAttendance = (session, status) => {
    const [date, sessionId] = session.split("/");
    return (
      <Card>
        <CardContent>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            {date.split("-").reverse().join("-")}
          </Typography>
          <Typography variant="h5" component="div">
            {sessionId}
          </Typography>
          <Typography sx={{mb: 1.5}} color="text.secondary">
            {status === '' ? "Chưa điểm danh" : "Đã điểm danh"}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)} PaperComponent={Paper}
            PaperProps={{style: {width: '1000px', maxHeight: '800px'}}}>
      <DialogTitle>Thông tin điểm danh</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              {Object.entries(attendanceStatus).map(([key, value]) =>
                handleFormatAttendance(key, value)
              )}
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}