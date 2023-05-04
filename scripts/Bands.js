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
const venues = getVenues()

/* Create a function to find bookings with 2 parameters - one for the selected band id, and
one for the array of bookings objects. The function should return an array of 
the booking objects for a particular band  */

const findBandBookings = (clickedBandId, bookingsArray) => {
    // Define a default array
    let bandBookings = []
    // Iterate through the bookingsArray
    for (const booking of bookingsArray) {
        // Check if the foreign key in the booking matches the clickedBandId
        if (`${booking.bandId}` === clickedBandId) {
            bandBookings.push(booking)
        }
    }
    return bandBookings
}

/* Creat a function whose job it is to take the returned array from 
findBandBookings, and return an array of the Venue names with a matching foreign key */

const findVenues = (clickedBandBookings, venuesArray) => {
    // Define a default array
    let bookedVenues = []
    // Iterate through bookings
    for (const booking of clickedBandBookings) {
        // Iterate through venuesArray
        for (const venue of venuesArray) {
            // Check if venue primary key matches foreign key
            if (booking.venueId === venue.id) {
                bookedVenues.push(venue.name)
            }
        }
    }
    return bookedVenues
}

/* Add an event listener so that when a band <li> is clicked, all the venues
the band has booked are displayed*/

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        // Was a band list item clicked?
        if (itemClicked.dataset.type === `band`) {
            // Store clicked band id
            let clickedBandId = itemClicked.dataset.id
            // Store clicked band name
            let clickedBandName = itemClicked.dataset.name
            // Invoke and store the findBandBookings function as bandBookings
            const bandBookings = findBandBookings(clickedBandId, bookings)
            // Invoke and store the findVenues function as venuesBooked
            const venuesBooked = findVenues(bandBookings, venues) // = ['venueName', 'venueName', ...]
            //Define a default string
            let venuesPlayingAt = `${clickedBandName} `
            // Check if band is playing at 1 venue
            if (venuesBooked.length === 1) {
                venuesPlayingAt += `have a show booked at ${venuesBooked[0]}`
            }
            // Check if band is playing at 2 venues
            if (venuesBooked.length === 2) {
                venuesPlayingAt += `have shows booked at ${venuesBooked[0]} and ${venuesBooked[1]}`
            }
            // Check if band is playing at multiple venues
            if (venuesBooked.length > 2) {
                venuesPlayingAt += `have shows booked at `
                // Iterate throught venuesBooked
                for (let index = 0; index < venuesBooked.length; index++) {
                    if(index < venuesBooked.length - 1) {
                        // Add all venues to string except the last
                        venuesPlayingAt += `${venuesBooked[index]}, `
                    } else { // Add the last band
                        venuesPlayingAt += `and ${venuesBooked[index]}`
                    }
                }   
            }
            // Check if no bands are playing
            if (venuesBooked.length === 0) {
                venuesPlayingAt += `do not currently have any shows booked`
            }
            // Print alert message
            window.alert(venuesPlayingAt)   
        }  
    }
)

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