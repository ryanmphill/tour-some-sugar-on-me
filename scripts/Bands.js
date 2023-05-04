import { getBands, getBookings, getVenues } from "./database.js"

/*
Bands
At the bottom of the page, to the right of the venue list, the name of each 
band should be displayed in a bulleted list.
When a band name is clicked, a window alert should be presented to the user 
that displays all of the venue at which the band is playing.
*/

// Store bands, bookings, and venues in variables
const bands = getBands()
const bookings = getBookings()
const venues = getVenues ()

// Export a function that converts band names to HTML
export const BandList = () => {
    // Set a default html string with an <ul> tag
    let HTMLlist = `<ul>`
    // Iterate through the bands array
    for (const band of bands) {
        HTMLlist += `<li data-type="band"
        data-name="${band.name}"
        data-id="${band.id}"
        >${band.name}</li>`
    }
    HTMLlist += `</ul>`

    return HTMLlist
}