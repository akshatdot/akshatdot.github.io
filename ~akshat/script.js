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

  try {
    // 1. Pick a topic
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * keywords.length);
    } while (nextIndex === lastKeywordIndex && keywords.length > 1);
    
    lastKeywordIndex = nextIndex;
    const searchTopic = keywords[nextIndex];

    // 2. Fetch search results from Wikimedia
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTopic)}&srnamespace=6&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    const searchResults = searchData.query?.search;
    if (!searchResults || searchResults.length === 0) {
      throw new Error("No images found for topic");
    }

    const randomResult = searchResults[Math.floor(Math.random() * searchResults.length)];
    const pageId = randomResult.pageid;

    // 3. Get image URL
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&pageids=${pageId}&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*`;
    const infoRes = await fetch(infoUrl);
    const infoData = await infoRes.json();

    const newSrc = infoData.query.pages[pageId].imageinfo[0].url;
    const rawTitle = randomResult.title.replace(/^File:/i, "").replace(/\.[^/.]+$/, "");

    // 4. PRELOAD THE IMAGE IN BACKGROUND BEFORE DISPLAYING
    const tempImg = new Image();
    tempImg.src = newSrc;

    // Wait until the image bytes are completely downloaded
    await tempImg.decode();

    // 5. Update BOTH image and caption at the exact same millisecond
    imgEl.src = newSrc;
    captionEl.textContent = rawTitle;

  } catch (error) {
    console.error("Wikimedia API Error:", error);
  }
}
