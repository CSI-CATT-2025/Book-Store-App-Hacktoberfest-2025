import { useAuth } from '../context/Authprovider'
import toast from 'react-hot-toast';

function Logout() {
    const {authUser, setAuthUser}=useAuth();
    const handlelogout=() => {
        try {
            setAuthUser({
                ...authUser,
                user:null
            })
            localStorage.removeItem('Users');
            toast.success("Logged out successfully");
            setTimeout(() =>{
                window.location.reload()},2000);
           
        } catch (error) {
            toast.error("Error:",error.message);
            setTimeout(() =>{},3000);
        }
    };
    return (
        <div><button className='px-3 py-2 bg-red-500 text-white cursor-pointer rounded-md' onClick={handlelogout}>Logout</button>
        </div>
    )
}

export default Logout