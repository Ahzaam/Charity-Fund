import React, { useState, useEffect } from "react";
import { Card, Button } from "@material-ui/core";
import { QrReader } from "react-qr-reader";
import { db } from "../firebase";
import Paper from "@material-ui/core/Paper";
import { motion } from "framer-motion";

import "./css/qrstyle.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";


// import Grid from '@material-ui/core/Grid'
export const QrScanner = (props) => {
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [membernum, setMembernum] = useState();
  const [scannerStatus, setScannerStatus] = useState(true);
  const [paid, setPaid] = useState('')
  let collection = props.collection;
  let evdoc = props.evdoc;

  async function markPaid(collection, evdoc, data) {
    await db
      .collection(collection)
      .doc(evdoc)
      .collection("Members")
      .doc(data)
      .update({ status: "paid" });
  }

  function handlePayment() {
    markPaid(collection, evdoc, data);
  }

  const checkData = async (id) => {
    if (id) {
      
      const doc = db.collection(collection).doc(evdoc).collection('Members').doc(id);
      console.log(collection)
      await doc.onSnapshot(
        (docSnapshot) => {
          console.log(`Received doc snapshot: ${docSnapshot}`);
          update()
          // ...
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );

      async function update(){
        const citiesRef = db.collection(collection).doc(evdoc).collection('Members').doc(id);

        
      const snapshot = await citiesRef.get();
     
      if (!snapshot.data() && id) {
        setName();
        setAddress();
        setMembernum();
        alert("No Member Found");
        setData();
        setPaid('')
        setScannerStatus(true);
        return;
      } else {
        setName(snapshot.data().name);
        setAddress(snapshot.data().address);
        setMembernum(snapshot.data().membernum);
        setPaid(snapshot.data().status)
        setScannerStatus(false);
      }
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    checkData(data);
    // eslint-disable-next-line
  }, [data]); // <-- here put the parameter to listen

  function displayMember() {
    const handleClear = () => {
      setData(null);

      setName(null);
      setAddress(null);
      setMembernum(null);

      setScannerStatus(true);
    };

    return (
      <>
       <motion.div>
       <Paper
          style={{ paddingTop: 5  , paddingLeft: 20, paddingBottom: 5 }}
          align="left"
        >
          <div>
          <h1>{paid === 'paid'?<div className="marktt" ><FontAwesomeIcon icon={faCircleCheck} /></div> 
            :<div className="mark" ><FontAwesomeIcon className="markxx"  icon={faCircleXmark}  /></div> 
            }</h1>
            <h4>Name: {name}</h4>
            <h4>Member ID:{membernum}</h4>
            <h4>Address: {address}</h4>
            <h4>Status: {paid}</h4>

            
          </div>
        </Paper>

        <Button
        fullWidth
          style={{ margin: 10, backgroundColor:'#00ff88', width:'40%' }}
          sx={{ width: 100 }}
          variant="contained"
          
          color="inherit"
          onClick={handlePayment}
        >
          Mark Paid
        </Button>

        <Button  style={{ margin: 10, width:'40%' }} m={2} onClick={handleClear} variant="contained" color="primary">
          Scan New
        </Button>
       </motion.div>
      </>
    );
  }

  function Loding() {
    const clear = () => {
      setData();
    };
    if (data && !name) {
      return (
        <>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
          <Button
            style={{ margin: 20 }}
            variant="outlined"
            onClick={clear}
            color="secondary"
          >
            Clear
          </Button>
        </>
      );
    }
  }
  let to = '/list/'+ collection + '/' + evdoc
  return (
  
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ width: scannerStatus ? "100%" : 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ textAlign: "center", margin: "auto" }}
      >
        <div className="qrscanner">
          
          <QrReader
            constraints={{
              facingMode: "environment",
            }}
            showMarker={false}
            onResult={(result) => {
              if (!!result) {
                setData(result?.text);
              }
            }}
          />
          
        </div>
        
      </motion.div>

      <Card align="center">
        {data ? <h5>Member UID: {data}</h5> : <h4>Scan Qr Code</h4>}
        <Loding />
        {name ? displayMember() : <></>}

        
        <Link to={to}>
        <Button
        fullWidth
            style={{ margin: 20 }}
            variant="contained"
            
            color="secondary"
          >
            See List
          </Button>
        </Link>
      </Card>
    </>
  );
};
