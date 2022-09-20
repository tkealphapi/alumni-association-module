type NavbarItem = {
  link: string,
  title: string,
  classes?: string
}

const navItems:NavbarItem[] = [
  {
    link: '/',
    title: 'Home'
  },
  {
    link: '/membership',
    title: 'Roster'
  },
  {
    link: '/events',
    title: 'Calendar'
  },
  {
    link: '/resources/main',
    title: 'Resources'
  },
  {
    link: '/login',
    title: 'Member Area'
  },
]

export default navItems