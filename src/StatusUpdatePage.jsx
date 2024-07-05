import React,{useState,useEffect} from "react";
import axios from "axios";

const StatusUpdatePage=({oid})=>{  
     useEffect(()=>{
        axios.get('http://127.0.0.1:8000/RefoundDetailsView/').then((d)=>{
     
            const filter=d.data.filter((e)=>{
                return e.Order_Id==oid
            })
            filter.map(async (e)=>{
                if(e.PaymentProcess=='Proceed'){
                    const refundId=e.Payment_Id
                    await axios.get(`http://localhost:8000/get_refund_status/${refundId}/`).then((d)=>{
                         if(d.data.status=='processed'){

                         }else{
                            const Data={
                                Order_Id:oid,
                                PaymentProcess:'Completed'
                            }
                               axios.patch('http://127.0.0.1:8000/RefoundDetailsView/',Data).then((d)=>{
                    
                               }).catch(()=>{

                               })
                         }
                    
                    })
             
                }
            })
         })
     },[])
   return(
    <>

       
    </>
   )
}
export default StatusUpdatePage