import { useEffect ,useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function CheckLogin() {
  const PORT = 3300;
  const navigate = useNavigate();
  const [token , setToken] = useState('');


  useEffect(() => {
    Axios.get(`http://localhost:${PORT}/login`)
      .then(response => {
        console.log(response.data);
        setToken(response.data.token); // Assuming setUsername is a state updater function    
      })
      .catch(error => {
        console.error('Error fetching login data', error);
        // If not logged in, call the callback function to redirect to the login page
        navigate('/login');
      });
  }, [token, navigate]);

  return null; // This component doesn't render anything
}

export default CheckLogin;
