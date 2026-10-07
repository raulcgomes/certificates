async function loadCertificates() {
  const response = await fetch("certificates.json");
  const certificates = await response.json();

  document.getElementById("count").textContent =
    `${certificates.length} certificate${certificates.length === 1 ? "" : "s"}`;

  const grid = document.getElementById("certificates");

  certificates
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((cert) => {
      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <button class="preview view-certificate" type="button" data-image="${cert.image}" data-title="${cert.title}" aria-label="View ${cert.title} certificate">
          <img src="${cert.image}" alt="${cert.title} certificate">
        </button>
        <div class="content">
          <div class="type">${cert.type}</div>
          <h3>${cert.title}</h3>
          <p class="subtitle">${cert.subtitle}</p>
          <div class="meta">
            <span>${cert.issuer}</span>
            <span>${cert.date} · ${cert.duration}</span>
            <span>${cert.location}</span>
          </div>
          <button class="button view-certificate" type="button" data-image="${cert.image}" data-title="${cert.title}">
            View Certificate →
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

  const modal = document.getElementById("certificate-modal");
  const modalImage = document.getElementById("certificate-modal-image");
  const modalTitle = document.getElementById("certificate-modal-title");

  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".view-certificate");
    if (!button) return;

    modalImage.src = button.dataset.image;
    modalImage.alt = `${button.dataset.title} certificate`;
    modalTitle.textContent = button.dataset.title;
    modal.showModal();
  });

  modal.querySelector(".certificate-modal__close").addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  modal.addEventListener("close", () => {
    modalImage.removeAttribute("src");
  });
}

loadCertificates().catch((error) => {
  document.getElementById("certificates").innerHTML =
    "<p>Unable to load certificates.</p>";
  console.error(error);
});
