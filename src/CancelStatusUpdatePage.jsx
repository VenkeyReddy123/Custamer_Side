import React,{useState,useEffect} from "react";
import axios from "axios";

const CancelStatusUpdatePage =({oid,OrderDetails})=>{  
     useEffect(()=>{
    

                if(OrderDetails.process=='Process'){

                    const refundId=OrderDetails.refund_id
                    
                        axios.get(`http://localhost:8000/get_refund_status/${refundId}/`).then((d)=>{
                            
                         if(d.data.status=='processed'){
                               
                         }else{
                            const Data={
                                Order_Id:oid,
                                process:'Completed' 
                            }
                               axios.patch('http://127.0.0.1:8000/CancelOrderDetails/',Data).then((d)=>{
                                     window.location.reload()
                               }).catch(()=>{

                               })
                         }
                    
                    })
             
                }
            
        
     },[])
   return(
    <>

       
    </>
   )
}
export default CancelStatusUpdatePage 