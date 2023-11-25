import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Người dùng',
    path: '/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Môn học',
    path: '/courses',
    icon: icon('book-svgrepo-com'),
  },
  {
    title: 'Giáo viên',
    path: '/teachers',
    icon: icon('ic_user'),
  },
  {
    title: 'Học sinh',
    path: '/students',
    icon: icon('ic_user'),
  },
];

export default navConfig;
