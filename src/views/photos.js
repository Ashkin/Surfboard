import React, { Component } from 'react'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { connect } from 'react-redux'

import { savePhoto } from '../actions'
//TODO: move Cloudinary config to its own file


class ViewPhotos extends Component {

  uploadWidget(which) {
    const { venue } = this.props

    // Do we have the necessary Venue data?
    const venueMissing = !(venue.name && venue.zip)
    // No?  Well crap!  No uploading for you!
    if (venueMissing) return


    // Image-specific options, e.g. min-image-height/width, client_allowed_formats, etc.
    // ref: http://cloudinary.com/documentation/upload_widget#upload_widget_options
    let options = {}
    if (which == 'logo')  options = {}
    if (which == 'cover') options = {}


    // Tags to help filter venue photos
    const tags =  [venue.name, venue.zip, which]  //TODO: replace venue.zip with venue.state


    // Open the widget!
    cloudinary.openUploadWidget(
      { cloud_name: 'drinkboard',
        upload_preset: 'merchant',
        sources: ['local', 'url', 'dropbox', 'google_photos', 'instagram'],  //TODO: add 'image_search' (requires google API key)
        search_by_rights: true,
        max_files: 1,
        ...options,
        tags},
      (error, result) => {
        // User didn't upload anything. Booo
        if (!result)  return

        // On success, save the image data  (`path` for the database, `public_id` for displaying locally)
        // The updated state will trigger a rerender, displaying our new image.
        const { path, public_id } = result[0]
        this.props.savePhoto( {[which]: {path, public_id}} )
      }
    )
  }


  renderImage(which) {
    const { photos } = this.props

    // Extract id (if possible)
    let public_id = null
    if (photos && photos[which])
      public_id = photos[which].public_id

    // Display the Image from Cloudinary, if available.
    if (public_id)
      return <Image publicId={public_id}></Image>
  }



  renderVenue() {
    const { venue } = this.props

    let display = {
      name:    venue.name    || "<Missing Venue Name>",
      address: venue.address || "<Missing Venue Address>",
      zip:     venue.zip     || "<Missing Venue Zip>",
    }

    //TODO: Use an address builder
    return (
      <div className="venue">
        <h1>{display.name}</h1>
        <div className="address">
          {display.address}<br/>
          {display.zip}
        </div>
      </div>
    )
  }



  render() {
    const { venue } = this.props

    // Do we have the necessary Venue data?
    const venueMissing = !(venue.name && venue.zip)
    // If not, disable the upload buttons.
    const buttonClass  = (venueMissing ? 'button-disabled' : '')

    return (
      <main>
        <section className="photos">
          <header>
            <span className="filled-circle">3</span> Add Cover Photo and Logo
          </header>
          <CloudinaryContext cloudName="drinkboard">
            <div className="wrapper">
              <div className="aspect-wrapper aspect-ratio ratio-21-9">
                <div className="cover-photo">

                  {this.renderImage.bind(this, 'cover')()}

                  <div className="spacing-top"></div>

                  <div className="logo">
                    {this.renderImage.bind(this, 'logo')()}
                    <button className={buttonClass} onClick={this.uploadWidget.bind(this, 'logo')}>
                     Upload Logo
                    </button>
                  </div>

                  {this.renderVenue()}

                  <button className={"upload-cover-photo " + buttonClass} onClick={this.uploadWidget.bind(this, 'cover')}>
                    Upload Cover Photo
                  </button>

                </div>
              </div>
            </div>
          </CloudinaryContext>
        </section>
      </main>
    )
  }
}



function mapStateToProps(state) {
  return {
    venue:  state.venue,
    photos: state.photos || {}
  }
}


export default connect(mapStateToProps, { savePhoto })(ViewPhotos)
