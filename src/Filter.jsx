// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import {Electrinics} from './Data.jsx'
// import {Clothing} from './Data.jsx'
// import {Footware} from './Data.jsx'
// import {Accesories} from './Data.jsx'
// import {Beauty_PersonCare} from './Data.jsx'
// import {Home_Kitchen} from './Data.jsx'
// import {Furniture} from './Data.jsx'
// import {Books_Music} from './Data.jsx'
// import {Sports} from './Data.jsx'
// import {Health} from './Data.jsx'
// import {Toys_Games} from './Data.jsx'
// import { useNavigate } from 'react-router-dom'


// const Filter = ({FilterData,HandleClick}) => {
//     const [Range,setRange]=useState(0)
//     const [Ele,setEle]=useState('')
//     const [Home,setHome]=useState('')
//     const [Cloth,setCloth]=useState('')
//     const [For,setFor]=useState('')
//     const [Auto,setAuto]=useState('')
//     const [Toy,setToy]=useState('')
//     const [Hel,setHel]=useState('') 
//     const [Foot,SetFoot]=useState("")
//     const[Acc,setAcc]=useState('')
//     const[Bea,setBea]=useState("")
//     const[Books,SetBook]=useState("")
//     const[Sport,SetSport]=useState("")
//     const navigate=useNavigate()
//     useEffect(()=>{    
       


//     },[])
//     const HandleSubmit=()=>{
        
//         const Arr=[Ele,Home,Cloth,For,Toy,Hel,Foot,Acc,Bea,Books,Sport]
//         const Values=[]
//          for(let word of Arr){
//             if(word){
//                Values.push(word)
//             }
//          }
//          HandleFilters(Values,Range)
//        }
//        const HandleFilters = (Values, Range) => {
//         axios.get("http://127.0.0.1:8000/ProductDispalyView/")
//             .then((data) => {
//                 const dataFiltered = data.data.filter((e) => {
//                     let condition = false;
//                     for (let word of Values) {
//                         if (
//                             e.Product_Name.Category_Name.toLowerCase().includes(word.toLowerCase())) {
//                             condition = true;
//                             break;
//                         }
//                     }
//                     if (Range) {
//                         if (e.Product_Name.Price > Range) {
//                             condition = true;
//                         }
//                     }



//                     return condition;
//                 });
//                 window.location.reload()
            
//                 navigate("/Product",{state:{Filter:dataFiltered}})    
                
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
               
//             })  
             
//     };
//     return (
          
//         <> 
//                 <sidebar className='bg-primary' style={{ height: '100%', width: '25%', overflowY: 'auto', background: '#F5F7FA' }}>
//                     <h6 >Price Ranges</h6>
//                     <form className='ml-2' onSubmit={(e)=>{
//                         e.preventDefault()
//                         
//                         
//                     }}>
//                                 <input type="submit" value={'Search'} style={{position:'fixed',right:'30px'}} className='btn mt-3 btn-primary mt-1  shadow-lg' />
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio"  className='mr-2' name='ra' onChange={(e)=>{setRange(100)}} /><small>0-1000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(1000)}} /><small>1001-5000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(5000)}} /><small>5001-10,000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(10000)}} /><small>10,000-50,000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(50000)}} /><small>50,000-100000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(100000)}} /><small>more 10000</small>
//                         </div>
                       
//                     </form>

//                     <h6 >Electronics</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Electrinics.map((e)=>{
//                          return(
//                             <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                               <input type="radio" className='mr-2' name='ea'  value={e}  onChange={(e)=>{setEle(e.target.value)}} /><small>{e}</small>
//                             </div>
//                          )
//                     })}       
//                     </form>
//                     <h6 >Clothing</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Clothing.map((e)=>{
                        
//                            return(
//                             <>
//                              <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                                 <input type="radio" className='mr-2' value={e}  name='cl' onChange={(e)=>{setCloth(e.target.value)}} /><small>{e}</small>
//                             </div> 
//                             </>
//                            ) 
//                         })}
                       
                       
//                     </form>

//                     <h6 >Footware</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Footware.map((e)=>{
//                         return(
//                          <>
//                          <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='fo' onChange={(e)=>{SetFoot(e.target.value)}} /><small>{e}</small>
//                         </div>
                       
//                          </>
//                         ) 
//                      })}
                    
//                     </form>
//                     <h6 >Accesories</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Accesories.map((e)=>{
                        
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='ac' onChange={(e)=>{setAcc(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Beauty_PersonCare</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Beauty_PersonCare.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='be' onChange={(e)=>{setBea(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 > Home_Kitchen</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Home_Kitchen.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='Hk' onChange={(e)=>{setHome(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Furnitures</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Furniture.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='fur' onChange={(e)=>{setFor(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Books_Music</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Books_Music.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='Bo' onChange={(e)=>{SetBook(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Sports</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Sports.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='spo' onChange={(e)=>{SetSport(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Health</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Health.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='Hl' onChange={(e)=>{setHel(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Toys&Games</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Health.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='tg' onChange={(e)=>{setToy(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                 </sidebar>
            

//         </>
//     )
// }

// export default Filter
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Electrinics} from './Data.jsx'
import {Clothing} from './Data.jsx'
import {Footware} from './Data.jsx'
import {Accesories} from './Data.jsx'
import {Beauty_PersonCare} from './Data.jsx'
import {Home_Kitchen} from './Data.jsx'
import {Furniture} from './Data.jsx'
import {Books_Music} from './Data.jsx'
import {Sports} from './Data.jsx'
import {Health} from './Data.jsx'
import {Toys_Games} from './Data.jsx'
import { useNavigate } from 'react-router-dom'


const Filter = ({FilterData,HandleClick,Data2,Refresh,FilterAllowValue,Refresh3}) => {
    const [Range, SetRange] = useState([])
    const [Values, SetValues] = useState([])
    const [Refresh2, SetRefresh2] = useState(Refresh)
    const [Data, SetData] = useState()
    const [Brand, SetBrand] = useState([])
    const [Discount, SetDisCount] = useState([])
    const [MinpriceRange, SetMinpriceRange] = useState(0)
    const [MaxpriceRange, SetMaxpriceRange] = useState(0)
    const [partpriceRange, SetpartpriceRange] = useState(0)
    const [Rating2, SetRating2] = useState([])
    const [Brand2, setBrand2] = useState([])
    const [CNames2,SetCName2]=useState([])
    const [DValues,SetDValues]=useState([])
    const [RValues,SetRValues]=useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const [ControlRange,SetControlRanage]=useState('')
    const handleOptionChange = (value) => {
        setSelectedOption(value === selectedOption ? null : value);
        if(value=='option1'){
            const Item=Refresh.sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))))
            FilterData(Item) 
           
        }
        else if(value=='option2'){
            const Item=Refresh.sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))))
            FilterData(Item)
        
        }else{
            FilterData(Refresh)
        }
    };
    useEffect(() => {
        let Discount = []
        let Prices = []
        let Rating = []
        let Cnames=[]

        Refresh.map((e) => {
            Discount.push(e.Product_Name.Discount)
            Prices.push(Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))))
            Rating.push(e.Product_Name.Rating)
            Cnames.push(e.Product_Name.Category_Name)
            return e
        })
       
        const Category_names= [...new Set(Cnames)]
        SetCName2(Category_names)
        const ratings = [...new Set(Rating)].sort((a, b) => b - a)
        SetRating2(ratings)
        const max_dis = Discount.length > 0 ? Math.max(...Discount) : 0

        if (max_dis > 0) {

            const arr = [];
            for (let i = 1; i <= Math.trunc(max_dis / 10); i++) {
                arr.unshift(1);
            }

            SetDisCount(arr)

        } else {

        }
        let Brands = []
        Refresh.map((e) => {
            if (e.Product_Name.Brand) {
                Brands.push(e.Product_Name.Brand.toLocaleLowerCase())
            }
        })
        setBrand2(Brands)


        const max_price = Prices.length > 0 ? Math.max(...Prices) : 0
        const min_price = Prices.length > 0 ? Math.min(...Prices) : 0
        SetMaxpriceRange(max_price)
        const range = max_price - min_price
        SetMinpriceRange(min_price)
        const part_size = Math.trunc(range / 5)
        SetpartpriceRange(part_size)

    }, [])
 



    const HandleFiltering = () => {

        if(Range.length>0){
           let List=[]
            Refresh3.map((e)=>{
                Range.map((arr)=>{
                       if(Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))>=arr[0]&&Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))<=arr[1]){
                          List.push(e)
                          
                       }
                })
            
            })
            let List2 = []
            
            if(Values.length>0){
                Values.map((e) => {
                    List.filter((e1) => {
                        
                        if(!e1.Product_Name.Category_Name==null){
                            
                        }else{
                          
                            if(e1.Product_Name.Category_Name===e){
                                List2.unshift(e1)
                            }
                        }
                        if(e1.Product_Name.Brand==null){
                            
                        }else{
                          
                            if(e1.Product_Name.Brand.toLocaleLowerCase().includes(e.toLocaleLowerCase())){
                                List2.unshift(e1)
                            }
                        }
                       
                       
                    })
                })
            
               
                
            }
            const List3=[]
            
            if(RValues.length>0){
                 if(Values.length>0){
        
                    List2.map((e)=>{
                        RValues.map((e1)=>{
                           if(e.Product_Name.Rating>=e1){
                               List3.unshift(e)
                              
                           }
                        })
                    })
                 }else{
                    List.map((e)=>{
                        RValues.map((e1)=>{
                           if(e.Product_Name.Rating>=e1){
                               List3.unshift(e)
                              
                           }
                        })
                    })
                 }
            }
                if(DValues.length>0){
               
                   if(Values.length>0){
                    List2.map((e)=>{
                    
                        DValues.map((e1)=>{
                          
                           if(e.Product_Name.Discount>=e1){
                               List3.unshift(e)
                              
                           }
                        })
                    })
                   }else{
                    List.map((e)=>{
                    
                        DValues.map((e1)=>{
                          
                           if(e.Product_Name.Discount>=e1){
                               List3.unshift(e)
                              
                           }
                        })
                    })
                   }
           }
               const TotalItems = RValues.length>0||DValues.length>0||Values.length>0?Values.length>0&&(RValues.length>0||DValues.length>0)?[...List3]:[...List2,...List3]:[...List]
            if(ControlRange=='option1'){
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            }else if(ControlRange=='option2'){
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                FilterData(Remove)
            }else{
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            }
            
      

        }else{
            let List2=[]
            if(Values.length>0){
               
                Values.map((e) => {
                    Refresh3.filter((e1) => {
                        
                        if(!e1.Product_Name.Category_Name==null){
                            
                        }else{
                          
                            if(e1.Product_Name.Category_Name===e){
                                List2.unshift(e1)
                            }
                        }
                        if(e1.Product_Name.Brand==null){
                            
                        }else{
                          
                            if(e1.Product_Name.Brand.toLocaleLowerCase().includes(e.toLocaleLowerCase())){
                                List2.unshift(e1)
                            }
                        }
                       
                       
                    })
                })
            
               
                
            }
            
            if(RValues.length>0){
                 Refresh3.map((e)=>{
                     RValues.map((e1)=>{
                        if(e.Product_Name.Rating>=e1){
                            List2.unshift(e)
                           
                        }
                     })
                 })
            }
                if(DValues.length>0){
               
                Refresh3.map((e)=>{
                    
                    DValues.map((e1)=>{
                      
                       if(e.Product_Name.Discount>=e1){
                           List2.unshift(e)
                          
                       }
                    })
                })
           }
               const TotalItems = RValues.length>0||DValues.length>0||Values.length>0?[...List2]:[...Refresh3]
            if(ControlRange=='option1'){
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            }else if(ControlRange=='option2'){
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                FilterData(Remove)
            }else{
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            }

        }
        
       
      
    
       
    }
    // useState(()=>{

    //     if(ControlRange.length>0){
         
    //         if(ControlRange=='Low'){
                

    //         }else{
                

    //         }
                
    //     }else{
    //         FilterData(Refresh)
    //     }
    //  },[ControlRange])
   
    useEffect(() => {
        
       
        if(Range.length>0){
            HandleFiltering()
        }
   
 
}, [Range])
useEffect(() => {
  
      if(Values.length>0){
        HandleFiltering()
      }
   
       
   
        
  
}, [Values])
useEffect(() => {
    
        if(RValues.length>0){
            HandleFiltering()
        }
    
    
}, [RValues])
useEffect(() => {
   
  
        if(DValues.length>0){
            HandleFiltering()
        }
  
   
}, [DValues])


    return (
          
        <> 
                {/* <sidebar className='bg-primary' style={{ height: '100%', width: '25%', overflowY: 'auto', background: '#F5F7FA' }}>
                
                
                <h6 >Price Ranges</h6>
                <form className='ml-2' onSubmit={(e) => {
                    e.preventDefault()

                }}  >
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                
                               
                                const filter = [[0, 1000], ...Range]
                                SetRange(filter)

                            } else {
                                
                                 
                                const filter = Range.filter((e) => {
                                    if (e.includes(0)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>0-1000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' onChange={(e) => {
                        if (e.target.checked) {
                             
                       
                            const filter = [[1001, 5000], ...Range]
                            SetRange(filter)

                        } else {
                          
                             
                            const filter = Range.filter((e) => {
                                if (e.includes(1001)) {

                                } else {
                                    return e
                                }
                            })
                            SetRange(filter)
                        }
                    }} style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' /><small>1001-5000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                 
                           
                                const filter = [[5001, 10000], ...Range]
                                SetRange(filter)

                            } else {
                    
                                 
                                const filter = Range.filter((e) => {
                                    if (e.includes(5001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>5001-10,000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                 
                               
                                const filter = [[10001, 50000], ...Range]
                                SetRange(filter)

                            } else {
                              
                                 
                                const filter = Range.filter((e) => {

                                    if (e.includes(10001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>10,001-50,000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                 
                                
                                const filter = [[50001, 100000], ...Range]
                                SetRange(filter)

                            } else {
                               
                                 
                                const filter = Range.filter((e) => {

                                    if (e.includes(50001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>50,001-100000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                 
                                const filter = [[100001], ...Range]
                                SetRange(filter)

                            } else {
                                 
                                const filter = Range.filter((e) => {
                                    if (e.includes(100001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>more 10000</small>
                    </div>

                </form>

                <h6 >Electronics</h6>
                <form className='ml-2'  >
                    {Electrinics.map((e) => {
                        return (
                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                <input type="checkbox" className='mr-2' name='ea' value={e} onChange={(e) => {
                                    if (e.target.checked) {
                                        const filter = [e.target.value, ...Values]
                                        SetValues(filter)
                                    } else {
                                        const filter = Values.filter((e1) => {
                                            return e1 != e.target.value
                                        })
                                        SetValues(filter)
                                    }
                                }} /><small>{e}</small>
                            </div>
                        )
                    })}
                </form>
                <h6 >Clothing</h6>
                <form className='ml-2'  >
                    {Clothing.map((e) => {

                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='cl' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}


                </form>

                <h6 >Footware</h6>
                <form className='ml-2'  >
                    {Footware.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' name='fo' value={e} onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>

                            </>
                        )
                    })}

                </form>
                <h6 >Accesories</h6>
                <form className='ml-2'  >
                    {Accesories.map((e) => {

                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='ac' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Beauty_PersonCare</h6>
                <form className='ml-2'  >
                    {Beauty_PersonCare.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='be' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 > Home_Kitchen</h6>
                <form className='ml-2'  >
                    {Home_Kitchen.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='Hk' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Furnitures</h6>
                <form className='ml-2'  >
                    {Furniture.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='fur' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Books_Music</h6>
                <form className='ml-2'  >
                    {Books_Music.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='Bo' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Sports</h6>
                <form className='ml-2'  >
                    {Sports.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='spo' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Health</h6>
                <form className='ml-2'  >
                    {Health.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='Hl' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Toys&Games</h6>
                <form className='ml-2'  >
                    {Health.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='tg' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                </sidebar> */}
               
                 {FilterAllowValue?<>
                <sidebar className='bg-light' style={{ height: '100%', width: '100%', overflowY: 'auto', scrollbarWidth: 'none', background: '#F5F7FA' }}>
                <div className='d-flex flex-row justify-content-end mt-2' >
                 <i onClick={() => { 
                                 HandleClick()
                             }} class="fa-regular fa-circle-xmark  p-2" style={{ fontSize: '25px', borderRadius: '5px', position: 'fixed',cursor:'pointer' }}></i>
                </div>
                <h6 >Price Ranges</h6>
                <form className='ml-2' onSubmit={(e) => {
                    e.preventDefault()

                }}  >
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                const filter = [[0, 1000], ...Range]
                                SetRange(filter)

                            } else {
                                const filter = Range.filter((e) => {
                                    if (e.includes(0)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>0-1000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' onChange={(e) => {
                        if (e.target.checked) {
                            const filter = [[1001, 5000], ...Range]
                            SetRange(filter)

                        } else {
                            const filter = Range.filter((e) => {
                                if (e.includes(1001)) {

                                } else {
                                    return e
                                }
                            })
                            SetRange(filter)
                        }
                    }} style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' /><small>1001-5000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                const filter = [[5001, 10000], ...Range]
                                SetRange(filter)

                            } else {
                                const filter = Range.filter((e) => {
                                    if (e.includes(5001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>5001-10,000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                const filter = [[10001, 50000], ...Range]
                                SetRange(filter)

                            } else {
                                const filter = Range.filter((e) => {

                                    if (e.includes(10001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>10,001-50,000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                const filter = [[50001, 100000], ...Range]
                                SetRange(filter)

                            } else {
                                const filter = Range.filter((e) => {

                                    if (e.includes(50001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>50,001-100000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                const filter = [[100001], ...Range]
                                SetRange(filter)

                            } else {
                                const filter = Range.filter((e) => {
                                    if (e.includes(100001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>more 10000</small>
                    </div>

                </form>

                <h6 >Electronics</h6>
                <form className='ml-2'  >
                    {Electrinics.map((e) => {
                        return (
                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                <input type="checkbox" className='mr-2' name='ea' value={e} onChange={(e) => {
                                    if (e.target.checked) {
                                        const filter = [e.target.value, ...Values]
                                        SetValues(filter)
                                    } else {
                                        const filter = Values.filter((e1) => {
                                            return e1 != e.target.value
                                        })
                                        SetValues(filter)
                                    }
                                }} /><small>{e}</small>
                            </div>
                        )
                    })}
                </form>
                <h6 >Clothing</h6>
                <form className='ml-2'  >
                    {Clothing.map((e) => {

                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='cl' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}


                </form>

                <h6 >Footware</h6>
                <form className='ml-2'  >
                    {Footware.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' name='fo' value={e} onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>

                            </>
                        )
                    })}

                </form>
                <h6 >Accesories</h6>
                <form className='ml-2'  >
                    {Accesories.map((e) => {

                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='ac' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Beauty_PersonCare</h6>
                <form className='ml-2'  >
                    {Beauty_PersonCare.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='be' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 > Home_Kitchen</h6>
                <form className='ml-2'  >
                    {Home_Kitchen.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='Hk' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Furnitures</h6>
                <form className='ml-2'  >
                    {Furniture.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='fur' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Books_Music</h6>
                <form className='ml-2'  >
                    {Books_Music.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='Bo' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Sports</h6>
                <form className='ml-2'  >
                    {Sports.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='spo' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }}  /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Health</h6>
                <form className='ml-2'  >
                    {Health.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='Hl' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Toys&Games</h6>
                <form className='ml-2'  >
                    {Health.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='tg' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
            </sidebar>
               </>:<>
               {/* <sidebar className='bg-light' style={{ height: '100%', width: '100%', overflowY: 'auto', scrollbarWidth: 'none', background: '#F5F7FA' }}>
               <div className='d-flex flex-row justify-content-end mt-2' >
                 <i onClick={() => { 
                                 HandleClick()
                             }} class="fa-regular fa-circle-xmark  p-2" style={{ fontSize: '25px', borderRadius: '5px', position: 'fixed',cursor:'pointer' }}></i>
                </div>
                    {MaxpriceRange<50000 ? <>
                        {MaxpriceRange==0?<></>:<>
                        <small className='' style={{ fontWeight: 'bold' }}>Price Ranges</small>
                        <div className='d-flex flex-row ml-2'>
                            <input type='checkbox'  checked={selectedOption === 'option1'
                            

                            }
                                onChange={(e) => {
                                    
                                    if(e.target.checked){
                                        handleOptionChange('option1')
                                    }else{
                                            handleOptionChange(null)
                                             
                                    }

                                }}    name="rr" id="" o /><small> Low - High </small><br></br>
                           
                        </div>
                        <div className='d-flex flex-row ml-2'>
                         
                            <input type='checkbox'   checked={selectedOption === 'option2'} onChange={(e) => {
                                if(e.target.checked){
                                    handleOptionChange('option2')
                                }else{
                                        handleOptionChange(null)
                                         
                                }
                                }}   name="rr" id=""  /><small> High - Low </small>
                        </div>
                        </>}
                    </> : <>
                        <small className='' style={{ fontWeight: 'bold' }}>Price Ranges</small>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange, MinpriceRange + (partpriceRange * 1)], ...Range]
                
                                    SetRange(filter)

                                } else {
                                  
                                    const filter = Range.filter((e1) => {
                                        if(e1.includes(MinpriceRange)){

                                        }else{
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange, MinpriceRange + (partpriceRange * 1)]} /><small>{MinpriceRange}-{MinpriceRange + (partpriceRange * 1)}</small>
                        </div>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange + (partpriceRange * 1) + 1, MinpriceRange + (partpriceRange * 2)],...Range]
                                    SetRange(filter)

                                } else {
                                    const filter = Range.filter((e) => {
                                        if (e.includes( MinpriceRange + (partpriceRange * 1) + 1)) {

                                        } else {
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 1) + 1, MinpriceRange + (partpriceRange * 2)]} /><small>{MinpriceRange + (partpriceRange * 1) + 1}-{MinpriceRange + (partpriceRange * 2)}</small>
                        </div>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange + (partpriceRange * 2) + 1, MinpriceRange + (partpriceRange * 3)],...Range]

                                    SetRange(filter)

                                } else {
                                    const filter = Range.filter((e) => {
                                        if (e.includes( MinpriceRange + (partpriceRange * 2) + 1)) {
                                            
                                        } else {
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                    console.log(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 2) + 1, MinpriceRange + (partpriceRange * 3)]} /><small>{MinpriceRange + (partpriceRange * 2) + 1}-{MinpriceRange + (partpriceRange * 3)}</small>
                        </div>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange + (partpriceRange * 3) + 1, MinpriceRange + (partpriceRange * 4)],...Range]

                                    SetRange(filter)

                                } else {
                                    const filter = Range.filter((e) => {
                                        if (e.includes( MinpriceRange + (partpriceRange * 3) + 1)) {
                                            
                                        } else {
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 3) + 1, MinpriceRange + (partpriceRange * 4)]} /><small>{MinpriceRange + (partpriceRange * 3) + 1}-{MinpriceRange + (partpriceRange * 4)}</small>
                        </div>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange + (partpriceRange * 4) + 1, MinpriceRange + (partpriceRange * 5) + 10],...Range]

                                    SetRange(filter)

                                } else {
                                    const filter = Range.filter((e) => {
                                        if (e.includes( MinpriceRange + (partpriceRange * 4) + 1)) {
                                            
                                        } else {
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 4) + 1, MinpriceRange + (partpriceRange * 5) + 10]} /><small>{MinpriceRange + (partpriceRange * 4) + 1}-{MinpriceRange + (partpriceRange * 5) + 10}</small>
                        </div>
                    </>}

                    {Discount.length > 0 && <>
                        <small style={{ fontWeight: 'bold' }}>Discount</small>
                        {Discount.map((e, ind) => [
                            <div className='d-flex flex-row ml-2'>
                                <input type="checkbox" name="" id=""
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        const filter = [e.target.value, ...DValues]
                                        SetDValues(filter)
                                    } else {
                                        const filter = DValues.filter((e1) => {
                                            return e1 != e.target.value
                                        })
                                        SetDValues(filter)
                                    }
                                }}  value={(ind + 1) * 10} /><small>{(ind + 1) * 10}% more </small>
                            </div>
                        ])}
                    </>}
                    {Rating2.length > 0 && <>
                        <small style={{ fontWeight: 'bold' }}>Ratings</small>
                        {Rating2.map((e, ind) => {
                            return (
                                <>
                                    {e > 0 && <>
                                        <div className='d-flex flex-row ml-2'>
                                            <input type="checkbox" name="" id="" value={e}  onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...RValues]
                                            SetRValues(filter)
                                        } else {
                                            const filter = RValues.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetRValues(filter)
                                        }
                                    }} /><small>{e}<i class="fa-solid fa-star text-success"></i></small>
                                        </div>
                                    </>}
                                </>
                            )
                        })}
                    </>}
                    {Brand2.length > 0 && <>
                        <small style={{ fontWeight: 'bold' }}>Brands</small><br></br>
                        {Brand2.length > 8 && <>
                            <input type="text" style={{borderRadius:'5px',border:'1px solid lightgray'}} className='ml-2' name="" id="" placeholder='search for brand' />
                        </>}
                        {Brand2.slice().reverse().map((e, ind) => {
                            return (
                                <>

                                    <div className='d-flex flex-row ml-2'>

                                        {ind < 10 && <>
                                        <input type="checkbox" name="" id="" value={e} onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                        </>}
                                    </div>

                                </>
                            )
                        })}
                    </>}
                    {CNames2.length>0&&<>
                       <small style={{ fontWeight: 'bold' }} >Only</small>
                       
                       {CNames2.map((e,ind)=>{
                       
                          return(
                            <>
                            <div className='d-flex flex-row ml-2'>
                                 <input type="checkbox" name="" id="" value={e} onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                             </div>
                            </>
                          )
                       })}
                    </>}
                </sidebar> */}
                  <sidebar className='bg-light' style={{ height: '100%', width: '100%', overflowY: 'auto', scrollbarWidth: 'none', background: '#F5F7FA' }}>
                <div className='d-flex flex-row justify-content-end mt-2' >
                 <i onClick={() => { 
                                 HandleClick()
                             }} class="fa-regular fa-circle-xmark  p-2" style={{ fontSize: '25px', borderRadius: '5px', position: 'fixed',cursor:'pointer' }}></i>
                </div>
                {MaxpriceRange<50000 ? <>
                        {MaxpriceRange==0?<></>:<>
                        <small className='' style={{ fontWeight: 'bold' }}>Price Ranges</small>
                        <div className='d-flex flex-row ml-2'>
                            <input type='checkbox'  checked={selectedOption === 'option1'
                            

                            }
                                onChange={(e) => {
                                    
                                    if(e.target.checked){
                                        handleOptionChange('option1')
                                    }else{
                                            handleOptionChange(null)
                                             
                                    }

                                }}    name="rr" id="" o /><small> Low - High </small><br></br>
                           
                        </div>
                        <div className='d-flex flex-row ml-2'>
                         
                            <input type='checkbox'   checked={selectedOption === 'option2'} onChange={(e) => {
                                if(e.target.checked){
                                    handleOptionChange('option2')
                                }else{
                                        handleOptionChange(null)
                                         
                                }
                                }}   name="rr" id=""  /><small> High - Low </small>
                        </div>
                        </>}
                    </> : <>
                        <small className='' style={{ fontWeight: 'bold' }}>Price Ranges</small>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange, MinpriceRange + (partpriceRange * 1)], ...Range]
                
                                    SetRange(filter)

                                } else {
                                  
                                    const filter = Range.filter((e1) => {
                                        if(e1.includes(MinpriceRange)){

                                        }else{
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange, MinpriceRange + (partpriceRange * 1)]} /><small>{MinpriceRange}-{MinpriceRange + (partpriceRange * 1)}</small>
                        </div>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange + (partpriceRange * 1) + 1, MinpriceRange + (partpriceRange * 2)],...Range]
                                    SetRange(filter)

                                } else {
                                    const filter = Range.filter((e) => {
                                        if (e.includes( MinpriceRange + (partpriceRange * 1) + 1)) {

                                        } else {
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 1) + 1, MinpriceRange + (partpriceRange * 2)]} /><small>{MinpriceRange + (partpriceRange * 1) + 1}-{MinpriceRange + (partpriceRange * 2)}</small>
                        </div>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange + (partpriceRange * 2) + 1, MinpriceRange + (partpriceRange * 3)],...Range]

                                    SetRange(filter)

                                } else {
                                    const filter = Range.filter((e) => {
                                        if (e.includes( MinpriceRange + (partpriceRange * 2) + 1)) {
                                            
                                        } else {
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                    console.log(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 2) + 1, MinpriceRange + (partpriceRange * 3)]} /><small>{MinpriceRange + (partpriceRange * 2) + 1}-{MinpriceRange + (partpriceRange * 3)}</small>
                        </div>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange + (partpriceRange * 3) + 1, MinpriceRange + (partpriceRange * 4)],...Range]

                                    SetRange(filter)

                                } else {
                                    const filter = Range.filter((e) => {
                                        if (e.includes( MinpriceRange + (partpriceRange * 3) + 1)) {
                                            
                                        } else {
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 3) + 1, MinpriceRange + (partpriceRange * 4)]} /><small>{MinpriceRange + (partpriceRange * 3) + 1}-{MinpriceRange + (partpriceRange * 4)}</small>
                        </div>
                        <div className='d-flex flex-row ml-2'>
                            <input onChange={(e) => {

                                if (e.target.checked) {
                                    const filter = [[MinpriceRange + (partpriceRange * 4) + 1, MinpriceRange + (partpriceRange * 5) + 10],...Range]

                                    SetRange(filter)

                                } else {
                                    const filter = Range.filter((e) => {
                                        if (e.includes( MinpriceRange + (partpriceRange * 4) + 1)) {
                                            
                                        } else {
                                            return e
                                        }
                                    })
                                    SetRange(filter)
                                }
                            }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 4) + 1, MinpriceRange + (partpriceRange * 5) + 10]} /><small>{MinpriceRange + (partpriceRange * 4) + 1}-{MinpriceRange + (partpriceRange * 5) + 10}</small>
                        </div>
                    </>}

                    {Discount.length > 0 && <>
                        <small style={{ fontWeight: 'bold' }}>Discount</small>
                        {Discount.map((e, ind) => [
                            <div className='d-flex flex-row ml-2'>
                                <input type="checkbox" name="" id=""
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        const filter = [e.target.value, ...DValues]
                                        SetDValues(filter)
                                    } else {
                                        const filter = DValues.filter((e1) => {
                                            return e1 != e.target.value
                                        })
                                        SetDValues(filter)
                                    }
                                }}  value={(ind + 1) * 10} /><small>{(ind + 1) * 10}% more </small>
                            </div>
                        ])}
                    </>}
                    {Rating2.length > 0 && <>
                        <small style={{ fontWeight: 'bold' }}>Ratings</small>
                        {Rating2.map((e, ind) => {
                            return (
                                <>
                                    {e > 0 && <>
                                        <div className='d-flex flex-row ml-2'>
                                            <input type="checkbox" name="" id="" value={e}  onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...RValues]
                                            SetRValues(filter)
                                        } else {
                                            const filter = RValues.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetRValues(filter)
                                        }
                                    }} /><small>{e}<i class="fa-solid fa-star text-success"></i></small>
                                        </div>
                                    </>}
                                </>
                            )
                        })}
                    </>}
                    {Brand2.length > 0 && <>
                        <small style={{ fontWeight: 'bold' }}>Brands</small><br></br>
                        {Brand2.length > 8 && <>
                            <input type="text" style={{borderRadius:'5px',border:'1px solid lightgray'}} className='ml-2' name="" id="" placeholder='search for brand' />
                        </>}
                        {Brand2.slice().reverse().map((e, ind) => {
                            return (
                                <>

                                    <div className='d-flex flex-row ml-2'>

                                        {ind < 10 && <>
                                        <input type="checkbox" name="" id="" value={e} onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                        </>}
                                    </div>

                                </>
                            )
                        })}
                    </>}
                    {CNames2.length>0&&<>
                       <small style={{ fontWeight: 'bold' }} >Only</small>
                       
                       {CNames2.map((e,ind)=>{
                       
                          return(
                            <>
                            <div className='d-flex flex-row ml-2'>
                                 <input type="checkbox" name="" id="" value={e} onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                             </div>
                            </>
                          )
                       })}
                    </>}
            </sidebar>
               </>}
            

        </>
    )
}

export default Filter













