import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    console.log("product", props.product)
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{
                lat: props.product ? props.product.latitude : -34.397,
                lng: props.product ? props.product.latitude : 150.644 
            }}
        >
            {props.isMarkerShown &&
                <Marker 
                    position={{
                        lat: props.product ? props.product.latitude : -34.397,
                        lng: props.product ? props.product.latitude : 150.644 
                    }}
                />
            }
        </GoogleMap>
    )
    
}))