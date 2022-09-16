function Form(){
    const initialValues = { username: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    };

    const checkData = async () => {
      const citiesRef = db.collection('userdata').where('email' , '==', formValues.email);
    const snapshot = await citiesRef.get();
    if (snapshot.empty) {
      addmembers();
      return;
    }else{
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
      setFormValues(initialValues)
      alert('Email Adress Already exist')
    }  
    
    
    
    }

    const addmembers = async ()=> {
      
      const data = {
        name: formValues.username,
        email: formValues.email,
        password: formValues.password
      };
      
      const res = await db.collection('userdata').add(data);
      setName(formValues.username)
      setFormValues(initialValues)
      setMemberQr(res.id)
    }
    useEffect(() => {
      function doit(){
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          checkData();
      }
      }
      doit();
    }, [formErrors]);
    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.username) {
        errors.username = "Username is required!";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
      } else if (values.password.length > 16) {
        errors.password = "Password cannot exceed more than 16 characters";
      }
      return errors;
    };

    
    
    return(
        <>
        <form onSubmit={handleSubmit} id='form'>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
          <TextField id="outlined-basic" label="Username" variant="outlined" 
              name="username"
              
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
            
          </div>
        
          <p>{formErrors.username}</p>
          <div className="field">
            <TextField id="outlined-basic" label="Email" variant="outlined" 
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
            
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            
            <TextField id="outlined-basic" label="Password" variant="outlined" 
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <Button onClick={handleSubmit} className="fluid ui button blue" variant="contained">Submit</Button>
        </div>
        {console.log('Its me 2')}
      </form>
      </>
    )
}