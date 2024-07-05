import React, { useState, useEffect } from 'react'

const CurrentLocation = () => {
    const [location, setLocation] = useState(null);

    // useEffect(() => {
    //     // getLocation();
    // }, []);
    useEffect(() => {
        // Get user's current location using Browser Geolocation API
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const reverseGeocodingResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
        
            const reverseGeocodingData = await reverseGeocodingResponse.json();
             console.log(reverseGeocodingData.address)
            const { suburb
                , city, road, state, postcode } = reverseGeocodingData.address;
            setLocation({
                suburb,
                city,
                road,
                state,
                postcode
            });
        });
    }, []);

    // const reverseGeocodingResponse = await fetch(
    //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBkG2P-dH0_R2XSvkrMXalewCc3aj6LKtM`
    //   );
    
    //   const reverseGeocodingData = await reverseGeocodingResponse.json();
    //   console.log(reverseGeocodingData);
    return (
        <>
            <div>
                {location ? (
                    <div>
                        <p>Village: {location.suburb}</p>
                        <p>City: {location.suburb}</p>
                        <p>Road: {location.road}</p>
                        <p>State: {location.state}</p>
                        <p>Pin Code: {location.postcode}</p>
                    </div>
                ) : (
                    <p>Loading location...</p>
                )}
            </div>

        </>
    )
}
export default CurrentLocation