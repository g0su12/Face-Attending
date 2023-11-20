export const columnsSession = [
  {field: 'id', headerName: 'ID', width: 110},
  {field: 'courseName', headerName: 'Môn học', width: 150},
  {
    field: 'teacherName',
    headerName: 'Giáo viên',
    width: 160,
  },
  {
    field: 'startTime',
    headerName: 'Thời gian bắt đầu',
    sortable: false,
    width: 150,
  },
  {
    field: 'startCheckInTime',
    headerName: 'Bắt đầu điểm danh',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'endTime',
    headerName: 'Thời gian kết thúc',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
  },
  {
    field: 'endCheckInTime',
    headerName: 'Kết thúc điểm danh',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'roomNo',
    headerName: 'Phòng',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 70,
  },
];


