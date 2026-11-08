let pictures = [
  {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Endeavour_docked_to_ISS.jpg/3840px-Endeavour_docked_to_ISS.jpg",
    caption: "Endeavour docked at ISS during the STS-134 mission"
  },
  {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/STS-130_launch.jpg/1920px-STS-130_launch.jpg",
    caption: "Space Shuttle Endeavour launches from Kennedy Space Center, 8 Feb 2010."
  },

  {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Apollo_11_first_stage_separation.jpg",
    caption: "Apollo 11 S-IC separation"
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Tranquility-node3-move.JPG",
    caption: "Tranquility during its move from Endeavour to the install position on the Unity node."
  },
  {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Under_the_Pines_PMA%2815%29_%2816982300531%29.jpg/3840px-Under_the_Pines_PMA%2815%29_%2816982300531%29.jpg",
    caption: "Under the Pines, Evening, Claude Monet, 1888"
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Pissarro_-_the-pine-trees-of-louveciennes-1870.jpg",
    caption: "The Pine Trees of Louveciennes, Camille Pissarro, 1870"
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/86/Les-bourgeois-de-Calais.jpg",
    caption: "The Burghers of Calais, Memorial Court, Stanford University"
  },

  {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Saturn_V%2C_S-II_Stage_is_Lifted_into_Test_Stand_-_GPN-2000-000540.jpg",
    caption: "An S-II stage hoisted onto the A-2 test stand at the Mississippi Test Facility"
  },

  {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/18/STS-120_EVA_Scott_Parazynski.jpg",
    caption: "Scott E. Parazynski performs a repair of a torn solar panel"
  }
];

let current = 0;

function changePicture() {
  current = (current + 1) % pictures.length;

  document.getElementById("secretPicture").src =
    pictures[current].url;

  document.getElementById("pictureCaption").textContent =
    pictures[current].caption;
}
