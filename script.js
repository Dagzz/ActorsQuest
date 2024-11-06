const tmdbBaseUrl = "https://api.themoviedb.org/3";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const targetDiv = document.getElementById("result");
const actorDetailsDiv = document.getElementById("actor-details");

/**
 * Searches for actors or actresses using the TMDb API.
 * @returns {Promise<Array<Object>>}
 */
const getActors = async () => {
  const inputActor = searchInput.value.trim();

  if (inputActor === "") {
    alert("Please enter an actor's name.");
    return [];
  }

  const actorRequestEndpoint = "/search/person?";
  const requestParams = `api_key=${TMDB_KEY}&query=${encodeURIComponent(
    inputActor
  )}`;
  const urlToFetch = `${tmdbBaseUrl}${actorRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.results;
    }
  } catch (error) {
    console.error("Error fetching actors:", error);
    return [];
  }
};

/**
 * Search actor's informations by his name
 *
 * @param {string} actorName name of the actor we want to search
 * @returns {Object|undefined} An object with the actor's informations
 */
const getActor = async (actorName) => {
  const actorRequestEndpoint = "/search/person?";
  const requestParams = `api_key=${TMDB_KEY}&query=${actorName}`;
  const urlToFetch = `${tmdbBaseUrl}${actorRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.results[0];
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Displays actors' photos and names in a specified div.
 *
 * @param {Array<Object>} actorsArray
 */
const displayActors = (actorsArray) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const defaultImage = "assets/default.png";

  targetDiv.innerHTML = "";

  if (actorsArray.length === 0) {
    targetDiv.innerHTML =
      "<p>No actors found. Please try a different search.</p>";
    return;
  }

  const actorsContainer = document.createElement("div");
  actorsContainer.classList.add("actors-container");

  actorsArray.forEach((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.classList.add("actor");

    const img = document.createElement("img");
    img.src = actor.profile_path
      ? `${imageBaseUrl}${actor.profile_path}`
      : defaultImage;
    img.alt = actor.name;
    img.classList.add("actor-image");

    const name = document.createElement("p");
    name.textContent = actor.name;
    name.classList.add("actor-name");

    actorDiv.appendChild(img);
    actorDiv.appendChild(name);
    actorDiv.addEventListener("click", () => handleActorClick(actor.name));
    actorsContainer.appendChild(actorDiv);
  });

  targetDiv.appendChild(actorsContainer);
};

/**
 * Display actor's profile in a specified div
 *
 * @param {string} actorName - Name of the actor required
 */
const displayActorDetails = async (actorName) => {
  actorDetailsDiv.innerHTML = "<p>Loading actor details...</p>";

  const actor = await getActor(actorName);
  if (!actor) {
    actorDetailsDiv.innerHTML =
      "<p>Actor details not found. Please try again.</p>";
    return;
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const defaultImage = "assets/default.png";

  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("actor-details-container");

  const img = document.createElement("img");
  img.src = actor.profile_path
    ? `${imageBaseUrl}${actor.profile_path}`
    : defaultImage;
  img.alt = actor.name;
  img.classList.add("actor-detail-image");

  const name = document.createElement("h2");
  name.textContent = actor.name;
  name.classList.add("actor-detail-name");

  const knownFor = document.createElement("p");
  knownFor.textContent = actor.known_for
    ? `Known for: ${actor.known_for
        .map((item) => item.title || item.name)
        .join(", ")}`
    : "Known for: N/A";
  knownFor.classList.add("actor-detail-known-for");

  const popularity = document.createElement("p");
  popularity.textContent = `Popularity: ${actor.popularity}`;
  popularity.classList.add("actor-detail-popularity");

  detailsContainer.appendChild(img);
  detailsContainer.appendChild(name);
  detailsContainer.appendChild(knownFor);
  detailsContainer.appendChild(popularity);

  actorDetailsDiv.innerHTML = "";
  actorDetailsDiv.appendChild(detailsContainer);
};

/**
 * Handle click on an actor div
 *
 * @param {string} actorName
 */
const handleActorClick = (actorName) => {
  displayActorDetails(actorName);
};

/**
 * Handle click on the search Button
 */
const handleSearch = async () => {
  targetDiv.innerHTML = "<p>Loading...</p>";
  actorDetailsDiv.innerHTML = "";

  const actors = await getActors();
  displayActors(actors);
};

searchBtn.addEventListener("click", handleSearch);
