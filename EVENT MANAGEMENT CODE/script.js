document.addEventListener("DOMContentLoaded", function () {
    const eventForm = document.getElementById("eventForm");
    const eventList = document.getElementById("eventList");

    eventForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const eventName = document.getElementById("event_name").value;
        const eventDate = document.getElementById("event_date").value;
        const eventLocation = document.getElementById("event_location").value;

        const eventData = {
            name: eventName,
            date: eventDate,
            location: eventLocation
        };

        fetch("/create_event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            addEventToList(data);
            eventForm.reset();
        });
    });

    function addEventToList(event) {
        const eventItem = document.createElement("li");
        eventItem.innerHTML = `
            <strong>${event.name}</strong><br>
            Date: ${event.date}<br>
            Location: ${event.location}
        `;
        eventList.appendChild(eventItem);
    }

    // Load events on page load
    fetch("/events")
        .then(response => response.json())
        .then(data => {
            data.forEach(event => {
                addEventToList(event);
            });
        });
});
