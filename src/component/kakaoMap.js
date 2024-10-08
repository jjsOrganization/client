import React, { useEffect } from 'react';

function Kakao(props) {
    useEffect(() => {
        const { kakao } = window;
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <div className="mapContainer" style = {props.mapSize}>
            <div id="map" style={{ width: '100%', height: '100%',zIndex: 100 }}></div>
        </div>
    );
}

export default Kakao;