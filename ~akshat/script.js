// let pictures = [
//   {
//     url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Endeavour_docked_to_ISS.jpg/3840px-Endeavour_docked_to_ISS.jpg",
//     caption: "Endeavour docked at ISS during the STS-134 mission"
//   },
//   {
//     url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/STS-130_launch.jpg/1920px-STS-130_launch.jpg",
//     caption: "Space Shuttle Endeavour launches from Kennedy Space Center, 8 Feb 2010."
//   },

//   {
//     url: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Apollo_11_first_stage_separation.jpg",
//     caption: "Apollo 11 S-IC separation"
//   },
//   {
//     url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Tranquility-node3-move.JPG",
//     caption: "Tranquility during its move from Endeavour to the install position on the Unity node."
//   },
//   {
//     url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Under_the_Pines_PMA%2815%29_%2816982300531%29.jpg/3840px-Under_the_Pines_PMA%2815%29_%2816982300531%29.jpg",
//     caption: "Under the Pines, Evening, Claude Monet, 1888"
//   },
//   {
//     url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Pissarro_-_the-pine-trees-of-louveciennes-1870.jpg",
//     caption: "The Pine Trees of Louveciennes, Camille Pissarro, 1870"
//   },
//   {
//     url: "https://upload.wikimedia.org/wikipedia/commons/8/86/Les-bourgeois-de-Calais.jpg",
//     caption: "The Burghers of Calais, Memorial Court, Stanford University"
//   },

//   {
//     url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Saturn_V%2C_S-II_Stage_is_Lifted_into_Test_Stand_-_GPN-2000-000540.jpg",
//     caption: "An S-II stage hoisted onto the A-2 test stand at the Mississippi Test Facility"
//   },

//   {
//     url: "https://upload.wikimedia.org/wikipedia/commons/1/18/STS-120_EVA_Scott_Parazynski.jpg",
//     caption: "Scott E. Parazynski performs a repair of a torn solar panel"
//   },
//   {
//     url:"https://upload.wikimedia.org/wikipedia/commons/9/9d/Antinous_Aristaeus_Louvre_Ma578.jpg",
//     caption: "Antinous as Aristaeus"
//   }
// ];

// let current = 0;

// function changePicture() {
//   let next;

//   do {
//     next = Math.floor(Math.random() * pictures.length);
//   } while (next === current);

//   current = next;

//   document.getElementById("secretPicture").src =
//     pictures[current].url;

//   document.getElementById("pictureCaption").textContent =
//     pictures[current].caption;
// }





// 1. List the topics you want your page to rotate through!
const keywords = [
  "NASA space exploration",
  "Jet Propulsion Laboratory",
  "Renaissance painting",
  "Apollo program",
  "Space Shuttle Endeavour",
  "Claude Monet painting",
  "Camille Pissarro painting",
  "Auguste Rodin sculpture",
  "Saturn V rocket",
  "Mars Perseverance rover"
];

let lastKeywordIndex = -1;

async function changePicture() {
  const imgEl = document.getElementById("secretPicture");
  const captionEl = document.getElementById("pictureCaption");

  // Indicate loading state
  captionEl.textContent = "Searching the archives...";
  imgEl.style.opacity = "0.6"; // Visual feedback while fetching

  try {
    // 2. Pick a random keyword from your topic list (avoid repeating the exact same one back-to-back)
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * keywords.length);
    } while (nextIndex === lastKeywordIndex && keywords.length > 1);
    
    lastKeywordIndex = nextIndex;
    const searchTopic = keywords[nextIndex];

    // 3. Search Wikimedia Commons API for images matching this topic
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTopic)}&srnamespace=6&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    const searchResults = searchData.query?.search;
    if (!searchResults || searchResults.length === 0) {
      throw new Error("No images found for topic");
    }

    // Pick a random image result from the search matches
    const randomResult = searchResults[Math.floor(Math.random() * searchResults.length)];
    const pageId = randomResult.pageid;

    // 4. Fetch the direct URL and title for the chosen image page ID
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&pageids=${pageId}&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*`;
    const infoRes = await fetch(infoUrl);
    const infoData = await infoRes.json();

    const imageInfo = infoData.query.pages[pageId].imageinfo[0];

    // 5. Update the DOM elements with the new image and clean caption
    imgEl.src = imageInfo.url;
    
    // Clean up file title for display (removes "File:" and extension like ".jpg")
    let rawTitle = randomResult.title.replace(/^File:/i, "").replace(/\.[^/.]+$/, "");
    captionEl.textContent = rawTitle;

  } catch (error) {
    console.error("Wikimedia API Error:", error);
    captionEl.textContent = "Signal lost in transmission. Click to try again!";
  } finally {
    imgEl.style.opacity = "1";
  }
}
