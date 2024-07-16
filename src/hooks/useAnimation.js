import { getFx1 } from "../effects";
import { useCallback, useEffect, useRef, useState } from 'react';

const useAnimation = (prefix) => {
    const animationRef = useRef();
    const [startValues, setStartValues] = useState({id: 0, inc: 1});
    const myCallback = useCallback(getFx1(prefix, animationRef, () => myCallback, startValues, setStartValues));
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        if (animation) {
            animationRef.current = requestAnimationFrame(myCallback);

            return () => {
                cancelAnimationFrame(animationRef.current);
            }
        } else if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

    }, [animation]);

    return { animation, setAnimation }
}

export default useAnimation;