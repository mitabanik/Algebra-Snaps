import { signOut,useSession } from 'next-auth/react'

function MiniProfile() {
  const {data : session } = useSession();
 
  return (  
     <div className="hidden xl:flex xl:items-center xl:justify-between ml-5 mb-5">
        <img className="rounded-full border p-[2px] w-10 h-10"
        src={session?.user?.image}
        alt="User Image"
        />

        <div className="flex-1 mx-4">
           <h2 className="font-bold text-white">{session?.user?.username}</h2>
           <h3 className="text-sm text-gray-400">Welcome to Algebra Snaps!</h3>
        </div>

        <button onClick={signOut}
           className="text-blue-400 text-sm font-semibold pr-3"> 
           Sign Out
        </button>

    </div>
     
 )
}

export default MiniProfile