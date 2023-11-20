import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
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
    title: 'Học sinh',
    path: '/students',
    icon: icon('ic_user'),
  },
];

export default navConfig;
