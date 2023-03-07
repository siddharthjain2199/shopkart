import { auth } from '../../../Config/Config'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'

export const Auth = () => {
  const navigate = useNavigate();
  return auth.onAuthStateChanged((user) => {
    if (!(isEmpty(user))) {
      navigate('/')
    }
  })
}
