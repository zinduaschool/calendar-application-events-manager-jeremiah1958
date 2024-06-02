// calendar.js

// Step 1: Create an array of event objects
const events = [
    {
      title: "Event 1",
      date: new Date("2024-06-01"),
      location: "Location 1",
      attendees: new Set(["Alice", "Bob"])
    },
    {
      title: "Event 2",
      date: new Date("2024-06-05"),
      location: "Location 2",
      attendees: new Set(["Charlie", "David"])
    },
    {
      title: "Event 3",
      date: new Date("2024-06-10"),
      location: "Location 3",
      attendees: new Set(["Eve", "Frank"])
    }
  ];
  
  // Step 2: Filter and map events happening in the next 7 days
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);
  
  const upcomingEvents = events.filter(event => event.date >= now && event.date <= nextWeek)
    .map(event => {
      return {
        title: event.title,
        date: event.date,
        location: event.location,
        attendees: Array.from(event.attendees)
      };
    });
  
  // Display upcoming events in console
  console.log("Upcoming events in the next 7 days:", upcomingEvents);
  
  // Step 3: Create a WeakMap to store the event's organizer
  const organizers = new WeakMap();
  events.forEach(event => {
    organizers.set(event, `${event.title} Organizer`);
  });
  
  // Display organizers in console
  console.log("Event organizers:", organizers);
  
  // Step 4: Destructure and display events in table format
  function displayEvents(events) {
    let eventDetails = '<table><tr><th>Title</th><th>Date</th><th>Location</th><th>Attendees</th></tr>';
    events.forEach(({ title, date, location, attendees }) => {
      eventDetails += `<tr><td>${title}</td><td>${date.toDateString()}</td><td>${location}</td><td>${Array.from(attendees).join(', ')}</td></tr>`;
    });
    eventDetails += '</table>';
    document.getElementById('output').innerHTML = eventDetails;
  }
  
  displayEvents(events);
  
  // Step 5: Function to add a new attendee
  function addAttendee(eventTitle, attendeeName) {
    const event = events.find(e => e.title === eventTitle);
    if (event) {
      event.attendees.add(attendeeName);
      console.log(`Added ${attendeeName} to ${eventTitle}`);
      displayEvents(events); // Update the display after adding attendee
    } else {
      console.log(`Event ${eventTitle} not found`);
    }
  }
  
  addAttendee("Event 1", "George");
  console.log("Updated Event 1 attendees:", Array.from(events.find(e => e.title === "Event 1").attendees));
  
  // Step 6: Convert event array to JSON with custom formattedDate property
  events.forEach(event => {
    event.toJSON = function() {
      return {
        ...this,
        formattedDate: this.date.toLocaleDateString("en-US"),
        attendees: Array.from(this.attendees)
      };
    };
  });
  
  const jsonString = JSON.stringify(events, null, 2);
  console.log("JSON string of events:", jsonString);
  
  // Step 7: Display properties and values of the first event
  const firstEvent = events[0];
  const firstEventDetails = `
    <h2>First Event Details</h2>
    <p>Properties: ${Object.keys(firstEvent).join(', ')}</p>
    <p>Values: ${Object.values(firstEvent).map(value => value instanceof Date ? value.toDateString() : value).join(', ')}</p>
    <p>Entries: ${Object.entries(firstEvent).map(([key, value]) => `${key}: ${value instanceof Date ? value.toDateString() : value}`).join(', ')}</p>
  `;
  document.getElementById('first-event-details').innerHTML = firstEventDetails;
  
  // Step 8: Iterate over events and log title and date
  events.forEach(event => {
    console.log(`Title: ${event.title}, Date: ${event.date.toDateString()}`);
  });
  
  // Display results in the HTML
  document.getElementById('output').innerHTML += `
    <h2>Upcoming Events in the Next 7 Days:</h2>
    <pre>${JSON.stringify(upcomingEvents, null, 2)}</pre>
    <h2>All Events in JSON Format:</h2>
    <pre>${jsonString}</pre>
  `;
  
  // Bonus: Delete events from the array using the .splice() method
  function deleteEvent(eventTitle) {
    const index = events.findIndex(event => event.title === eventTitle);
    if (index !== -1) {
      events.splice(index, 1);
      console.log(`Deleted event: ${eventTitle}`);
      displayEvents(events); // Update the display after deleting event
    } else {
      console.log(`Event ${eventTitle} not found`);
    }
  }
  
  deleteEvent("Event 2");
  console.log("Events after deletion:", events);
  
  // Bonus: Find the event with the most attendees using the .reduce() method
  const eventWithMostAttendees = events.reduce((maxEvent, currentEvent) => {
    return currentEvent.attendees.size > maxEvent.attendees.size ? currentEvent : maxEvent;
  }, events[0]);
  
  console.log("Event with the most attendees:", eventWithMostAttendees);
  