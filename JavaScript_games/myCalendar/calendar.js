let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function showCalendar() {
    const calTable = document.getElementById('calTable');
    const currentMonthElement = document.getElementById('currentMonth');
    currentMonthElement.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

    let day = 1;
    let tableContent = "<tr>";
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add days of the week header row
    tableContent += "<tr>";
    for (let i = 0; i < 7; i++) {
        tableContent += `<td>${getDayOfWeek(i)}</td>`;
    }
    tableContent += "</tr>";

    for (let i = 0; i < daysInMonth + getStartInDay(); i++) {
        if (i < getStartInDay()) {
            tableContent += "<td></td>";
        } else {
            const eventKey = `${currentYear}-${currentMonth + 1}-${day}`;
            const eventData = JSON.parse(localStorage.getItem(eventKey)) || {};
            const eventColor = eventData.color || '';

            // Add the 'event' class to represent an event, and set the background color
            const tdClass = eventColor ? 'event' : '';
            const tdStyle = eventColor ? `background-color: ${eventColor};` : '';

            tableContent += `<td class="${tdClass}" style="${tdStyle}" onclick="openPopup(${day}, '${eventColor}')">${day}</td>`;
            day++;
        }
        if (i % 7 === 6) {
            tableContent += "</tr><tr>";
        }
    }
    tableContent += "</tr>";
    calTable.innerHTML = tableContent;
}

function getDayOfWeek(dayIndex) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[dayIndex];
}

function getStartInDay() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    return firstDayOfMonth.getDay();
}
function getMonthName(monthIndex) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthIndex];
}
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    showCalendar();
}
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    showCalendar();
}
function openPopup(day, defaultColor) {
    const popup = document.getElementById('event-popup');
    const overlay = document.getElementById('overlay');
    document.getElementById("eventColor").value = defaultColor || '#000000';
    overlay.style.display = "block";
    popup.style.display = "block";
    popup.dataset.date = `${currentYear}-${currentMonth + 1}-${day}`;
}
function closePopup() {
    const popup = document.getElementById('event-popup');
    const overlay = document.getElementById('overlay');
    overlay.style.display = "none";
    popup.style.display = "none";
}
function saveEvent() {
    const popup = document.getElementById('event-popup');
    const eventKey = popup.dataset.date;
    const eventColor = document.getElementById("eventColor").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const eventTime = document.getElementById("eventTime").value;

    if (eventColor || eventDescription || eventTime) {
        const eventData = {
            color: eventColor,
            description: eventDescription,
            time: eventTime
        };
        localStorage.setItem(eventKey, JSON.stringify(eventData));

        // Update the calendar after saving the event
        showCalendar();
    } else {
        // Handle the case where all fields are empty, maybe show a message
        alert("Please fill in at least one field.");
    }

    closePopup();
    showCalendar();
}
function deleteEvent() {
    const popup = document.getElementById('event-popup');
    const eventKey = popup.dataset.date;

    // Check if there is an event to delete
    if (localStorage.getItem(eventKey)) {
        // Ask for confirmation before deleting
        const confirmDelete = confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            localStorage.removeItem(eventKey);
            showCalendar();
            closePopup();
        }
    } else {
        // Handle the case where there is no event to delete
        alert("No event to delete.");
    }
}
showCalendar();