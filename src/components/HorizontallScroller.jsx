import { useEffect, useRef, useState } from "react";
import ScrollRightIcon from "../Icons/scrollRightIcon";
import ScrollLeftIcon from "../Icons/ScrollLeftIcon";

const HorizontalScroller = ({ children, scrollAmount = 300, setRightBtn }) => {

    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);


    const el = scrollRef.current;
    const updateScrollButtons = () => {
        if (!el) return;

        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);

    };

    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
  
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const width = entry.contentRect.width;
          setContainerWidth(width); // This will re-run any useEffect that depends on containerWidth
        }
      });
      
      observer.observe(el);
  
      return () => observer.disconnect();
    }, []); // only set up observer once


    useEffect(() => {
        console.log('rendered')

        if (!el) return;


        updateScrollButtons();

        el.addEventListener('scroll', updateScrollButtons);


        return () => {
            el.removeEventListener('scroll', updateScrollButtons);

        }; 
    }, [containerWidth]);

    console.log(showLeft, showRight)

    // handle horizontal scroll through buttons
    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -scrollAmount, // scroll left by 300px
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: scrollAmount, // scroll right by 300px
            behavior: 'smooth',
        });
    };


    return (
        <>
            <div className="position-relative horizontal-scroll">

                {showLeft && (
                    <div className="scroll-btn left" onClick={scrollLeft}>
                        <ScrollLeftIcon />
                    </div>
                )}

                {showRight && (
                    <div className="scroll-btn right" onClick={scrollRight}>
                        <ScrollRightIcon />
                    </div>
                )}

                <div className="d-flex songs-row overflow-x-auto"

                    ref={scrollRef}

                >

                    {children}
                </div>

            </div>
        </>
    )
}

export default HorizontalScroller;