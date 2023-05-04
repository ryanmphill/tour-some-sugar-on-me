import { getBands, getBookings, getVenues } from "./database.js";

/*
Above the venue list and band name list, you should display all of the bookings 
that Samantha Ducarte has helped the bands make at each venue.

Example Booking Text:
Rocket Pumpkins are playing at The Cellar Moss on 12/13/2023

When a booking is clicked, a window alert should be presented to the user that 
displays all of the band information (name, genre, year formed, number of members).

Example Booking Alert Text:
Rocket Pumpkins
EDM
Formed in 2005
3 band members
*/

// Store copy of bookings, venues, and band arrays
const bookings = getBookings() 
const venues = getVenues()
const bands = getBands()

/* Create a function that takes in two inputs: a single booking object 
and the venues array. The function should return the venue object
for that particular booking.  */
const findBookingVenue = (bookingObject, venuesArray) => {
    // Define a default object
    let matchingVenue = {name: null}
    // Iterate through venuesArray
    for (const venue of venuesArray) {
        // Check if the primary key of venue matches the booking object foreign key
        if (venue.id === bookingObject.venueId) {
            matchingVenue = venue
        }
    }
    return matchingVenue
}

/* Create a function that takes in two inputs: a single booking object 
and the bands array. The function should return the band object
for that particular booking.  */
const findBookingBand = (bookingObject, bandsArray) => {
    // Define a default object
    let matchingBand = {name: null}
    // Iterate through bandsArray
    for (const band of bandsArray) {
        // Check if the primary key of band matches the booking object foreign key
        if (band.id === bookingObject.bandId) {
            matchingBand = band
        }
    }
    return matchingBand
}

/* Add an event listener so that when a bookings <li> is clicked, the band's name,
genre, year formed, and number of members are displayed*/
document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        // Check if booking <li> was clicked
        if (itemClicked.dataset.type === 'booking') {
            let bandInfo = `Band name: ${itemClicked.dataset.bandName}\n`
            bandInfo += `Genre: ${itemClicked.dataset.bandGenre}\n`
            bandInfo += `Year formed: ${itemClicked.dataset.bandYear}\n`
            bandInfo += `Number of members: ${itemClicked.dataset.bandMembers}`
            
            window.alert(bandInfo)
        }
    }
)

/* Define and export a function that builds an HTML list. The HTML list should
have the following data attributes: type, bandName, bandGenre, yearFormed, and
numOfBandMembers. */
export const BookingList = () => {
    // Set default value for opening HTML tag
    let HTMLlist = `<ul>`
    // Iterate through bookings array
    for (const booking of bookings) {
        // Get the matching booking
        const venueForBooking = findBookingVenue(booking, venues)
        // Get the matching band
        const bandForBooking = findBookingBand(booking, bands)
        // Append HTML
        HTMLlist += `<li data-type="booking"
        data-band-name="${bandForBooking.name}"
        data-band-genre="${bandForBooking.genre}"
        data-band-year="${bandForBooking.yearFormed}"
        data-band-members="${bandForBooking.numOfMembers}"
        >${bandForBooking.name} are playing at ${venueForBooking.name} on ${booking.bookingDate}</li>`
    }
    HTMLlist += `</ul>`
    return HTMLlist
}