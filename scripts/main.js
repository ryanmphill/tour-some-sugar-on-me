import { BandList } from "./Bands.js"
import { BookingList } from "./Bookings.js"
import { VenueList } from "./Venues.js"







// Select main container in index.html
const mainContainer = document.querySelector(".container")
// Build final HTML list
const mainHTMLlist = `
<section class="bookings">
  <h3>Current Bookings</h3>
  ${BookingList()}
</section>
<div class="flex_section">
    <section class="venues">
      <h3>Venues</h3>
      ${VenueList()}
    </section>
    <section class="bands">
      <h3>Bands</h3>
      ${BandList()}
    </section>
</div>
`


// Add final HTML to the DOM
mainContainer.innerHTML = mainHTMLlist