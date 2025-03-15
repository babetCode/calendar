import '../App.css'
import { Box } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyPassField from './forms/MyPassField'
import MyButton from './forms/MyButton'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm()

    const submission = (data) => {
        AxiosInstance.post(`register/`, {
            email: data.email,
            password: data.password
        })

        .then(response => {
            // console.log(response)
            navigate(`/`)
        })
    }

    return(
        <div className={"myBackground"}>

            <form onSubmit={handleSubmit(submission)}>

                <Box className={"whiteBox"}>
                    <Box className={"itemBox"}>
                        <Box className={"title"}>Sign Up</Box>
                    </Box>

                    <Box className={"itemBox"}>
                        <MyTextField
                        label={"Email"}
                        name = {"email"}
                        control = {control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyPassField
                        label={"Password"}
                        name = {"password"}
                        control = {control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyPassField
                        label={"Confirm Password"}
                        name = {"password2"}
                        control = {control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyButton
                        type={"submit"}
                        label={"Create Account"}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <Link to="/">Already have an account? Sign in here</Link>
                    </Box>
                </Box>

            </form>
            
        </div>
    )
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/auth/login", {
//         email,
//         password,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
}

export default Login