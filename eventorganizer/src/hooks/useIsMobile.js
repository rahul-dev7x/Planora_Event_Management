import { useState } from 'react';
import { useEffect } from 'react';

const useIsMobile=()=>{

    const [isMobile,setIsMobile]=useState(false);
    useEffect(()=>{
        const handleResize=()=>{
            if(window.innerWidth<768)
            {
                setIsMobile(true)
            }
        }
        handleResize();
        window.addEventListener("resize",handleResize);
        return ()=>{
            window.removeEventListener("resize",handleResize)
        }


    },[])
}


export default useIsMobile;