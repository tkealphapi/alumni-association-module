import classNames from 'classnames'
import { useState } from 'react'

type NavbarItem = {
  link: string
  title: string
  classes?: string
}

type NavbarProps = {
  items: NavbarItem[]
}

const Navbar = ({ items }: NavbarProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const linkContainerClasses = classNames(
    'lg:flex flex-grow items-center',
    { 'flex mr-5': navbarOpen },
    { hidden: !navbarOpen }
  )

  const navItemList = buildNavItemList(items)

  return (
    <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-neutral-800 mb-3'>
      <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
        <div className='w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start'>
          <a
            className='text-xl font-bold leading-relaxed mr-4 py-2 whitespace-nowrap text-white flex items-center'
            href='#pablo'
          >
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img src='/svg/Houseplate_Flat_Color.svg' className='mr-2 h-8 sm:h-14' alt='Flowbite Logo' />
            }
            <span>Alpha-Pi Alumni Association</span>
          </a>
          <button
            className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
            type='button'
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className='block relative w-6 h-px rounded-sm bg-white'></span>
            <span className='block relative w-6 h-px rounded-sm bg-white mt-1'></span>
            <span className='block relative w-6 h-px rounded-sm bg-white mt-1'></span>
          </button>
        </div>
        <div className={linkContainerClasses} id='navbar-links-container'>
          <ul className='flex flex-col lg:flex-row list-none lg:ml-auto mr-auto lg:mr-0'>{navItemList}</ul>
        </div>
      </div>
    </nav>
  )
}

const buildNavItemList = (items: NavbarItem[]) => {
  return items.map(({ link, title, classes }, index) => {
    const combinedClasses = classNames(
      classes,
      'px-3 py-2 flex items-center text-lg font-bold leading-snug text-white hover:opacity-75'
    )

    return (
      <li className='nav-item' key={`nav-item-${index}`}>
        <a className={combinedClasses} href={link}>
          {title}
        </a>
      </li>
    )
  })
}

export default Navbar
