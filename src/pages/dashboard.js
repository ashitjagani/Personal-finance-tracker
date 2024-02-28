import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header11 from "../components/header11";
import Cards from "../components/cards";
import moment from "moment";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import Addincome from "../components/modal/addincome";
import { collection, addDoc } from "firebase/firestore"; 
import Addexpenses from "../components/modal/addexpense";
import {  query, getDocs } from "firebase/firestore";
import Addentry from "../components/addtransaction";
import { db } from "../firebase";

const  DashboardComponent=()=>{
    const [user] = useAuthState(auth);
    const [atrans, setAtrans]= useState([]);
    const [isaddincome,setIsaddincome]= useState(false);
    const [isaddexpense,setIsaddexpense]= useState(false);
    const [income, setIncome]= useState(0);
    const [expensis, setExpensis]= useState(0);
    const [currentbalance,setCurrentbalance]= useState(0);
    const showexpensemodel=()=>{
        setIsaddexpense(true);
    }
    const showincomemodel=()=>{
        setIsaddincome(true);
    }

    const handleincomemodal=()=>{
        setIsaddincome(false);
    }

    const hadleexpensemodel=()=>{
        setIsaddexpense(false);
    }


    const onFinish = (values, type) => {
        const newTransaction = {
          type: type,
          date: values.date.format("YYYY-MM-DD"),
          amount: parseFloat(values.amount),
          tag: values.tag,
          name: values.name,
        }
        console.log(newTransaction);
        addtransaction(newTransaction);
        
    };
   

    async function addtransaction(transaction) {
        try {
          const docRef = await addDoc(
            collection(db, `users/${user.uid}/transactions`),
            transaction
          );
          console.log("Document written with ID: ", docRef.id);
            let newarray= [...atrans,transaction];
            // newarray.push(transaction);
            setAtrans(newarray);
            toast.success("Transaction Added!");
            calculatebalance();
            
        } catch (e) {
          console.error("Error adding document: ", e);
          
            toast.error("Couldn't add transaction");
          
        }
      }


      useEffect(() => {
     
        if (user){
            fetchTransactions();
        }
    
      
      }, [user])
      
      async function fetchTransactions() {
        
        if (user) {
          const q = query(collection(db, `users/${user.uid}/transactions`));
          const querySnapshot = await getDocs(q);
          let transactionsArray = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            transactionsArray.push(doc.data());
          });
          setAtrans(transactionsArray);
          toast.success("Transactions Fetched!");
          console.log(transactionsArray);
        }
        
      }

      useEffect(() => {
        
      calculatebalance();
      }, [atrans])
      

      function calculatebalance(){
        let incometotal=0;
        let expensetotal=0;
        atrans.forEach(transaction11 => {
            if(transaction11.type==="income"){
                incometotal+=transaction11.amount;
                console.log("hello")
            }else{
                expensetotal+=transaction11.amount;
                console.log("helo2")
            }
        });
        setIncome(incometotal);
        setExpensis(expensetotal);
        setCurrentbalance(incometotal-expensetotal);
      }
    

    return(
        <div>
       <Header11></Header11>
       <Cards
       income={income}
       expensis={expensis}
       currentbalance={currentbalance}
       showincomemodel={showincomemodel}
       showexpensemodel={showexpensemodel}
       ></Cards>
        <Addincome isaddincome={isaddincome}
        handleincomemodal={handleincomemodal}
        onFinish={onFinish}>
        </Addincome>
        
        <Addexpenses isaddexpense={isaddexpense}
        hadleexpensemodel={hadleexpensemodel}
        onFinish={onFinish}
        >

        </Addexpenses>

        <Addentry atrans={atrans}
        fetchTransactions={fetchTransactions}
        addtransaction={addtransaction}></Addentry>
        </div>
    )
}

export default DashboardComponent;