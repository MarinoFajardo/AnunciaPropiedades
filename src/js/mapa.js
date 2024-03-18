(function() {
    const lat = document.querySelector('#lat').value || 37.18817;
    const lng = document.querySelector('#lng').value || -3.60667;
    const mapa = L.map('mapa').setView([lat, lng ], 14);
    let marker;

    /** 
     * Uso de Provider y Geocoder
    */
    const geocodeService = L.esri.Geocoding.geocodeService();


    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    /**
     * Añadir el pin al mapa
     */
    marker = new L.marker([lat,lng],{
        draggable:true,
        autoPan:true
    }).addTo(mapa);

    /**
     * Detectar el movimiento del Pin y obtener las coordenadas
     */
    marker.on('moveend',function(event){
        marker = event.target;
        const pos = marker.getLatLng();
        mapa.panTo(new L.LatLng(pos.lat,pos.lng));

        /**
         * Obtener la información de la calle
         */
        geocodeService.reverse().latlng(pos,14).run(function(error,resultado){
            marker.bindPopup(resultado.address.LongLabel);
            /**
             * Añadir los valores del Pin al formulario de crear propiedad
             */
            document.querySelector('.calle').textContent = resultado?.address?.LongLabel ?? '';
            document.querySelector('#calle').value = resultado?.address?.Address ?? '';
            document.querySelector('#lat').value = resultado?.latlng?.lat?? '';
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';
        })
    })


})()