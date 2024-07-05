import React, { useEffect, useRef, useState } from 'react'
import { Accesories, Catigories } from '../Data.jsx'
import { Electrinics } from '../Data.jsx'
import { Clothing } from '../Data.jsx'
import { Footware } from '../Data.jsx'
import { Beauty_PersonCare } from '../Data.jsx'
import { Home_Kitchen } from '../Data.jsx'
import { Furniture } from '../Data.jsx'
import { Books_Music } from '../Data.jsx'
import { Toys_Games } from '../Data.jsx'
import { Sports } from '../Data.jsx'
import { Health } from '../Data.jsx'
import { Images } from '../Data.jsx'
import ResizedImage from './ResizedImage.jsx'
class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <span>{truncatedText}</span>
    }
}

function Category({ HandleOverCat, HandleRemove }) {
    const [scrollPosition, setScrollPosition] = useState(0);

    const containerRef = useRef(null);
    const columnRef = useRef(null);
    const HandleOver = (e) => {


        if (e.includes("Elec")) {
            HandleOverCat(Electrinics)
        } else if (e.includes("Foot")) {
            HandleOverCat(Footware)
        }
        else if (e.includes("Clot")) {
            HandleOverCat(Clothing)
        }
        else if (e.includes("Beau")) {
            HandleOverCat(Beauty_PersonCare)
        }
        else if (e.includes("Home")) {
            HandleOverCat(Home_Kitchen)
        }
        else if (e.includes("Acc")) {
            HandleOverCat(Accesories)
        }
        else if (e.includes("Foot")) {
            HandleOverCat(Footware)
        }
        else if (e.includes("Furni")) {
            HandleOverCat(Furniture)
        }
        else if (e.includes("Book")) {
            HandleOverCat(Books_Music)
        }
        else if (e.includes("Spor")) {
            HandleOverCat(Sports)
        } else if (e.includes("Health")) {
            HandleOverCat(Health)
        }
        else if (e.includes("Toy")) {
            HandleOverCat(Toys_Games)
        }
    }
    const handleScroll = (direction) => {
        const container = containerRef.current;
        const column = columnRef.current;
        if (!container) return;
        const colWidth = column.offsetWidth;
        if (direction === 'right') {
            if (scrollPosition < Catigories.length - 1) {
                container.scrollTo({
                    left: container.scrollLeft + colWidth + 20,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition + 1);
            }
        } else if (direction === 'left') {
            if (scrollPosition > 0) {
                container.scrollTo({
                    left: container.scrollLeft - colWidth - 25,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition - 1);
            }
        }
    };


    return (
        <>
            <div   className='d-flex flex-column' style={{ overflow: 'hidden' }}>

                <div className='mb-2 ml-auto mr-5' onMouseEnter={() => {
                    HandleRemove()
                }}>
                   <div className='mr-4'>
                   <i class="fa-solid fa-angles-left text-warning p-1 card mr-2" onClick={() => handleScroll('left')} style={{fontSize:'15px'}}></i>
                        <i class="fa-solid fa-angles-right text-info  p-1 card ml-2"  onClick={() => handleScroll('right')} style={{fontSize:'15px'}}></i>
                  </div>
                </div>
                


                <div id='scroll-container' ref={containerRef} className='d-flex flex-row col-12' style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {Catigories && Catigories.map((e, ind) => {
                        return (
                            <>
                                <div style={{ height: '160px', width: '20px', background: 'red', visibility: 'hidden' }}>
                                    ffrtsdfgdsfg
                                </div>
                                <div onMouseEnter={() => {
                                    HandleOver(e)
                                }} ref={columnRef} style={{ height: '150px', border: '3px solid #F7F7F7', overflow: 'hidden' }} className=' col-5 col-sm-3 col-md-2 col-lg-2 col-xl-1  text-center bg-white p-2'>
                                    <div style={{ height: '100px', borderRadius: '10px', cursor: 'pointer', width: 'auto' }} className='    text-center'>
                                       
                                        <img src="" alt="" srcset={Images[ind]} style={{width:'100%',height:'100%',objectFit:'contain'}} />


                                    </div>
                                    <small className=''><small className='' style={{textWrap:'wrap',overflow:'hidden'}}><TruncateWords text={e.includes('Books')?'Books&Music':e} maxLength={20} /></small></small>
                                </div>

                            </>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default Category