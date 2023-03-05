import { auth } from '../../../Config/Config'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
    const navigate = useNavigate();
  return auth.onAuthStateChanged((user) => {
    if (user) {
        navigate('/')
    }
})
}
