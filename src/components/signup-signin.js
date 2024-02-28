import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../components/signup.css";
import Formgroupchild from "./formgroup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import Header from "./header";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import {  getAuth,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
function Signup(){
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin]= useState(false);
  const navigate= useNavigate();
  
function googleAuth(){
  
  try{
    const auth11 = getAuth();
    const provider= new GoogleAuthProvider();
    signInWithPopup(auth11, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      createdoc(user);
      toast.success("User authenticated");
      navigate("/dashboard")
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      // The email of the user's account used.
      // ...
    });
  }catch(e){
      toast.error(e.message);
  }

  
  
}

  function loginwithemailandpassword(){
  if (email!="" && password!=""){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      toast.success("User Login");
      navigate("/dashboard");

      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    });
  }
  else{
    toast.error("All Fields are mandatory!")
  }
  }

  function Signupwithemail(){
    
   if (name!="" && email!="" && password!="" && confirmPassword!=""){
    if (password == confirmPassword){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("user" , user);
        toast.success("User created!")
        createdoc(user);
        navigate("/dashboard");
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        toast.error(errorMessage);
      });
      
    }
    else{
      toast.error("Passowrd and Confirm password are not match!")
    }
    
   } 
   else{
    toast.error("All fields are mandatory!")
   }
   
    
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

  }

  const handleNameChange = (e) => {
    setName(e.target.value);
    
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
   
  };

  const handlesubmit=(e)=>{
     e.preventDefault();
  }

 async function createdoc(user){

  if (!user) return;
  console.log("user")
  const userref=doc(db, "user", user.uid);
  const userdata= await getDoc(userref);

  if (!userdata.exists()){
    try{
    
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName: name,
        email,
        photoURL : user.photoURL ? user.photoURL:" ",
        createdAt: new Date(),
      })
      toast.success("Docs created")
    
  } 
  catch(e){
     toast.error(e.message)
  }
  }
  else{
    toast.error("user not exist")
  }
     
  
  
}
    
return (
  <>
  <Header></Header>
  <div className="yes">
    <div  className="my">
      
  {
    login ? <div>
    
       

      
       <Form className="have" onSubmit={handlesubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <p  className="title">Login On <span style={{color:"#387EF5"} }>Financly. </span> </p>
    
  </Form.Group>
 
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Email</Form.Label>
    <Form.Control className="tiss" type="email" placeholder="JohnDoe@gmail.com"  value={email} onChange={handleEmailChange}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control className="tiss" type="password" placeholder="Your Password " value={password} onChange={handlePasswordChange} />
  </Form.Group>

  <Formgroupchild name={name} email={email} password={password} confirmPassword={confirmPassword} ></Formgroupchild>

  <Button onClick={loginwithemailandpassword} id="button1" variant="primary" type="submit">
  Login using Email and Passowrd
  </Button>
  <p id="as">OR</p>
  <Button onClick={googleAuth} id="button2" variant="primary" type="submit">
  Signup With Google
  </Button>
  <p style={{textAlign:"center"}} onClick={()=>{setLogin(false)}}>Or Don't Have not An Account Already ? <span className="chiku" style={{color:"red"}} >Click Here</span>  </p>
</Form>


</div>
: <div>
    

      
       <Form className="have" onSubmit={handlesubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <p  className="title">Sign Up On <span style={{color:"#387EF5"} }>Financly. </span> </p>
    <Form.Label>Full Name</Form.Label>
    <Form.Control className="tiss" type="text" placeholder="John Doe" value={name} onChange={handleNameChange}  />
  </Form.Group>
 
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Email</Form.Label>
    <Form.Control className="tiss" type="email" placeholder="JohnDoe@gmail.com"  value={email} onChange={handleEmailChange}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control className="tiss" type="password" placeholder="Your Password " value={password} onChange={handlePasswordChange} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control className="tiss" type="password" placeholder="Confirm Password"  value={confirmPassword} onChange={handleConfirmPasswordChange}/>
  </Form.Group>

  <Formgroupchild name={name} email={email} password={password} confirmPassword={confirmPassword} ></Formgroupchild>

  <Button onClick={Signupwithemail} id="button1" variant="primary" type="submit">
  Signup With Email
  </Button>
  <p id="as">OR</p>
  <Button onClick={googleAuth} id="button2" variant="primary" type="submit">
  Signup With Google
  </Button>
  <p style={{textAlign:"center"}} onClick={()=>{setLogin(true)}}>Or Have An Account Already ? <span className="chiku" style={{color:"red"}}>Click Here</span>  </p>
</Form>


</div>
    
  }
 
 </div>
 </div>
 </>    
    )
}

export default  Signup;