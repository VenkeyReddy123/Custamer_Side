import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Electrinics } from './Data.jsx'
import { Clothing } from './Data.jsx'
import { Footware } from './Data.jsx'
import { Accesories } from './Data.jsx'
import { Beauty_PersonCare } from './Data.jsx'
import { Home_Kitchen } from './Data.jsx'
import { Furniture } from './Data.jsx'
import { Books_Music } from './Data.jsx'
import { Sports } from './Data.jsx'
import { Health } from './Data.jsx'
import { Toys_Games } from './Data.jsx'

const FilterSideBar = ({ FilterData, Refresh, FilterAllowValue, Refresh3, HandleClick }) => {
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
    const [CNames2, SetCName2] = useState([])
    const [DValues, SetDValues] = useState([])
    const [RValues, SetRValues] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const [ControlRange, SetControlRanage] = useState('')
    const [filterData, SetDatafilter] = useState([])
    const [Brandfilter, SetBrandfilter] = useState([])
    const [BrandChek, SetBrandCheck] = useState([])
    const [BrandFilter, SetBrandFilter] = useState([])
    const [AllowClick, SetAllowClick] = useState(false)
    const [AllowClickInd, SetAllowClickInd] = useState(null)


    const handleOptionChange = (value) => {
        setSelectedOption(value === selectedOption ? null : value);
        if (value == 'option1') {
            const Item = Refresh.sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))))
            FilterData(Item)
            SetControlRanage('option1')


        }
        else if (value == 'option2') {
            const Item = Refresh.sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))))
            FilterData(Item)
            SetControlRanage('option2')

        } else {
            FilterData(Refresh)
        }
    };

    useEffect(() => {

        let Prices = []

        let Cnames = []
        Refresh3.map((e) => {

            Prices.push(Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))))

            Cnames.push(e.Product_Name.Category_Name)
            return e
        })

        const Category_names = [...new Set(Cnames)]
        SetCName2(Category_names)

        const max_price = Prices.length > 0 ? Math.max(...Prices) : 0
        const min_price = Prices.length > 0 ? Math.min(...Prices) : 0
        SetMaxpriceRange(max_price)
        const range = max_price - min_price
        SetMinpriceRange(min_price)
        const part_size = Math.trunc(range / 5)
        SetpartpriceRange(part_size)

    }, [])







    useEffect(() => {
        if (Values.length == 0) {
            if (Range.length > 0) {
                let List = []
                Refresh3.map((e) => {
                    Range.map((arr) => {
                        if (Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) >= arr[0] && Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) <= arr[1]) {
                            List.push(e)

                        }
                    })

                })
                const TotalItems = [...List]
                if (ControlRange == 'option1') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else if (ControlRange == 'option2') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                }
                SetDatafilter(List)
            }
            else {
              
                if(Values.length==0&&DValues.length==0&&RValues.length==0&&BrandChek.length==0){
                  
                    FilterData(Refresh3)
                }else{
                    if (Values.length > 0) {
                        const val=[...Values]
                         SetValues(val)
                      } if (DValues.length > 0) {
                         const dval=[...DValues]
                         SetDValues(dval)
                      
                      } if (RValues.length > 0) {
                           const rval=[...RValues]
                           SetRValues(rval)
                      } if (BrandChek.length > 0) {
                          const bra=[...BrandChek]
                          SetBrandCheck(bra)
                      }
             }
            }
        } else {
            if (Range.length > 0) {


                const List4 = Refresh3.filter((e) => {
                    const some = Range.some((arr) => {
                        if (Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) >= arr[0] && Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) <= arr[1]) {
                            return true

                        }
                    })
                    if (some) {
                        return e
                    }
                })
                SetDatafilter(List4)
                const filter = [...Values]

                SetValues(filter)


               

            } else {
               
                if(Values.length==0&&DValues.length==0&&RValues.length==0&&BrandChek.length==0){
                  
                    FilterData(Refresh3)
             }else{
                 if (Values.length > 0) {
                   const val=[...Values]
                    SetValues(val)
                 } if (DValues.length > 0) {
                    const dval=[...DValues]
                    SetDValues(dval)
                 
                 } if (RValues.length > 0) {
                      const rval=[...RValues]
                      SetRValues(rval)
                 } if (BrandChek.length > 0) {
                     const bra=[...BrandChek]
                     SetBrandCheck(bra)
                 }
             }
            }
        }

    }, [Range])
    useEffect(() => {

        if (Values.length > 0) {
            if (Range.length > 0) {
                const List2 = filterData.filter((e) => {
                    const value = Values.some((e1) => {
                        if (e.Product_Name.Category_Name) {
                            if ((e.Product_Name.Category_Name).toLowerCase() == e1.toLowerCase()) {
                                return true
                            }
                        }

                    })
                    if (value) {
                        return e
                    }
                })
                const TotalItems = [...List2]
                if (ControlRange == 'option1') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else if (ControlRange == 'option2') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                }
                SetBrandfilter(List2)

                let Brands = []
                let Rating = []
                let Discount = []
                List2.map((e) => {
                    if (e.Product_Name.Brand) {
                        Brands.push(e.Product_Name.Brand.toLocaleLowerCase())
                    }
                    Rating.push(e.Product_Name.Rating)
                    Discount.push(Math.floor(e.Product_Name.Discount / 10) * 10)

                })
                setBrand2([...new Set(Brands)])
                const ratings = [...new Set(Rating)].sort((a, b) => b - a)
                SetRating2(ratings)

                SetDisCount([...new Set(Discount)].sort((a, b) => b - a))
            } else {
                const List2 = Refresh3.filter((e) => {
                    const value = Values.some((e1) => {
                        if (e.Product_Name.Category_Name) {
                            if ((e.Product_Name.Category_Name).toLowerCase() == e1.toLowerCase()) {
                                return true
                            }
                        }

                    })
                    if (value) {
                        return e
                    }
                })
                const TotalItems = [...List2]
                if (ControlRange == 'option1') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else if (ControlRange == 'option2') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                }
                SetBrandfilter(List2)

                let Brands = []
                let Rating = []
                let Discount = []
                List2.map((e) => {
                    if (e.Product_Name.Brand) {
                        Brands.push(e.Product_Name.Brand.toLocaleLowerCase())
                    }
                    Rating.push(e.Product_Name.Rating)
                    Discount.push(Math.floor(e.Product_Name.Discount / 10) * 10)

                })
                setBrand2([...new Set(Brands)])
                const ratings = [...new Set(Rating)].sort((a, b) => b - a)
                SetRating2(ratings)
                SetDisCount([...new Set(Discount)].sort((a, b) => b - a))


            }
        }else{
            if(Range.length==0&&DValues.length==0&&RValues.length==0&&BrandChek.length==0){
                   FilterData(Refresh3)
            }else{
                if (Range.length > 0) {
                    const val=[...Range]
                     SetRange(val)
                  } if (DValues.length > 0) {
                     const dval=[...DValues]
                     SetDValues(dval)
                  
                  } if (RValues.length > 0) {
                       const rval=[...RValues]
                       SetRValues(rval)
                  } if (BrandChek.length > 0) {
                      const bra=[...BrandChek]
                      SetBrandCheck(bra)
                  }
            }
           
        }
    }, [Values])
    useEffect(() => {

        if (BrandChek.length > 0) {

            const List4 = BrandFilter.filter((e) => {

                const some = RValues.some((e1) => {
                    if (e.Product_Name.Rating >= e1) {

                        return true
                    }
                })
                if (some) {
                    return e
                }
            })
            const TotalItems = [...List4]
            if (ControlRange == 'option1') {
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            } else if (ControlRange == 'option2') {
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                FilterData(Remove)
            } else {
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            }
        } else {
            if (RValues.length > 0) {
                const List4 = Brandfilter.filter((e) => {

                    const some = RValues.some((e1) => {
                        if (e.Product_Name.Rating >= e1) {

                            return true
                        }
                    })
                    if (some) {
                        return e
                    }
                })
                const TotalItems = [...List4]
                if (ControlRange == 'option1') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else if (ControlRange == 'option2') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                }
            }else{
                if(Range.length==0&&DValues.length==0&&Values.length==0&&BrandChek.length==0){
                    FilterData(Refresh3)
              }else{
                if (Range.length > 0) {
                    const val=[...Range]
                     SetRange(val)
                  } if (DValues.length > 0) {
                     const dval=[...DValues]
                     SetDValues(dval)
                  
                  } if (Values.length > 0) {
                       const rval=[...Values]
                       SetRValues(rval)
                  } if (BrandChek.length > 0) {
                      const bra=[...BrandChek]
                      SetBrandCheck(bra)
                  }
              }
            }

        }

    }, [RValues])
    useEffect(() => {
        if (BrandChek.length > 0) {

            const List4 = BrandFilter.filter((e) => {

                const some = DValues.some((e1) => {
                    if (e.Product_Name.Discount >= e1) {

                        return true
                    }
                })
                if (some) {
                    return e
                }
            })
            const TotalItems = [...List4]
            if (ControlRange == 'option1') {
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            } else if (ControlRange == 'option2') {
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                FilterData(Remove)
            } else {
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            }
        } else {
            if (DValues.length > 0) {

                const List4 = Brandfilter.filter((e) => {

                    const some = DValues.some((e1) => {
                        if (e.Product_Name.Discount >= e1) {

                            return true
                        }
                    })
                    if (some) {
                        return e
                    }
                })
                const TotalItems = [...List4]
                if (ControlRange == 'option1') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else if (ControlRange == 'option2') {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                    FilterData(Remove)
                } else {
                    const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                    FilterData(Remove)
                }
            }else{
                if(Range.length==0&&RValues.length==0&&Values.length==0&&BrandChek.length==0){
                    FilterData(Refresh3)
              }else{
                if (Range.length > 0) {
                    const val=[...Range]
                     SetRange(val)
                  } if (RValues.length > 0) {
                     const dval=[...RValues]
                     SetRValues(dval)
                  
                  } if (Values.length > 0) {
                       const rval=[...Values]
                       SetValues(rval)
                  } if (BrandChek.length > 0) {
                      const bra=[...BrandChek]
                      SetBrandCheck(bra)
                  }
              }
            }
        }


    }, [DValues])
    useEffect(() => {
        if (BrandChek.length > 0) {

            const List3 = Brandfilter.filter((e) => {
                const value = BrandChek.some((e1) => {
                    if (e.Product_Name.Brand) {
                        if (e.Product_Name.Brand.toLowerCase() == e1.toLowerCase()) {
                            return true
                        }
                    }
                })
                if (value) {
                    return e
                }
            })

            SetBrandFilter(List3)
            const TotalItems = [...List3]
            if (ControlRange == 'option1') {
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            } else if (ControlRange == 'option2') {
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) - Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))));
                FilterData(Remove)
            } else {
                const Remove = [...new Set(TotalItems)].sort((e, e1) => Math.trunc(e1.Product_Name.Price - (e1.Product_Name.Price * (e1.Product_Name.Discount / 100))) - Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))));
                FilterData(Remove)
            }

        }else{
            if(Range.length==0&&DValues.length==0&&RValues.length==0&&Values.length==0){
                FilterData(Refresh3)
            }else{
                if (Range.length > 0) {
                    const val=[...Range]
                     SetRange(val)
                  } if (RValues.length > 0) {
                     const dval=[...RValues]
                     SetRValues(dval)
                  
                  } if (Values.length > 0) {
                       const rval=[...Values]
                       SetValues(rval)
                  } if (DValues.length > 0) {
                      const bra=[...DValues]
                      SetDValues(bra)
                  }
          }
        }

    }, [BrandChek])




    return (
        <>


            <>
                {FilterAllowValue ? <>
                    <div className='d-block d-md-none'>
                        <div className='d-flex flex-row justify-content-end mt-2' >
                            <i onClick={() => {
                                HandleClick()
                            }} class="fa-solid fa-xmark  p-1 bg-danger mr-2" style={{ fontSize: '25px', borderRadius: '5px', position: 'fixed', cursor: 'pointer' }}></i>
                        </div>
                    </div>
                    <sidebar className=' bg-white  mt-1 ' style={{ height: '100%', width: '100%', overflowY: 'auto', scrollbarWidth: 'none', borderRadius: '13px' }}>
                        <span className='' style={{ fontSize: '13px', fontWeight: 'bold' }} >Price Ranges</span>
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
                                }} /><small style={{ fontSize: '13px' }}>0-1000</small>
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
                                <input type="checkbox" className='mr-2' name='ra' /><small style={{ fontSize: '13px' }}>1001-5000</small>
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
                                }} /><small style={{ fontSize: '13px' }}>5001-10,000</small>
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
                                }} /><small style={{ fontSize: '13px' }}>10,001-50,000</small>
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
                                }} /><small style={{ fontSize: '13px' }}>50,001-100000</small>
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
                                }} /><small style={{ fontSize: '13px' }}>more 100000</small>
                            </div>

                        </form>

                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 0 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Electronics</span>
                            {AllowClick && AllowClickInd == 0 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)
                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(0)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>
                        {AllowClick && AllowClickInd == 0 && <>
                            <form className='ml-2'  >
                                {Electrinics.map((e) => {
                                    return (
                                        <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                            <input type="checkbox" checked={Values.includes(e)} className='mr-2' name='ea' value={e} onChange={(e) => {
                                                if (e.target.checked) {
                                                    const filter = [e.target.value, ...Values]
                                                    SetValues(filter)
                                                } else {
                                                    const filter = Values.filter((e1) => {
                                                        return e1 != e.target.value
                                                    })
                                                    SetValues(filter)
                                                }
                                            }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                        </div>
                                    )
                                })}
                            </form>

                        </>}
                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 0 ? 'lightgray' : 'white'} ` }}>

                        </div>

                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 1 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Clothing</span>
                            {AllowClick && AllowClickInd == 1 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(1)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>
                        {AllowClick && AllowClickInd == 1 && <>
                            <form className='ml-2'  >
                                {Clothing.map((e) => {

                                    return (
                                        <>
                                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                                <input checked={Values.includes(e)} type="checkbox" className='mr-2' value={e} name='cl' onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...Values]
                                                        SetValues(filter)
                                                    } else {
                                                        const filter = Values.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        SetValues(filter)
                                                    }
                                                }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                            </div>
                                        </>
                                    )
                                })}


                            </form>
                        </>}
                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 1 ? 'lightgray' : 'white'} ` }}>

                        </div>


                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 2 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }}  >Footware</span>
                            {AllowClick && AllowClickInd == 2 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(2)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>
                        {AllowClick && AllowClickInd == 2 && <>
                            <form className='ml-2'  >
                                {Footware.map((e) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                                <input checked={Values.includes(e)} type="checkbox" className='mr-2' name='fo' value={e} onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...Values]
                                                        SetValues(filter)
                                                    } else {
                                                        const filter = Values.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        SetValues(filter)
                                                    }
                                                }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                            </div>

                                        </>
                                    )
                                })}

                            </form></>}
                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 2 ? 'lightgray' : 'white'} ` }}>

                        </div>
                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 3 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Accesories</span>
                            {AllowClick && AllowClickInd == 3 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(3)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>

                        {AllowClick && AllowClickInd == 3 && <>
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
                                                }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </form></>}
                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 3 ? 'lightgray' : 'white'} ` }}>

                        </div>

                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 4 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Beauty</span>
                            {AllowClick && AllowClickInd == 4 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(4)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>
                        {AllowClick && AllowClickInd == 4 && <>
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
                                                }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </form></>}
                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 4 ? 'lightgray' : 'white'} ` }}>

                        </div>
                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 5 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Home_Kitchen</span>
                            {AllowClick && AllowClickInd == 5 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(5)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>

                        {AllowClick && AllowClickInd == 5 && <>
                            <form className='ml-2'  >
                                {Home_Kitchen.map((e) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                                <input type="checkbox" className='mr-2' checked={Values.includes(e)} value={e} name='Hk' onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...Values]
                                                        SetValues(filter)
                                                    } else {
                                                        const filter = Values.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        SetValues(filter)
                                                    }
                                                }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </form></>}
                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 5 ? 'lightgray' : 'white'} ` }}>

                        </div>

                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 6 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Furnitures</span>
                            {AllowClick && AllowClickInd == 6 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(6)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>
                        {AllowClick && AllowClickInd == 6 && <>
                            <form className='ml-2'  >
                                {Furniture.map((e) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                                <input type="checkbox" checked={Values.includes(e)} className='mr-2' value={e} name='fur' onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...Values]
                                                        SetValues(filter)
                                                    } else {
                                                        const filter = Values.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        SetValues(filter)
                                                    }
                                                }} /><small style={{ fontSize: '13px' }} >{e}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </form></>}
                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 6 ? 'lightgray' : 'white'} ` }}>

                        </div>

                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 7 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Books_Music</span>
                            {AllowClick && AllowClickInd == 7 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(7)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>
                        {AllowClick && AllowClickInd == 7 && <>
                            <form className='ml-2'  >
                                {Books_Music.map((e) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                                <input type="checkbox" checked={Values.includes(e)} className='mr-2' value={e} name='Bo' onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...Values]
                                                        SetValues(filter)
                                                    } else {
                                                        const filter = Values.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        SetValues(filter)
                                                    }
                                                }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </form>
                        </>}
                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 7 ? 'lightgray' : 'white'} ` }}>

                        </div>

                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 8 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Sports</span>
                            {AllowClick && AllowClickInd == 8 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(8)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>

                        {AllowClick && AllowClickInd == 8 && <>
                            <form className='ml-2'  >
                                {Sports.map((e) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                                <input type="checkbox" checked={Values.includes(e)} className='mr-2' value={e} name='spo' onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...Values]
                                                        SetValues(filter)
                                                    } else {
                                                        const filter = Values.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        SetValues(filter)
                                                    }
                                                }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </form></>}

                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 8 ? 'lightgray' : 'white'} ` }}>

                        </div>

                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 9 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Health</span>
                            {AllowClick && AllowClickInd == 9 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(9)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>
                        {AllowClick && AllowClickInd == 9 && <>
                            <form className='ml-2'  >
                                {Health.map((e) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                                <input type="checkbox" checked={Values.includes(e)} className='mr-2' value={e} name='Hl' onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...Values]
                                                        SetValues(filter)
                                                    } else {
                                                        const filter = Values.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        SetValues(filter)
                                                    }
                                                }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </form></>}
                        <div className='mt-1' style={{ borderBottom: `2px solid ${AllowClickInd == 9 ? 'lightgray' : 'white'} ` }}>

                        </div>
                        <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 10 ? 'white' : 'lightgray'} ` }}>
                            <span className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Toys&Games</span>
                            {AllowClick && AllowClickInd == 10 ? <>
                                <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                    SetAllowClickInd(null)
                                    SetAllowClick(false)

                                }}></i>
                            </> : <>
                                <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                    SetAllowClickInd(10)
                                    SetAllowClick(true)
                                }}></i></>}
                        </div>
                        {AllowClick && AllowClickInd == 10 && <>
                            <form className='ml-2'  >
                                {Health.map((e) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                                <input type="checkbox" checked={Values.includes(e)} className='mr-2' value={e} name='tg' onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...Values]
                                                        SetValues(filter)
                                                    } else {
                                                        const filter = Values.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        SetValues(filter)
                                                    }
                                                }} /><small style={{ fontSize: '13px' }}>{e}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </form></>}
                        <div className='mt-1 mb-3' style={{ borderBottom: `2px solid ${AllowClickInd == 10 ? 'lightgray' : 'white'} ` }}>

                        </div>
                    </sidebar>
                </> : <>
                    <div className='d-block d-md-none'>
                        <div className='d-flex flex-row justify-content-end mt-2' >
                            <i onClick={() => {
                                HandleClick()
                            }} class="fa-solid fa-xmark  p-1 bg-danger mr-2" style={{ fontSize: '25px', borderRadius: '5px', position: 'fixed', cursor: 'pointer' }}></i>
                        </div>
                    </div>
                    <sidebar className='bg-light' style={{ height: '100%', width: '100%', overflowY: 'auto', scrollbarWidth: 'none', background: '#F5F7FA' }}>
                        {MaxpriceRange < 50000 ? <>
                            {MaxpriceRange == 0 ? <></> : <>
                                <small className='mt-2' style={{ fontWeight: 'bold' }}>Price Ranges</small>
                                <div className='d-flex flex-row ml-2'>
                                    <input type='checkbox' checked={selectedOption === 'option1'


                                    }
                                        onChange={(e) => {

                                            if (e.target.checked) {
                                                handleOptionChange('option1')
                                            } else {
                                                handleOptionChange(null)

                                            }

                                        }} name="rr" id="" o /><small className='ml-2'> Low - High </small>

                                </div>
                                <div className='d-flex flex-row ml-2'>

                                    <input type='checkbox' checked={selectedOption === 'option2'} onChange={(e) => {
                                        if (e.target.checked) {
                                            handleOptionChange('option2')
                                        } else {
                                            handleOptionChange(null)

                                        }
                                    }} name="rr" id="" /><small className='ml-2'> High - Low </small>
                                </div>
                            </>}
                        </> : <>
                            <small className='mt-2' style={{ fontWeight: 'bold' }}>Price Ranges</small>
                            <div className='d-flex flex-row ml-2'>
                                <input onChange={(e) => {

                                    if (e.target.checked) {
                                        const filter = [[MinpriceRange, MinpriceRange + (partpriceRange * 1)], ...Range]

                                        SetRange(filter)

                                    } else {

                                        const filter = Range.filter((e1) => {
                                            if (e1.includes(MinpriceRange)) {

                                            } else {
                                                return e
                                            }
                                        })
                                        SetRange(filter)
                                    }
                                }} type='checkbox' name="" id="" value={[MinpriceRange, MinpriceRange + (partpriceRange * 1)]} /><small className='ml-2'>{MinpriceRange} - {MinpriceRange + (partpriceRange * 1)}</small>
                            </div>
                            <div className='d-flex flex-row ml-2'>
                                <input onChange={(e) => {

                                    if (e.target.checked) {
                                        const filter = [[MinpriceRange + (partpriceRange * 1) + 1, MinpriceRange + (partpriceRange * 2)], ...Range]
                                        SetRange(filter)

                                    } else {
                                        const filter = Range.filter((e) => {
                                            if (e.includes(MinpriceRange + (partpriceRange * 1) + 1)) {

                                            } else {
                                                return e
                                            }
                                        })
                                        SetRange(filter)
                                    }
                                }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 1) + 1, MinpriceRange + (partpriceRange * 2)]} /><small className='ml-2'>{MinpriceRange + (partpriceRange * 1) + 1} - {MinpriceRange + (partpriceRange * 2)}</small>
                            </div>
                            <div className='d-flex flex-row ml-2'>
                                <input onChange={(e) => {

                                    if (e.target.checked) {
                                        const filter = [[MinpriceRange + (partpriceRange * 2) + 1, MinpriceRange + (partpriceRange * 3)], ...Range]

                                        SetRange(filter)

                                    } else {
                                        const filter = Range.filter((e) => {
                                            if (e.includes(MinpriceRange + (partpriceRange * 2) + 1)) {

                                            } else {
                                                return e
                                            }
                                        })
                                        SetRange(filter)
                                        console.log(filter)
                                    }
                                }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 2) + 1, MinpriceRange + (partpriceRange * 3)]} /><small className='ml-2'>{MinpriceRange + (partpriceRange * 2) + 1} - {MinpriceRange + (partpriceRange * 3)}</small>
                            </div>
                            <div className='d-flex flex-row ml-2'>
                                <input onChange={(e) => {

                                    if (e.target.checked) {
                                        const filter = [[MinpriceRange + (partpriceRange * 3) + 1, MinpriceRange + (partpriceRange * 4)], ...Range]

                                        SetRange(filter)

                                    } else {
                                        const filter = Range.filter((e) => {
                                            if (e.includes(MinpriceRange + (partpriceRange * 3) + 1)) {

                                            } else {
                                                return e
                                            }
                                        })
                                        SetRange(filter)
                                    }
                                }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 3) + 1, MinpriceRange + (partpriceRange * 4)]} /><small className='ml-2'>{MinpriceRange + (partpriceRange * 3) + 1} -   {MinpriceRange + (partpriceRange * 4)}</small>
                            </div>
                            <div className='d-flex flex-row ml-2'>
                                <input onChange={(e) => {

                                    if (e.target.checked) {
                                        const filter = [[MinpriceRange + (partpriceRange * 4) + 1, MinpriceRange + (partpriceRange * 5) + 10], ...Range]

                                        SetRange(filter)

                                    } else {
                                        const filter = Range.filter((e) => {
                                            if (e.includes(MinpriceRange + (partpriceRange * 4) + 1)) {

                                            } else {
                                                return e
                                            }
                                        })
                                        SetRange(filter)
                                    }
                                }} type='checkbox' name="" id="" value={[MinpriceRange + (partpriceRange * 4) + 1, MinpriceRange + (partpriceRange * 5) + 10]} /><small className='ml-2'>{MinpriceRange + (partpriceRange * 4) + 1} - {MinpriceRange + (partpriceRange * 5) + 10}</small>
                            </div>
                        </>}

                        {Discount.length > 0 && <>

                            <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 0 ? 'white' : 'lightgray'} ` }}>
                                <small className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Discount</small>
                                {AllowClick && AllowClickInd == 0 ? <>
                                    <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                        SetAllowClickInd(null)
                                        SetAllowClick(false)

                                    }}></i>
                                </> : <>
                                    <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                        SetAllowClickInd(0)
                                        SetAllowClick(true)
                                    }}></i></>}
                            </div>
                            {AllowClick && AllowClickInd == 0 && <>
                                {Discount.map((e, ind) => [
                                    <div className='d-flex flex-row ml-2'>
                                        <input checked={DValues.includes(`${e}`)} type="checkbox" name="" id=""
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
                                            }} value={e} /><small className='ml-2'>{e} % more </small>
                                    </div>
                                ])}</>}
                            <div className='mt-1 mb-3' style={{ borderBottom: `2px solid ${AllowClickInd == 0 ? 'lightgray' : 'white'} ` }}>

                            </div>
                        </>}
                        {Rating2.length > 1 && <>
                            <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 1 ? 'white' : 'lightgray'} ` }}>
                                <small className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Ratings</small>
                                {AllowClick && AllowClickInd == 1 ? <>
                                    <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                        SetAllowClickInd(null)
                                        SetAllowClick(false)

                                    }}></i>
                                </> : <>
                                    <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                        SetAllowClickInd(1)
                                        SetAllowClick(true)
                                    }}></i></>}
                            </div>
                            {AllowClick && AllowClickInd == 1 && <>
                                {Rating2.map((e, ind) => {
                                    return (
                                        <>
                                            {e > 0 && <>
                                                <div className='d-flex flex-row ml-2'>
                                                    <input type="checkbox" checked={RValues.includes(e)} name="" id="" value={e} onChange={(e) => {
                                                        if (e.target.checked) {
                                                            const filter = [e.target.value, ...RValues]
                                                            SetRValues(filter)
                                                        } else {
                                                            const filter = RValues.filter((e1) => {
                                                                return e1 != e.target.value
                                                            })
                                                            SetRValues(filter)
                                                        }
                                                    }} /><small className='ml-2'>{e}<i class="fa-solid fa-star text-success ml-1"></i></small>
                                                </div>
                                            </>}
                                        </>
                                    )
                                })}
                            </>}
                            <div className='mt-1 mb-3' style={{ borderBottom: `2px solid ${AllowClickInd == 1 ? 'lightgray' : 'white'} ` }}>

                            </div>
                        </>}
                        {Brand2.length > 0 && <>

                            <div className='d-flex flex-row justify-content-between mt-2 p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 2 ? 'white' : 'lightgray'} ` }}>
                                <small className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Brands</small>
                                {AllowClick && AllowClickInd == 2 ? <>
                                    <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                        SetAllowClickInd(null)
                                        SetAllowClick(false)

                                    }}></i>
                                </> : <>
                                    <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                        SetAllowClickInd(2)
                                        SetAllowClick(true)
                                    }}></i></>}
                            </div>

                            {AllowClick && AllowClickInd == 2 && <>
                                {/* {Brand2.length > 8 && <>
                                <input type="text" style={{ borderRadius: '5px', border: '1px solid lightgray' }} className='ml-2' name="" id="" placeholder='search for brand' />
                            </>} */}
                                {Brand2.slice().reverse().map((e, ind) => {
                                    return (
                                        <>

                                            <div className='d-flex flex-row ml-2'>

                                                {<>
                                                    <input type="checkbox" name="" checked={BrandChek.includes(e)} id="" value={e} onChange={(e) => {
                                                        if (e.target.checked) {
                                                            const filter = [e.target.value, ...BrandChek]
                                                            SetBrandCheck(filter)
                                                        } else {
                                                            const filter = BrandChek.filter((e1) => {
                                                                return e1 != e.target.value
                                                            })
                                                            SetBrandCheck(filter)
                                                        }
                                                    }} /><small className='ml-2'>{e}</small>
                                                </>}
                                            </div>

                                        </>
                                    )
                                })}
                                <div className='mt-1 mb-3' style={{ borderBottom: `2px solid ${AllowClickInd == 2 ? 'lightgray' : 'white'} ` }}>

                                </div>
                            </>}
                        </>}
                        {CNames2.length > 0 && <>

                            <div className='d-flex flex-row justify-content-between mt-3     p-1  ' style={{ borderTop: '2px solid lightgray', borderBottom: `2px solid ${AllowClickInd == 3 ? 'white' : 'lightgray'} ` }}>
                                <small className='mt-auto mb-auto' style={{ fontSize: '13px', fontWeight: 'bold' }} >Only</small>
                                {AllowClick && AllowClickInd == 3 ? <>
                                    <i class="fa-solid fa-chevron-up btn" onClick={() => {
                                        SetAllowClickInd(null)
                                        SetAllowClick(false)

                                    }}></i>
                                </> : <>
                                    <i class="fa-solid fa-angle-down mr-4 btn" onClick={() => {
                                        SetAllowClickInd(3)
                                        SetAllowClick(true)
                                    }}></i></>}
                            </div>

                            {AllowClick && AllowClickInd == 3 && <>
                                {CNames2.map((e, ind) => {

                                    return (
                                        <>
                                            <div className='d-flex flex-row ml-2'>
                                                <input type="checkbox" name="" checked={Values.includes(e)} id="" value={e} onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...Values]
                                                        SetValues(filter)
                                                    } else {
                                                        const filter = Values.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        SetValues(filter)
                                                    }
                                                }} /><small className='ml-2'>{e}</small>
                                            </div>
                                        </>
                                    )
                                })}</>}
                        </>}
                    </sidebar>
                </>}

            </>

        </>
    )
}

export default FilterSideBar