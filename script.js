const tmdbBaseUrl = "https://api.themoviedb.org/3";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const targetDiv = document.getElementById("result");

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
    } else {
      console.error(`TMDb API error: ${response.statusText}`);
      alert("Failed to fetch actors. Please try again later.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching actors:", error);
    alert("An error occurred while fetching data.");
    return [];
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
    actorsContainer.appendChild(actorDiv);
  });

  targetDiv.appendChild(actorsContainer);
};

/**
 * Handles the search button click event.
 */
const handleSearch = async () => {
  targetDiv.innerHTML = "<p>Loading...</p>";

  const actors = await getActors();
  displayActors(actors);
};

searchBtn.addEventListener("click", handleSearch);
