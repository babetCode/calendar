import AxiosInstance from "./AxiosInstance"
import { React, useEffect, useMemo, useState } from "react"
import { Box } from "@mui/material"

const Home = () => {

    const [myData, setMyData] = useState([])
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get(`users/`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {GetData()}, [])

    return(
        <div>
            { loading ? <p>Loading data...</p> :
                <div>
                    {myData.map((item, index) => (
                        <Box key={index} sx={{p:2, m:2, boxShadow:1}}>
                            <div> ID: {item.id }</div>
                            <div> Email: {item.email} </div>
                        </Box>
                    ))}
                </div>
            }
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

export default Home