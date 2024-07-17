import { useCallback, useEffect, useRef, useState } from 'react';

const useChaser = (prefix, functions, variables, variablesKeys) => {
    const animationRef = useRef();
    const [animation, setAnimation] = useState(false);
    let startValues = {};
    let setStartValues = {};
    for(const i in variablesKeys){
        let key = variablesKeys[i];
        const [value, setValue] = useState(variables[key]);
        startValues[key] = value;
        setStartValues["set" + key[0].toUpperCase() + key.substring(1)] = setValue;
    }

    const [lastExecs, setLastExecs] = useState (null);
    
    const myCallback = useCallback(getAnimation(prefix, functions, {startValues, setStartValues}, {lastExecs, setLastExecs}, animationRef, () => myCallback));

    useEffect(() => {
        if (animation) {
            animationRef.current = requestAnimationFrame(myCallback);

            return () => {
                cancelAnimationFrame(animationRef.current);
            }
        } else if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

    }, [animation, myCallback]);

    return { animation, setAnimation }
}

function getAnimation(prefix, functions, {startValues, setStartValues}, {lastExecs, setLastExecs}, animationRef, callback) {
    const millis = () => Date.now();
    if(lastExecs === null){
        let startLastExecs = {};
        functions.forEach((fn) => startLastExecs[fn.callback] = 0);
        setLastExecs(startLastExecs)
    }
    
    return () => {
        functions.forEach(element => {
            if(millis() - lastExecs[element.callback] >= element.diff){
                element.callback(prefix, startValues, setStartValues);
                lastExecs[element.callback] = millis();
            }
        });

        animationRef.current = requestAnimationFrame(callback());
    }
}

export default useChaser;