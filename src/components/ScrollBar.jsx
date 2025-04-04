import { useEffect, useRef, useState } from "react";

const ScrollBar = ({ children, height, customClassName }) => {

    const scrollableContentRef = useRef(null);
    const thumbRef = useRef(null);
    const scrollbarTrackRef = useRef(null);
    const [isDragging, setisDragging] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [startScrollTop, setStartScrollTop] = useState(0);

    // function to update the thumb size and position within the scrollbar-track
    const updateThumb = () => {
        const content = scrollableContentRef.current;
        const thumb = thumbRef.current;

        const contentHeight = content.scrollHeight;
        const containerHeight = content.clientHeight;

        // Update thumb size and position based on content scroll
        if (thumb && contentHeight > containerHeight) {
            const thumbHeight = (containerHeight / contentHeight) * containerHeight;
            const thumbPosition = (content.scrollTop / contentHeight) * containerHeight;


            thumb.style.height = `${thumbHeight}px`;
            thumb.style.transform = `translateY(${thumbPosition}px)`;
        }
    };

    // Add event listeners to update thumb on scroll
    useEffect(() => {
        const content = scrollableContentRef.current;
        content.addEventListener('scroll', updateThumb);

        // Cleanup event listener on unmount
        return () => {
            content.removeEventListener('scroll', updateThumb);
        };
    }, []);

    // Mouse Down Handler: Start dragging the thumb
    const onMouseDown = (e) => {

        if (!thumbRef.current) {
            return;
        }

        setisDragging(true);
        setMouseY(e.clientY); // set initial mouse position
        setStartScrollTop(scrollableContentRef.current.scrollTop); // set initial scrollTop position of the content


        document.body.style.pointerEvents = 'none';
        if (scrollbarTrackRef.current) {
            scrollbarTrackRef.current.style.opacity = '1'
        }
    }

    // update scroll position by dragging scrollbar thumb

    const onMouseMove = (e) => {
        if (!isDragging) return;

        const distanceMouseY = e.clientY - mouseY; // calculate the distance between initial position and current position 
        const content = scrollableContentRef.current;
        const contentHeight = content.scrollHeight;
        const containerHeight = content.clientHeight;

        // Calculate the new scroll position based on thumb movement
        const scrollPercentage = distanceMouseY / containerHeight; // How far the thumb has moved in percentage
        const newScrollTop = startScrollTop + (scrollPercentage * contentHeight);

        // Ensure the scrollTop is within bounds
        content.scrollTop = newScrollTop

    }

    // stop the dragging on mouse up 

    const onMouseUp = () => {

        setisDragging(false);

        document.body.style.pointerEvents = '';

        if (scrollbarTrackRef.current) {
            scrollbarTrackRef.current.style.opacity = ''
        }

    }


    // add and remove the mouse event listeners 

    useEffect(() => {

        if (thumbRef.current) {
            thumbRef.current.addEventListener('mousedown', onMouseDown)
        }

        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);


        // cleanup event listeners on component unmount 
        return () => {
            if (thumbRef.current) {
                thumbRef.current.removeEventListener('mousedown', onMouseDown)

            }

            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }


    }, [isDragging])


    return <>
        <div className={`scrollbar-container  ${customClassName ? customClassName : ''}`}>

            <div className="scrollbar-content scroll rounded" style={{ height: height }} ref={scrollableContentRef}>
                {children}
            </div>

            <div className="scrollbar-track" ref={scrollbarTrackRef} >
                <div className="scrollbar-thumb" ref={thumbRef}></div>
            </div>

        </div>
    </>
}

export default ScrollBar