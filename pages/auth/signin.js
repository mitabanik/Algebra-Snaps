import { getProviders, signIn as signIntoProvider } from 'next-auth/react';
import Header from "../../components/header"

function signIn({ providers }) {
    return (
        <>
        <Header />
        <div className='flex flex-col items-center pt-10'>
         <img className='h-40 w-100 p-10' src= "../../images/logo.png" alt="" />
         <img className='h-40 w-40 p-5 pb-10' src= "../../images/icon.gif" alt="" />
          Welcome to Algebra Snaps! Sign in to continue.
          <div className='mt-20'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="pb-2">
              <button className='p-3 bg-blue-500 rounded-lg text-white pr-8 pl-8' onClick={() => signIntoProvider(provider.id, {callbackUrl: '/' })}>
                {"  "} Sign in with {provider.name} 
              </button>
            </div>
          ))}

          </div>
        </div>
        
      </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}

export default signIn;