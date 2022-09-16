import { TextField, Button, Container } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Grid } from "@material-ui/core";
import { db } from "../firebase";


// Main component
export const AddMember = () => {
  // stores the UID that returned value from firestore
  const [memberQr, setMemberQr] = useState();
  // new member name
  const [name, setName] = useState();
  // New member ID
  const [memberNum, setMemberNum] = useState();

  //  qr code generater function
  const QrGenerater = (props) => {
    // hooks
    const [imageUrl, setImageUrl] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState(false);

    // Runs the function when QR code is generated
    useEffect(() => {
      addTextToImage(imageUrl);
      // eslint-disable-next-line
    }, [imageUrl]);

    // Canvas
    const ref = useRef(null);
    
    if (props.id === "") return;
    QRCode.toDataURL(props.id).then((url) => {
      setImageUrl(url);
    });

    function addTextToImage(imagePath) {
      // const newimg = imageToDataUri(imagePath, 300, 300)
      const canvas = ref.current;
      if (canvas !== null) {
        canvas.width = 300;
        canvas.height = 360;

        const ctx = canvas.getContext("2d");

        let img = new Image(imagePath);
        img.src = imagePath;
        img.width = 2000;
        console.log(canvas.height);
        ctx.fillStyle = "white";
        ctx.fill();
        img.addEventListener("load", () => {
          ctx.drawImage(img, 0, 0, 300, 300);
          ctx.font = "20px serif";
          ctx.fillText(props.id, 40, 330);
          ctx.font = "15px serif";
          ctx.fillText(props.name, 40, 350);
          ctx.fillText(props.memberNum, 200, 350);
          setNewImageUrl(canvas.toDataURL("image/jpeg", 1.0));
        });
      }
    }

    const showForm = () => {
      setMemberQr(undefined);
    };


    // Returns the generated 
    return (
      <>
        <Grid item md={6} lg={4} sm={12} sx={{ display: "inline" }}>
          <canvas ref={ref} id="canvas" hidden></canvas>

          {newImageUrl ? (
            <>
              <a href={newImageUrl} download>
                <img src={newImageUrl} alt={newImageUrl} />
              </a>
            </>
          ) : null}
        </Grid>
        <Button variant="contained" onClick={showForm}>
          Add Another
        </Button>
      </>
    );
  };

  function Form() {
    const initialValues = {
      membernum: "",
      name: "",
      idnum: "",
      address: "",
      email: "",
      phone: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const checkData = async () => {
      const citiesRef = db
        .collection("userdata")
        .where("email", "==", formValues.email);
      const snapshot = await citiesRef.get();
      if (snapshot.empty) {
        addmembers();
        return;
      } else {
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
        setFormValues(initialValues);
        alert("Email Adress Already exist");
      }
    };

    const addmembers = async () => {
      const data = {
        membernum: formValues.membernum,
        name: formValues.name,
        idnum: formValues.idnum,
        address: formValues.address,
        email: formValues.email,
        phone: formValues.phone,
      };
      console.log(data);
      const res = await db.collection("userdata").add(data);

      if (res.id) {
        setMemberNum(formValues.membernum);
        setName(formValues.name);
        setFormValues(initialValues);
        setMemberQr(res.id);
      }
    };
    useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        checkData();
      }

      // eslint-disable-next-line
    }, [formErrors]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    };

    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const regex_id = /^([1-9]{1}[0-9]{8}[Vv Xx])|([1-9]{1}[0-9]{11})$/gm;
      if (!values.name) {
        errors.name = "Member Name Cannot be emphty";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.idnum) {
        errors.idnum = "ID Number is required";
      } else if (!regex_id.test(values.idnum)) {
        errors.idnum = "This is not a valid ID format!";
      }
      if (!values.phone) {
        errors.phone = "Please enter a phone number";
      }
      return errors;
    };
    return (
      <>
        <form onSubmit={handleSubmit} id="form">
          <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans"></div>
          <h1>Member Register Form</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Member No"
                variant="outlined"
                name="membernum"
                placeholder="Member Number"
                value={formValues.membernum}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.membernum}</p>
            <div className="field">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.name}</p>

            <div className="field">
              <TextField
                fullWidth
                id="outlined-basic"
                label="ID number"
                variant="outlined"
                type="text"
                name="idnum"
                placeholder="ID Number"
                value={formValues.idnum}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.idnum}</p>
            <div className="field">
              <TextField
                fullWidth
                id="fullWidth"
                label="Address"
                variant="outlined"
                type="text"
                name="address"
                placeholder="Address"
                value={formValues.address}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.address}</p>
            <div className="field">
              <TextField
                fullWidth
                id="fullWidth"
                label="Email Address"
                variant="outlined"
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formValues.phone}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.phone}</p>
            <Button
              fullWidth
              onClick={handleSubmit}
              className="fluid ui button blue"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <Container maxWidth="md">
        {memberQr ? (
          <QrGenerater id={memberQr} name={name} memberNum={memberNum} />
        ) : (
          <Form />
        )}
      </Container>
    </>
  );
};
