import { Helmet } from 'react-helmet-async';

import { TeacherView } from 'src/sections/teachers/view';

// ----------------------------------------------------------------------

export default function TeacherPage() {
  return (
    <>
      <Helmet>
        <title> Danh sách giáo viên </title>
      </Helmet>

      <TeacherView />
    </>
  );
}
