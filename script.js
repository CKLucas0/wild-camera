const user = "CKLucas0";
const repo = "wild-camera";
const map = "wild-camera/images";

fetch(`https://api.github.com/repos/${user}/${repo}/contents/${map}`)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(bestanden => {
    const gallery = document.getElementById("gallery");
    bestanden
      .filter(f => f.type === "file" && /\.(jpe?g|png|gif|webp|svg|avif|bmp)$/i.test(f.name))
      .forEach(f => {
        const img = document.createElement("img");
        img.src = `${map}/${encodeURIComponent(f.name)}`;
        img.alt = f.name;
        img.loading = "lazy";
        gallery.appendChild(img);
      });
  })
  .catch(err => console.error("Kon afbeeldingen niet laden:", err));