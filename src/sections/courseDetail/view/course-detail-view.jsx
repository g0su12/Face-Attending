import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { child, get, getDatabase, ref } from 'firebase/database';
import { columnsSession } from '../../../common/constant/constant';
import Paper from '@mui/material/Paper';

import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import { AttendanceCard } from 'src/components/card/AttendanceCard';
// ----------------------------------------------------------------------

export default function CourseDetailView() {
  const { courseId } = useParams();
  const [currentStudents, setCurrentStudents] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState();
  const [currentAttendance, setCurrentAttendance] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalSecond, setOpenModalSecond] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState([]);
  const arrayAttendance = [];
  const dbRef = ref(getDatabase());

  const fetchData = async (data) => {
    const sessionInfo = data.sessions;
    const promises = [];
    for (const date in sessionInfo) {
      for (const id in sessionInfo[date]) {
        const promise = get(child(dbRef, `Sessions/` + date + '/' + id)).then((snapshot) => {
          if (snapshot.exists()) {
            arrayAttendance.push(snapshot.val());
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
    get(child(dbRef, `Courses/` + courseId)).then((snapshot) => {
      if (snapshot.exists()) {
        fetchData(snapshot.val()).then((r) => {
          setAttendanceStatus(arrayAttendance);
        });
      }
    });
  }, []);

  const handleRowClick = (params) => {
    setOpenModal(true);
    setCurrentStudents(params.row.students);
    setCurrentSessionId(params.row.id);
  };

  const showDetailAttendance = (studentId, status) => {
    if (status !== '') {
      setOpenModalSecond(true);
      get(child(dbRef, `Attendance/` + currentSessionId + '/' + studentId)).then((snapshot) => {
        if (snapshot.exists()) {
          setCurrentAttendance(snapshot.val());
        }
      });
    }
  };

  const handleFormatAttendance = (studentId, status) => {
    return (
      <Card onClick={() => showDetailAttendance(studentId, status)}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {status.split('T')[0].split('-').reverse().join('-')}
          </Typography>
          <Typography variant="h5" component="div">
            {studentId}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {status === '' ? 'Chưa điểm danh' : 'Đã điểm danh'}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Danh sách tiết học của mã môn {courseId}</Typography>
      </Stack>
      <Card>
        <DataGrid
          rows={attendanceStatus}
          columns={columnsSession}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          onCellClick={handleRowClick}
        />
      </Card>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperComponent={Paper}
        PaperProps={{ style: { width: '1000px', maxHeight: '800px' } }}
      >
        <DialogTitle>Thông tin điểm danh</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12}>
                {Object.entries(currentStudents).map(([key, value]) =>
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
      <Dialog
        open={openModalSecond}
        onClose={() => setOpenModalSecond(false)}
        PaperComponent={Paper}
        PaperProps={{ style: { width: '1000px', maxHeight: '800px' } }}
      >
        <DialogTitle>Thông tin điểm danh</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <AttendanceCard
              avatarSrc={currentAttendance?.photo}
              studentName={currentAttendance?.name}
              timeAttendance={currentAttendance?.checkInTime}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModalSecond(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
