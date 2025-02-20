import { useEffect, useRef } from "react"

const Popover = ({
    customPosition,
    setPopover,
    position = "bottom",
    style,
    height = "50px",
    width = "200px",
    children,
    onClose,
    targetRef,
    arrow,
    arrowStyle
}) => {
    const popoverRef = useRef(null);

    const calculatePosition = () => {
        if (targetRef.current) {

            const targetPosition = targetRef.current.getBoundingClientRect();
            const popoverWidth = parseInt(width);
            const popoverHeight = parseInt(height);

            let top = targetPosition.bottom;
            let left = targetPosition.left;

            if (position === "top") {
                top = targetPosition.top - popoverHeight;
            } else if (position === "left") {
                left = targetPosition.left - popoverWidth;
            } else if (position === "right") {
                left = targetPosition.right;
            }

            // Ensure the popover doesn't go outside the viewport (right edge)
            if (left + popoverWidth > window.innerWidth) {
                left = window.innerWidth - popoverWidth;
            }

            // Center the popover when it is positioned at top or bottom
            if (position === "top" || position === "bottom") {
                // Calculate the center of the target element
                left = targetPosition.left + targetPosition.width / 2 - popoverWidth / 2;
            }

            if (position === "center-right" || position === "center-left") {
                // Calculate the center of the target element

                if (position === "center-left") {
                    left = targetPosition.left - popoverWidth;
                    top = targetPosition.top + targetPosition.height / 2 - popoverHeight / 2;
                } else {
                    left = targetPosition.right;
                    top = targetPosition.top + targetPosition.height / 2 - popoverHeight / 2;
                }
            }

            //custom position popover
            if (customPosition) {
                top = customPosition.top ? customPosition.top : top;
                left = customPosition.left ? customPosition.left : left;
            }

            // avoid to hide popover when on the edge of the window
            if (top < 0 || popoverRef.current.top < 0) {

                const popoverPosition = popoverRef.current.getBoundingClientRect()
                console.log('hides on top, ', 'popover top:', popoverPosition.top,)
                top = 5;
            }



            if (left < 0) {

                left = targetPosition.left;
            }

            console.log("top:", top, "left:", left, targetPosition.top);

            // Apply the calculated position directly to popover's style
            if (popoverRef.current) {
                popoverRef.current.style.top = `${top}px`;
                popoverRef.current.style.left = `${left}px`
            };
        }
    };

    // Detect click outside the popover to close it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target) &&
                targetRef.current &&
                !targetRef.current.contains(e.target)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);


    // Recalculate the position when the popover becomes visible
    useEffect(() => {
        const handleScroll = () => {
            console.log("recalculcated");
            calculatePosition(); // Recalculate position when targetRef is scrolled
        };

        if (targetRef.current) {
            console.log("handlescroll mounts");

            createPlaylistdiv.addEventListener("scroll", handleScroll);

            document.addEventListener('resize', handleScroll);
            document.addEventListener('scroll', handleScroll);

        }

        return () => {
            if (targetRef.current) {
                console.log("handlescroll unmounts");

                createPlaylistdiv.removeEventListener("scroll", handleScroll);

                document.removeEventListener('resize', handleScroll);
                document.removeEventListener('scroll', handleScroll);

            }
        };
    }, []);

    useEffect(() => {
        if (setPopover) {
            calculatePosition();
        }
    }, [setPopover]);

    return (
        <>
            <div
                ref={popoverRef}
                className="popover-container"
                style={{
                    position: "absolute",
                    height: height,
                    width: width,
                    background: "grey",
                    borderRadius: "4px",
                    padding: "10px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 9999,
                    ...style,
                }}
            >
                {children}

                {arrow && arrow === true && (

                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "-10px", // Adjust this value to move the arrow closer or further from the popover
                            transform: "translateY(-50%)", // Center the arrow vertically
                            width: "0",
                            height: "0",
                            borderRight: "15px solid #69bfff", // Right side of the arrow
                            borderTop: "10px solid transparent", // The color of the arrow
                            borderBottom: "10px solid transparent",
                            ...arrowStyle,
                        }}
                    >

                    </div>
                )}
            </div>
        </>
    );
};

export default Popover;




