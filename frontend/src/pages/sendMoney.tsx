import Card from '../components/card'
import Button from '../components/button'
import Headings from '../components/header'
import InputBox from '../components/input'
import ProfilePicture from '../components/profilePicture'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { usersResponseType } from '../utils/types'

export default function TransferPage() {
  const [amount, setAmount] = useState("")
  const [user, setUser] = useState<usersResponseType | null>(null);
  const { to } = useParams();
  const navigate = useNavigate();

       
   

  const handleTransferSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const transferResponse = await axios.post(`http://localhost:3000/api/v1/account/transfer/${to}`, { amount }, { withCredentials: true })
      if(transferResponse.status === 200){
        toast.success("Transfer successful")
        navigate('/dashboard')
      } else {
        throw new Error("Transfer failed")
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error("Transfer failed")
      return;
    }
  }

  useEffect(() => {
    if(!to){
      setUser(null)
    }
    const getUser = async () => {
      try {
        const user = await axios.get(
          `http://localhost:3000/api/v1/user/getuser/${to}`,
          { withCredentials: true }
        );

        if (!user || user?.status !== 200) {
          throw new Error("User not found")
        }
        console.log(user.data);

        setUser(user.data.user)
      } catch (error) {
        console.log(error);
        toast.error("User not found")

      }
    }
    getUser();
  }, [])

  return (
    <Card classname='h-fit'>
      <Headings
        className='mb-5'
        heading="Send Money"
        subheading="Please enter the amount (in Rs)"

      />
      <div className="mt-3 flex flex-col w-full" >
        {user && (
          <div className='flex items-center mb-4'>
            <ProfilePicture name={user.firstName} className='bg-green-500 text-white font-extrabold' />
            <p className='ml-2'>{user.firstName[0].toUpperCase () + user.firstName.slice(1)} {user.lastName[0].toUpperCase() + user.lastName.slice(1)}</p>
          </div>
        )}
        <InputBox
          label=""
          value={amount}
          placeholder="3400"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={handleTransferSubmit} 
          classname='bg-green-500 text-white w-full'> Initiate Transfer </Button>

      </div>
    </Card>
  )
}
