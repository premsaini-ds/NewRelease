import * as React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const PhotoSlider = (props: any) => {
    const options = {
        type: "loop",
        autoplay: true, 
        PauseOnHover: true,
        drag: true,
        arrows: false,
        pagination:false,
    }


    const { photoGallery } = props;

    

    const photos = photoGallery?.map((element: any, index: number) => (

        <SplideSlide key={index}>
            <img src={element?.url} style={{height: '320px',width:'100%'}}/>
        </SplideSlide>
    ));
    return (
        <>
            <Splide aria-label="Photo Slider" options={options}>
                {photos}
            </Splide>
        </>
    );
};

export default PhotoSlider;