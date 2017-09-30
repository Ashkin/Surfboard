import React, { Component } from 'react'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';


class Background extends Component {

  render() {
    return (
      <CloudinaryContext cloudName="drinkboard">
        <Image
          className="site background"
          publicId={'merchant_photos/fjxtoe0arynsffpipjiq.png'}
        >
          <Transformation crop="scale" width="1400" />
          <Transformation effect="blur:250" />
        </Image>
      </CloudinaryContext>
    )
  }

}


export default Background
// http://res.cloudinary.com/drinkboard/image/upload/e_blur:1104,o_100/v1506642501/merchant_photos/bypbw2ghsgrkkhmjznm2.png