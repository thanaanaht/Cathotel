import { useEffect ,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function CheckLogin() {
  const PORT = 3300;
  const navigate = useNavigate();
  const [token , setToken] = useState('');
  const [username , setUsername] = useState('No Login');


  useEffect(() => {
    Axios.get(`http://localhost:${PORT}/login`)
      .then(response => {
        console.log(response.data);
        setToken(response.data.token); 
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error('Error fetching login data', error);
        // If not logged in, call the callback function to redirect to the login page
        navigate('/login');
      });
  }, [token, navigate]);

  return (
    <div>
      Username: {username}
    </div>

  ) 

}

export default CheckLogin;
