import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QrScanner } from "../components/Qrcode";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { db } from "../firebase";
import LinearProgress from "@material-ui/core/LinearProgress";

export const QrHome = () => {
  // const [evcreated, setEvcreated] = useState(false);
  const [progress, setProgress] = useState(false);
  let { event } = useParams(); //evmonth
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let m = month[d.getMonth()];
  let y = d.getFullYear();
  let collection;
  let evdoc;

  if (event === "monthlycollection") {
    collection = event;
    evdoc = y + "-" + m;
  } else {
    collection = "monthlycollection";
    evdoc = y + "-" + m;

    // evdoc = event;
    // collection = "events";
  }

  const getDatas = async () => {
    let empty = false;
    const event = db.collection(collection).doc(evdoc).collection("Members");
    await event.get().then((data) => {
      empty = data.empty;
    });

    if (empty) {
      let memberdata = [];
      const members = db.collection("userdata");
      const snapshot = await members.get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach((doc) => {
        let docid = doc.id;
        memberdata.push({
          membernum: doc.data().membernum,
          uid: doc.id,
          name: doc.data().name,
          address: doc.data().address,
          idnum: doc.data().idnum,
          phone: doc.data().phone,
          status: "Unpaid",
        });

        setProgress(true);
        memberdata.map(async (data) => {
          await db
            .collection(collection)
            .doc(evdoc)
            .collection("Members")
            .doc(docid)
            .set(data);
        });

        setProgress(false);
      });
    } else {
      return;
    }
  };

  useEffect((data) => {
    getDatas();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <h2>{event} </h2>
        {progress ? <LinearProgress /> : <></>}
        <Grid>
          <QrScanner collection={collection} evdoc={evdoc} />
        </Grid>
      </Container>
    </>
  );
};
