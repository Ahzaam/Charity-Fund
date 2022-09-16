import "./css/list.css";
import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
/**
 * This is an example of animating shared layouts in Framer Motion 2.
 *
 * The open state of each panel is contained locally to that component. Wrapping
 * them all in the same AnimateSharedLayout component allows them all to animate
 * in response to state changes that affect each other's layout.
 *
 * Try removing AnimateSharedLayout to see how that affects the animation.
 */

export default function List() {
  const [items, setItems] = useState([]);
  const [update, setUpdate] = useState(true);
 

  const getData = async () => {
    const user = db.collection("userdata");
    await user.onSnapshot((data) => {
      setItems([]);
      data.forEach((item) => {
      
        setItems((prevarr) => [...prevarr, item.data()]);
      });
    });
    setUpdate(true);
  };



  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  function Loding() {
    if (items.length <= 0) {
      return (
        <>
          <Box style={{ display: "flex", marginTop: 100 }}>
            <CircularProgress
              style={{ alignItems: "center", margin: "auto" }}
            />
          </Box>
        </>
      );
    }
  }

  if (update) {
    // setUpdate(false)
    return (
      <>
        <Loding />
        <AnimateSharedLayout>
          <motion.ul layout initial={{ borderRadius: 25 }}>
            {items.map((item) => (
              <Item key={item.idnum} item={item} />
            ))}
          </motion.ul>
        </AnimateSharedLayout>
      </>
    );
  }
}

function Item(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }} sx={{ boxShadow: 3 }}>  
      <motion.div className="avatar" layout style={{fontWeight:'bold'}}>
        {props.item.membernum}
      </motion.div>
      <motion.div className="name" layout>
        {props.item.name}
      </motion.div>
      <motion.div className="markt" layout>
      <FontAwesomeIcon icon={faCircleCheck} />
      
      </motion.div>
      <motion.div className="markx" layout>
      
      <FontAwesomeIcon icon={faCircleXmark}  />
      </motion.div>


      <AnimatePresence>
        {isOpen && <Content content={props.item} />}
      </AnimatePresence>
    </motion.li>
  );
}

function Content(props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* /<div className="row"/> */}
      <div className="detrow">Address: {props.content.address}</div>
      <div className="detrow">Phone: {props.content.phone}</div>
      <div className="detrow">ID Number: {props.content.idnum}</div>
    </motion.div>
  );
}
