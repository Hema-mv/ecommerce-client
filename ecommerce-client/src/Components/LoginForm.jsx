import { useState ,useContext} from "react";
//import { userService } from "./users-services";
import { login } from "../utilities/users-service";
import { useNavigate } from "react-router-dom";
//import { UserContext } from "../Utilities/userContext";

function LoginForm(props) {

  const [ formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [error, setError] = useState("");
  //const { setUser } = useContext(UserContext);
  //const { setUser } = useContext(null);
  const navigate = useNavigate();

  function handleChange (e){
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  async function handleSubmit(e){ 
    e.preventDefault();
    //console.log(formData);
    const credentials={...formData};
    try{
      // The promise returned by the login service method will resolve to the user
      // object included int he payload of the JWT
      const user=await login(credentials);
      
      props.setUser({ id: user._id, name: user.name, email: user.email });
      console.log('credentials',user._id,user.name);
    //setUser({ id: user._id, name: user.name });
    // console.log('userss',user);
    navigate("/"); 
    
      //  const submitData={...formData};
      //   console.log(submitData);
      //   const user=await login(submitData);
      //   console.log(user);
      //   props.setUser(user);   
    }
    catch(err){
      console.log(err)
      setError("Loging failed");
    }
  }
  return(
    <>
      <div className="login-form">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>

</>
 );
}
export default LoginForm;