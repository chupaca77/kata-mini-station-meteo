// // A toi de jouer pour cette partie :-) Happy coding !

// // Liste des villes avec leurs coordonnées
const cities = [
    { name: "Paris", lat: 48.8588897, lon: 2.3200410217200766 },
    { name: "Lyon", lat: 45.7578137, lon: 4.8320114 },
    { name: "Nantes", lat: 47.2186371, lon: -1.5541362 },
];

// On ajoute un EventListener sur le bouton OK pour récupérer la ville de l'utilisateur
document.querySelector(".city-search button").addEventListener("click", async function() {
    // On la récupère et on la "normalise" avec :
    // ==> trim : pas de coquilles à cause d'espaces blancs
    // ==> toLowerCase : pas de confusion majuscules/minuscules
    const inputValue = document.getElementById("cityInput").value.trim().toLowerCase();
    // Appel fonction pour chercher les coordonnées de la ville
    await fetchCoordinates(inputValue);
});

// Fonction asynchrone pour rechercher les coordonnées GPS d'une ville donnée
async function fetchCoordinates(cityName) {
    // On recherche la ville dans le tableau Cities
    const cityFound = cities.find(city => city.name.toLowerCase() === cityName);

    // Si la ville est trouvée dans le tableau, on affiche ses coordonnées
    if (cityFound) {
        // La page update le nom de la ville + coordonnées
        document.getElementById("city").textContent = cityFound.name;
        document.getElementById("gps").textContent = `Latitude : ${cityFound.lat}, Longitude : ${cityFound.lon}`;

        // Appel fonction pour récupérer la température en utilisant les coordonnées GPS
        await fetchWeather(cityFound.lat, cityFound.lon);
    } else {
        // Si la ville n'est pas trouvée, message pour informer l'utilisateur
        document.getElementById("city").textContent = "Ville non trouvée";
        document.getElementById("gps").textContent = "";
        document.getElementById("temperature").textContent = "-°C";
    }
}

// Fonction async "promise" ligne 32
async function fetchWeather(lat, lon) {

    try {
        // URL de l'API météo qui prend en compte les coordonnées de latitude et longitude
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;
        // On envoie la request à l'API et on attend la réponse
        const response = await fetch(apiUrl);
        // On récupère la réponse format JSON
        const data = await response.json();
        // On update la page avec la température actuelle
        document.getElementById("temperature").textContent = `${data.current.temperature_2m}°C`;
    } catch (error) {
        // Si problèmes réseau ou API, message Error dans la console
        // Update qui signale l'erreur
        document.getElementById("temperature").textContent = "Erreur";
        console.error("Erreur API météo:", error);
    }
}
  