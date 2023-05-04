import { getBands, getBookings, getVenues } from "./database.js";
/*
Tour Venues
At the bottom of the page, the name of each venue should be displayed in 
a bulleted list.
When a venue name is clicked, a window alert should be presented to the 
user that displays all of the bands that have booked the venue.
*/

// Invoke getter functions and store the needed arrays of objects into variables

const venues = getVenues()
const bookings = getBookings()
const bands = getBands()

/* Create a function to find bookings with 2 parameters - one for the selected venue id, and
one for the array of bookings objects. The function should return an array of 
the booking objects for a particular venue  */

const findVenueBookings = (clickedVenueId, bookingsArray) => {
    // Define a default array
    let venueBookings = []
    // Iterate through the bookingsArray
    for (const booking of bookingsArray) {
        // Check if the foreign key in the booking matches the clickedVenueId
        if (`${booking.venueId}` === clickedVenueId) {
            venueBookings.push(booking)
        }
    }
    return venueBookings
}

/* Creat a function whose job it is to take the returned array from 
findVenueBookings, and return an array of the band names with a matching foreign key */

const findBands = (clickedVenueBookings, bandsArray) => {
    // Define a default array
    let bookedBands = []
    // Iterate through bookings
    for (const booking of clickedVenueBookings) {
        // Iterate through bandsArray
        for (const band of bandsArray) {
            // Check if band primary key matches foreign key
            if (booking.bandId === band.id) {
                bookedBands.push(band.name)
            }
        }
    }
    return bookedBands
}

/* Add an event listener so that when a venue <li> is clicked, all the bands 
playing there are displayed*/

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        // Was a venue list item clicked?
        if (itemClicked.dataset.type === `venue`) {
            // Store clicked venue id
            let clickedVenueId = itemClicked.dataset.id
            // Store clicked venue name
            let clickedVenueName = itemClicked.dataset.name
            // Invoke and store the findBookings function as venueBookings
            const venueBookings = findVenueBookings(clickedVenueId, bookings)
            // Invoke and store the findBands function and bandsPlaying
            const bandsPlaying = findBands(venueBookings, bands)
            //Define a default string
            let bandsMessage = ``
            // Check if one band is playing
            if (bandsPlaying.length === 1) {
                bandsMessage = `${bandsPlaying[0]}`
            }
            // Check if two bands are playing
            if (bandsPlaying.length === 2) {
                bandsMessage = `${bandsPlaying[0]} and ${bandsPlaying[1]}`
            }
            // Check if multiple bands are playing
            if (bandsPlaying.length > 2) {
                // Iterate throught bandsPlaying
                for (let index = 0; index < bandsPlaying.length; index++) {
                    if(index < bandsPlaying.length - 1) {
                        // Add all bands to string except the last
                        bandsMessage += `${bandsPlaying[index]}, `
                    } else { // Add the last band
                        bandsMessage += `and ${bandsPlaying[index]}`
                    }
                }   
            }
            // Append end of band message
            bandsMessage += ` will be playing at ${clickedVenueName}`
            // Check if no bands are playing
            if (bandsPlaying.length === 0) {
                bandsMessage = `No bands are currently booked to play at ${clickedVenueName}`
            }
            // Print alert message
            window.alert(bandsMessage)   
        }  
    }
)




// Export a function that converts venue names to HTML
export const VenueList = () => {
    // Set a default html string with an <ul> tag
    let HTMLlist = `<ul>`
    // Iterate through the venues array
    for (const venue of venues) {
        HTMLlist += `<li data-type="venue"
        data-name="${venue.name}"
        data-id="${venue.id}"
        >${venue.name}</li>`
    }
    HTMLlist += `</ul>`

    return HTMLlist
}

