(function() {
    const lat = 37.18817;
    const lng = -3.60667;
    const mapa = L.map('mapa').setView([lat, lng ], 14);
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);


})()