const artworks = {
  pritam: [
    {
      title: "Arijit Singh Sketch",
      artist: "Pritam Das",
      year: "2023",
      image: "Arijit Sketch_Pritam.jpg"
    },
    {
      title: "Rocking Star Yash",
      artist: "Pritam Das",
      year: "2023",
      image: "Rocking Star Yash.jpg"
    },
    {
      title: "Swami Vivekananda",
      artist: "Pritam Das",
      year: "2023",
      image: "Swami Vivekanda_(my Idol).jpg"
    },
    {
      title: "A Girl",
      artist: "Pritam Das",
      year: "2024",
      image: "A Girl.jpg"
    },
    {
      title: "The Beauty and The Beast",
      artist: "Pritam Das",
      year: "2023",
      image: "The Princess.jpg"
    }
  ],
  modern: [
    {
      title: "Lord krishna and Radha",
      artist: "Unknown",
      year: "2024",
      image: "Krishna3.jpeg"
    },
    {
      title: "Lord krishna",
      artist: "Unknown",
      year: "3228 BCE.",
      image: "Krishna2.jpeg"
    },
    {
      title: "Krishna Asthetic",
      artist: "Unknown",
      year: "2022",
      image: "Krishna1.jpeg"
    }
  ],
  photography: [
    {
      title: "Raaj Bari",
      artist: "Pritam ",
      year: "2025",
      image: "photograph.jpg"
    },
     {
      title: "Beauty Before  Evening Time",
      artist: "Pritam ",
      year: "2025",
      image: "photography1.jpeg"
    },
     {
      title: "Candid",
      artist: "Pritam ",
      year: "2025",
      image: "photography2.jpeg"
    }
  ],
  classical: [{
      title: "MADHUBANI",
      artist: "Jagdamba Devi",
      year: "1975",
      image: "Classical3.jpg"
    },
    {
      title: "Ganesha and Mata Partvati",
      artist: "Jamini Roy",
      year: "1940",
      image: "classical2.jpg"
    }
  
  ],
  abstract: [
     {
      title: "Black and White",
      artist: "Madhur Dhingra ",
      year: "2025",
      image: "abstract1.jpg"
    }
  ]
};

const tabs = document.querySelectorAll(".tab");
const artworkContainer = document.getElementById("artworkContainer");
const collectionTitle = document.getElementById("collection-title");
const artCount = document.getElementById("art-count");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("artModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalArtist = document.getElementById("modalArtist");
const modalYear = document.getElementById("modalYear");
const closeModal = document.getElementById("closeModal");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

let currentCategory = "pritam";

function loadArtworks(category) {
  artworkContainer.innerHTML = "";
  collectionTitle.textContent = `${capitalize(category)} Collection`;

  const list = artworks[category] || [];

  if (list.length === 0) {
    artCount.textContent = "No artworks found.";
    artworkContainer.innerHTML = "<div class='placeholder'>No artworks in this category.</div>";
    return;
  }

  artCount.textContent = `${list.length} masterpiece${list.length > 1 ? "s" : ""} in this room`;

  list.forEach((art, index) => {
    const card = document.createElement("div");
    card.className = "card fade-in";
    card.innerHTML = `
      <img src="${art.image}" alt="${art.title}" />
      <div class="card-info">
        <h4>${art.title}</h4>
        <p>by ${art.artist}</p>
        <span class="year">${art.year}</span>
      </div>`;
    card.querySelector("img").addEventListener("click", () => openModal(art));
    artworkContainer.appendChild(card);
  });
}

function openModal(art) {
  modal.style.display = "flex";
  modalImg.src = art.image;
  modalTitle.textContent = art.title;
  modalArtist.textContent = "by " + art.artist;
  modalYear.textContent = "Year: " + art.year;
}
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentCategory = tab.dataset.category;
    loadArtworks(currentCategory);
  });
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = artworks[currentCategory].filter(
    art =>
      art.title.toLowerCase().includes(query) ||
      art.artist.toLowerCase().includes(query)
  );

  artworkContainer.innerHTML = "";
  artCount.textContent = `${filtered.length} result(s)`;

  filtered.forEach(art => {
    const card = document.createElement("div");
    card.className = "card fade-in";
    card.innerHTML = `
      <img src="${art.image}" alt="${art.title}" />
      <div class="card-info">
        <h4>${art.title}</h4>
        <p>by ${art.artist}</p>
        <span class="year">${art.year}</span>
      </div>`;
    card.querySelector("img").addEventListener("click", () => openModal(art));
    artworkContainer.appendChild(card);
  });
});

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = "🔊";
  } else {
    music.pause();
    musicToggle.textContent = "🔇";
  }
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  themeToggle.textContent = body.classList.contains("light-theme") ? "☀️" : "🌙";
});

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

loadArtworks(currentCategory);

// Play music only after first interaction
window.addEventListener('click', () => {
  if (music.paused) {
    music.play().catch(err => console.log("Autoplay failed:", err));
  }
}, { once: true });
