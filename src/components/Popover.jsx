import { useEffect, useRef } from "react"

const Popover = ({ customPosition, setPopover, position = "bottom", style, height = "50px", width = "200px", children, onClose, targetRef }) => {


    const popoverRef = useRef(null)

    const calculatePosition = () => {

        if (targetRef.current) {
            const targetPosition = targetRef.current.getBoundingClientRect()
            const popoverWidth = parseInt(width);
            const popoverHeight = parseInt(height);

            let top = targetPosition.bottom;
            let left = targetPosition.left;

            if (position === "top") {
                top = targetPosition.top - popoverHeight
            } else if (position === "left") {
                left = targetPosition.left - popoverWidth;
            } else if (position === "right") {
                left = targetPosition.right
            }

            // avoid to hide popover when on the edge of the window

            if (top < 0) {
                top = targetPosition.top;

            }

            //custom position popover
            if (customPosition) {
                top = customPosition.top
                left = customPosition.left
            }


            // Center the popover when it is positioned at top or bottom
            if (position === "top" || position === "bottom") {
                // Calculate the center of the target element
                left = targetPosition.left + targetPosition.width / 2 - popoverWidth / 2;
            }

            console.log("top:", top, "left:", left)

            // Apply the calculated position directly to popover's style
            popoverRef.current.style.top = `${top}px`;
            popoverRef.current.style.left = `${left}px`;

        }

    }


    // Detect click outside the popover to close it
    useEffect(() => {
        const handleClickOutside = (e) => {
       
            if (popoverRef.current && !popoverRef.current.contains(e.target) && targetRef.current && !targetRef.current.contains(e.target)) {

                onClose();
             
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [onClose]);


    // Recalculate the position when the popover becomes visible
    useEffect(() => {
        if (setPopover) {
            calculatePosition();
        }
    }, [setPopover]);


    return (<>

        <div ref={popoverRef}

            className=" popover-container"

            style={{
                position: 'absolute',
                height: height,
                width: width,
                background: 'grey',
                borderRadius: '4px',
                padding: '10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 9999,
                ...style,
            }}

        >



            {children}





        </div>

    </>)
}

export default Popover;

