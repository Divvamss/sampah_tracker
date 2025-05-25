const tempatSampah = {
    lat: -0.9447315,   // Ganti dengan lokasi tempat sampah kamu
    lng: 100.3723832
};

const map = L.map('map').setView([tempatSampah.lat, tempatSampah.lng], 18);

// Tampilkan peta dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Tampilkan marker tempat sampah
L.marker([tempatSampah.lat, tempatSampah.lng]).addTo(map)
    .bindPopup("Tempat Sampah").openPopup();

// Ambil lokasi pengguna dari HP
navigator.geolocation.getCurrentPosition(function(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    // Marker lokasi pengguna
    L.marker([userLat, userLng]).addTo(map)
        .bindPopup("Lokasi Anda").openPopup();

    const jarak = getDistance(userLat, userLng, tempatSampah.lat, tempatSampah.lng);
    document.getElementById("distance").textContent = `Jarak ke tempat sampah: ${Math.round(jarak)} meter`;

    // Kalau jarak < 20 meter, pindah ke halaman edukasi
    if (jarak < 20) {
        window.location.href = "edukasi.html";
    }
});

// Hitung jarak antara 2 koordinat
function getDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371000; // Jari-jari bumi dalam meter
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}