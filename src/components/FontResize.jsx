import { useEffect, useRef, useContext, useState } from "react";
import songContext from "../contexts/SongContext";

const FontResize = ({
    children,
    className = '',
    style = {},
    ...props
}) => {

    const [containerWidth, setContainerWidth] = useState();
    const { songContainer } = useContext(songContext);
    const containerRef = useRef(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {

            if (containerRef.current) {

                for (let entry of entries) {
                    let width;
                    if (entry.contentBoxSize) {
                        const boxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
                        width = boxSize.inlineSize;
                    } else {
                        width = entry.contentRect.width
                    }

                    setContainerWidth(width);

                }
            }

        })

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

    }, [])

    useEffect(() => {

        const resizeObserver = new ResizeObserver(() => {

            if (containerRef.current) {
                const divHeight = containerRef.current.clientHeight;
                const divWidth = containerRef.current.clientWidth;
                const scrollHeight = containerRef.current.scrollHeight;

                if (scrollHeight > divHeight) {

                    containerRef.current.style.fontSize = (divWidth * 0.05) + 'px';
                    console.log(scrollHeight, divHeight, 'font size: ', (divWidth * 0.04) + `px`)

                }
            }


        });


        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }


        return () => {
            resizeObserver.disconnect();
            if (containerRef.current) {
                containerRef.current.style.fontSize = "calc(1rem + 2vw)"
            }

        }

    }, [children, containerWidth, songContainer]);

    return (
        <>
            <div
                ref={containerRef}
                className={className}
                style={{

                    overflow: "hidden",
                    maxHeight: "180px",

                    ...style
                }}
                {...props}

            >
                {children}
            </div>

        </>
    )
}

export default FontResize;