const tmdbBaseUrl = "https://api.themoviedb.org/3";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

/**
 * Searches for actors or actresses using the TMDb API.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of actor objects.
 *
 */
const getActors = async () => {
  const inputActor = searchInput.value;
  const actorRequestEndpoint = "/search/person?";
  const requestParams = `api_key=${TMDB_KEY}&query=${inputActor}`;
  const urlToFetch = `${tmdbBaseUrl}${actorRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const actors = jsonResponse.results;
      return actors;
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * Displays actors' photos and names in a specified div.
 *
 * @param {Array<Object>} actorsArray - The array containing actor objects.
 * @param {string} targetDivId - The ID of the div where the actors will be displayed.
 */

const displayActor


searchBtn.onclick = getActors;
