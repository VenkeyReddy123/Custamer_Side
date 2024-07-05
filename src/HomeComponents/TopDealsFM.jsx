import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Nav.css'

class TruncateWords extends React.Component {
  truncateWords = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
    return truncated + '...';
  };

  render() {
    const { text, maxLength } = this.props;
    const truncatedText = this.truncateWords(text, maxLength);

    return <span>{truncatedText}</span>;
  }
}


export const TopDealsFM = () => {
  const [Data2, setData2] = useState()
  const navigate = useNavigate()
  const [scrollPosition, setScrollPosition] = useState(0);
  const [step, setStep] = useState(0);
  const containerRef = useRef(null);
  const columnRef = useRef(null);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
      const filter = d.data.filter((e) => {
        return e.Product_Name.Category.toLowerCase().includes('Cloth'.toLowerCase())
      })
      setData2(filter.slice().reverse())


    }).catch((e) => {

    })

  }, [])
  useEffect(() => {
    const container = containerRef.current;
    const column = columnRef.current;
    if (!container || !column) return;

    const containerWidth = container.offsetWidth;
    const colWidth = column.offsetWidth;

    setStep(colWidth);
  }, [Data2]);
  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    if (direction === 'right') {
      if (scrollPosition < Data2.length - 1) {
        container.scrollTo({
          left: container.scrollLeft + step + 60,
          behavior: 'smooth',
        });
        setScrollPosition(scrollPosition + 1);
      }
    } else if (direction === 'left') {
      if (scrollPosition > 0) {
        container.scrollTo({
          left: container.scrollLeft - step - 55,
          behavior: 'smooth',
        });
        setScrollPosition(scrollPosition - 1);
      }
    }
  };

  return (
    <>

      <div className='col-12 d-flex flex-row justify-content-between'>
        <h6>Fashion Deals</h6>
        <div className=''>
        <span className='btn  mr-3' onClick={() => handleScroll('left')} style={{background:'lightgray '}}   ><i class="fa-solid fa-angles-left"></i></span>
                        <span className='btn btn- ml-2' onClick={() => handleScroll('right')} style={{background:'lightgray '}} ><i class="fa-solid fa-angles-right"></i></span>
        </div>
      </div>
      <div id='scroll-container' ref={containerRef} className='col-12 d-flex flex-row p-3 ' style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
        {Data2 && Data2.slice(0, 10).map((e) => {
          return (
            <>
              <div style={{ width: '50px', background: 'red', visibility: 'hidden' }}>
                ffrtsdfgdsfg
              </div>
              <div ref={columnRef} className=' d-flex flex-row justify-content-center col-7 col-md-4 col-lg-3 col-xl-2 card' style={{ height: '200px', position: 'relative' }}>
                <LazyLoadImage className='p-2 zoom-effect img1' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'auto'} width={'auto'} style={{ cursor: 'pointer' }} />
                <small onClick={() => { navigate('/Dis', { state: { data: e } }) }}  className=' ml-auto mr-auto mt-auto mb-auto text-success text' style={{ position: 'absolute', bottom: '0px',cursor: 'pointer' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={20} /></small>

              </div>
            </>
          )
        })}
      </div>

    </>
  )
}
