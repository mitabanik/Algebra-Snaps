import { SearchIcon, HomeIcon, MenuIcon, PaperAirplaneIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { signIn,signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

function Header() {
  const { data:session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const router = useRouter()

  return (
    <div className='shadow-sm border-b bg-black sticky top-0 z-50'>
      <div className='flex justify-between max-w-6xl mx-5 p-1 lg:mx_auto'>
        <div onClick={() => router.push('/')} className='relative hidden lg:inline  w-10 cursor-pointer pt-1'>
          <div className='flex justify-between'>
          <img src='../images/icon.gif' className='object-contain'/>
          <p className='text-white font-bold pl-5'>Algebra Snaps</p>
          </div>
          
        </div>
      
        <div onClick={() => router.push('/')} className='relative w-10 lg:hidden flex-shrink-0 pt-1'>
            <img src='../images/icon.gif' layout='fill' objectFit='contain'/>
        </div> 
        {/*<div className='max-w-xs'>
            <div className='relative mt-1 p-3 rounded-md'>
                <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                    <SearchIcon className='h-5 w-5'/>
                </div>
                <input className='bg-gray-50 block w-full pl-10 sm:text-sm rounded-md' placeholder="Search" id="text"/> 
             </div>
        </div> */}
       
        {session ? (
        <div className='flex items-center justify-end space-x-4'>
            <HomeIcon onClick={() => router.push('/')} className='navBtn'/>

            <PlusCircleIcon onClick={()=> setOpen(true)} className='navBtn'/>
            
            <MenuIcon className='h-6 md:hidden cursor-pointer'/>

            <img onClick={signOut}
            src={session.user.image} alt="Profile icon"
            className='h-8 rounded-full cursor-pointer'/>
            
        </div>
        ): (
          <button onClick={signIn} className='text-white'> Sign In</button>
        )}
      </div>
    </div>
  )
}

export default Header
