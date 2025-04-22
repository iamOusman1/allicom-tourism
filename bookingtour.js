// HAMBURGER
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", e => {
    navLinks.classList.toggle("active");
})

//PREVIEW FUNCTION
let tour = null
document.getElementById("previewBtn").addEventListener("click", function(e) {
    e.preventDefault()
    const previewSection = document.getElementById("previewSection");

    // FORM VALUE
        const email = document.getElementById("email").value
        const tourismSite = document.getElementById("tourism-site").value
        const sex = document.getElementById("sex").value
        const firstName = document.getElementById("first-name").value
        const lastName = document.getElementById("last-name").value
        const middleName = document.getElementById("middle-name").value
        const passportExpDate = document.getElementById("passport-exp-date").value
        // const passportImage = document.getElementById("passport-image").value
        const passportNumber = document.getElementById("passport-number").value
        const phoneNumber = document.getElementById("phone-number").value

        const adults = parseInt(document.getElementById("adults").value || 0)
        const children = parseInt(document.getElementById("children").value || 0)

        // Price calculation
        const adultPrice = tour.price * adults;
        const childPrice = tour.price * 0.7 * children
        const subTotal = adultPrice + childPrice
        const vat = subTotal * 0.075
        const total = subTotal + vat

        // DISPLAY PREVIEW
        previewSection.innerHTML = ` 
            <h1 style="text-align: centre;">Preview</h1>
                <p><strong>Title:</strong> ${tour.title}</p>
                <p><strong>City:</strong> ${tour.city}</p>
                <p><strong>Country:</strong> ${tour.country}</p>
                <p><strong>Description:</strong> ${tour.description}</p>
                <p><strong>Price:</strong> NGN ${tour.price}</p>
                <p><strong>Age Limit:</strong> ${tour.age_limit}</p>
                <p><strong>Duration:</strong> ${tour.duration} hours</p>
                <p><strong>Available Days:</strong> ${tour.availability_days.map(day => day.day_of_week).join(', ')}</p>
                <p><strong>Date:</strong> ${tourDate}</p>
                <br>
                <hr>
                <h2>Price</h2>
                <p><strong>Adults:</strong> ${adults}</p>
                <p><strong>Children (s):</strong> ${children}</p>
                <p><strong>Sub Total:</strong> NGN ${subTotal.toLocaleString()}</p>
                <p><strong>Value Added Tax (7.5%):</strong> NGN ${vat.toLocaleString()}</p>
                <p><strong>Total:</strong> NGN ${total.toLocaleString()}</p>
               
                <div id="priceBreakdown" style="margin-top: 10px;"></div>
                <hr>

                <h2>Your Information</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Tourism Site:</strong> ${tourismSite}</p>
                <p><strong>Sex:</strong> ${sex}</p>
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Middle Name:</strong> ${middleName}</p>
                <p><strong>Paasport Expiration Date:</strong> ${passportExpDate}</p>
                <p><strong>Passport Number:</strong> ${passportNumber}</p>
                <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            `;
            previewSection.style.display = "block";

            const closePreviewBtn = document.createElement("button");
            closePreviewBtn.textContent = "Close Preview";
            closePreviewBtn.style.display = "block";
            closePreviewBtn.style.marginTop = "10px";
            closePreviewBtn.addEventListener("click", () => {
              previewSection.style.display = "none";
            });
            previewSection.appendChild(closePreviewBtn);
            const loadingOverlay = document.getElementById("overlay");

            function showLoading(state) {
                loadingOverlay.style.display = state ? "block" : "none";
              }
})



const urlParams = new URLSearchParams(window.location.search);
const tourId = urlParams.get("id");
const tourDate = urlParams.get("date")
console.log("Tour date from url:", tourDate)

const tourDetails = document.getElementById("tourDetails")


        // Check if we have results
        if (!tourId) {
            console.error("No tour ID found in url")
            tourDetails.innerHTML = "<p>No tour selected</p>"
        } else {
            fetch(`https://api.allicomtravels.com/tour/tourism-site/${tourId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                tour = data;
                displayTourDetails(tour)
           
            })
            .catch (error => {
                console.error('Error fetching tour details:', error);
                tourDetails.innerHTML = "<p>Could not load tour details</p>"
            })
        }

    // FUNCTION TO DISPLAY TOURS
    function displayTourDetails(tour) {
        const tourDetails = document.getElementById("tourDetails");
        
        tourDetails.innerHTML =` 
        <p><strong>Title:</strong> ${tour.title}</p>
        <p><strong>City:</strong> ${tour.city}</p>
        <p><strong>Country:</strong> ${tour.country}</p>
        <p><strong>Description:</strong> ${tour.description}</p>
        <p><strong>Price:</strong> NGN ${tour.price}</p>
        <p><strong>Age Limit:</strong> ${tour.age_limit}</p>
        <p><strong>Duration:</strong> ${tour.duration} hours</p>
        <p><strong>Available Days:</strong> ${tour.availability_days.map(day => day.day_of_week).join(', ')}</p>
        <p><strong>Date:</strong> ${tourDate}</p>

        <br>
        <hr>
        <h2>Price</h2>
        <p>Adult (s):</p> 
        <input class="tourDetails-inp" type="number" id="adults" value="1" min="0" /><br>
        <p>Child (ren):</p>
        <input class="tourDetails-inp" type="number" id="children" value="0" min="0" /><br>

        <button class="calculate" onclick="calculatePrice(${tour.price})">Calculate Price</button>

        <div id="priceBreakdown" style="margin-top: 10px;"></div>
    `;
    }


// Function to calculate price
function calculatePrice(pricePerPerson) {
    const adults = parseInt(document.getElementById("adults").value) || 0; 
    const children = parseInt(document.getElementById("children").value) || 0;
    
    const adultPrice = pricePerPerson * adults;
    const childPrice = pricePerPerson * 0.7 * children

    const subTotal = adultPrice + childPrice
    const vat = subTotal * 0.075
    const total = subTotal + vat

    const breakdown = `
        <p><strong>Sub Total:</strong> NGN ${subTotal.toLocaleString()}</p>
        <p><strong>Value Added Tax (7.5%):</strong> NGN ${vat.toLocaleString()}</p>
        <p><strong>Total:</strong> NGN ${total.toLocaleString()}</p>
    `;

    document.getElementById("priceBreakdown").innerHTML = breakdown;
}



document.getElementById('submit-btn').addEventListener('click', async(event) => {
    event.preventDefault()

    const formData = new FormData();

    formData.append("email", document.getElementById("email").value);
    formData.append("tourism_site", document.getElementById("tourism-site").value);
    formData.append("sex", document.getElementById("sex").value);
    formData.append("first_name", document.getElementById("first-name").value);
    formData.append("last_name", document.getElementById("last-name").value);
    formData.append("middle_name", document.getElementById("middle-name").value);
    formData.append("passport_expiration_date", document.getElementById("passport-exp-date").value);
    formData.append("passport_image", document.getElementById("passport-img").files[0]);
    formData.append("passport_number", document.getElementById("passport-number").value);
    formData.append("phone_number", document.getElementById("phone-number").value);

    formData.forEach((value, key) => {
        console.log(`${key}:`, value)
    })

    const headers = {
        'accept': 'application/json',
        'X-CSRFTOKEN':'TYthHWjQf9098kmwRp5dUMLQRFg6ZrOQue3n5hfwvW6hJMPiTsFyvUqSxeRFzQb6'
    }

    fetch('https://api.allicomtravels.com/tour/booking-tour/', {
        method: 'POST',
        headers: headers,
        body: formData,
    })

    .then(response => {
        if(!response.ok) {
            return response.text().then(errorText => {
            throw new Error(`Error ${response.status}: ${errorText}`);
        });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
    })
    .catch(error => {
        console.log('Error:', error);
        alert('An error occured: ' + error.message)
    })
})





async function loadTourismSite () {
    try {
        const response = await fetch('https://api.allicomtravels.com/tour/tourism-site/', {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: unable to fetch tourism sites`)
        }

        const data = await response.json();
        // console.log('API Response:', data);

        const tourismSiteSelect = document.getElementById('tourism-site');
        tourismSiteSelect.innerHTML = '';

        if (Array.isArray(data.results) && data.results.length > 0) {
        data.results.forEach(site => {
            // console.log('Adding site:', site)

            const option = document.createElement('option');
            option.value = site.id
            option.textContent = site.city
            tourismSiteSelect.appendChild(option);;
        });
    } else {
        // throw new Error('API response does not contain a valid array');
        console.error('No tourism sites found in response');
        tourismSiteSelect.innerHTML = '<option disabled selected>No sites available</option>'
    }
    } catch (error) {
        console.error('Error loading tourism:', error.message);

        const tourismSiteSelect = document.getElementById('tourism-site');
        tourismSiteSelect.innerHTML = '<option disabled selected>Error loading sites</option>'
    }
}


loadTourismSite();