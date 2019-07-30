// LIsten to  for submit
document.querySelector("#zipForm").addEventListener("submit", getLocation);
// Listen for delete
document.querySelector("body").addEventListener("click", deleteLocation);
function getLocation(e){
	
     // Get zip value from input
     const zip = document.getElementById('zip').value
    
    // Make request
    fetch(`http://api.zippopotam.us/tr/${zip}`)
      .then( response => {
      	if(response.status !=200){
      		showIcon('remove');
      		document.getElementById('output').innerHTML =
      		`
      		<article class="message message-body is-danger">
      		 <div class = "message-body">
             Invalid postal code , please try again
             </div>
      		</article>
      		`;
      		throw Error(response.statusText);
      	} else{
      		showIcon(`check`);
      		return response.json();
      	}
      })
      .then(data => {
      	// show location info
      	let output = "";
      data.places.forEach(place => {
        output += `
              <article class="message is-secondary m-bottom">
                <div class="message-header">
                  <p>Location Info</p>
                  <button class="delete"></button>
                </div>
                <div class="message-body">
                  <ul>
                    <li><strong>Place: </strong>${place["place name"]}</li>
                    <li><strong>City: </strong>${place["state"]}</li>
                    <li><strong>Longitude: </strong>${place["longitude"]}</li>
                    <li><strong>Latitude: </strong>${place["latitude"]}</li>
                  </ul>
                </div>
              </article>
            `;
      });
      // insert into output
      document.querySelector("#output").innerHTML = output;
      })
      .catch(err => console.log(err));



	e.preventDefault();
}
// show check or delete icon
function showIcon(icon){
	// Clear icons 
	 document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  // Show correct icon
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}


// delete location box
function deleteLocation(e){
	if(e.target.className === 'delete'){
		document.querySelector('.message').remove();
		document.querySelector('#zip').value ='';
	}
}










