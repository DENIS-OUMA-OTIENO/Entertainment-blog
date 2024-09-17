import { useSelector } from "react-redux"
import { jwtDecode } from 'jwt-decode'
import { selectCurrentToken } from "../auth/authSlice"

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    console.log('token', token)
    if(token){
        const decoded = jwtDecode(token)
        const { username } = decoded.UserInfo

        return { username }
    }
    
    return { username: '' }

}
export default useAuth