import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import navItems from '../config/navItems'

const Home: NextPage = () => {
  console.log(navItems)

  return (
    <div>
      <Navbar items={navItems} />
      <h1>Home page</h1>
    </div>
  )
}

export default Home
