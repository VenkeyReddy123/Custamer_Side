import React from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'

const Card_Details = () => {
  const Data = Mobile_Data
  return (
    <>

      <div className='d-flex d-sm-flex flex-sm-row d-md-flex flex-md-row d-lg-flex flex-lg-column '>
        {Data.slice(2, 7).map((e) => {
          return (
            <>
              <div className=' col-sm-12 col-md-6 col-lg-12'>
                <div className='card d-flex flex-row '>
                  <div className='card-body d-flex flex-column ' style={{ background: '#8EBCE3' }}>
                    <img src={e.images[0]} alt="" width={'100%'} height={'150px'} />
                    <div className='card-footer '>
                        <button className='btn border-danger text-danger mt-2 col-12'><i className="fa-solid fa-trash mr-auto text-dark"></i> Delete</button>
                      </div>
                  </div>
                  <div className='card-body d-flex flex-column '>
                  <div className='d-flex flex-row '>
                          <span className='text-danger h6'>Price:-</span><span className='h4'>{e.price * 75}ind</span>
                        </div>
                        <div className='d-flex flex-row '>
                          <span className='text-danger h6 '>title:-</span><span className='h4'>{e.title}</span>
                        </div>
                        <div className='d-none d-xl-flex flex-row'>
                          <span className='text-danger h6'>Description:-</span><span className='h6'>{e.description}</span>
                        </div>
                        
                        
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>

    </>
  )
}

export default Card_Details