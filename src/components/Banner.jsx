import {useEffect, useRef} from "react";
import $ from "jquery";


function Banner(){
    const bannerRef = useRef(null);

    useEffect(() => {
        const $banner = $(bannerRef.current);
        $banner.hide().fadeIn(5000);
        return () => {
            $banner.stop(true,true);
        };
    },[]);


    return(
        <div ref={bannerRef} className="banner">
            <h2>Witaj w task menager</h2>
            <p>zaplanuj i dodaj zadania</p>
        </div>
    );
}
export default Banner;