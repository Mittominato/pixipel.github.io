const content = document.querySelector(".content");
const lihatlebih = document.querySelector(".lihatlebih");
const search = document.querySelector("#search");
const cari = document.querySelector(".cari");
const galeri = document.querySelector(".galeri");
const normal = document.querySelector(".normal");
const fleksibel = document.querySelector(".fleksibel");
const downloadImage = document.querySelector(".download");
const fleksibelChild = [...document.querySelectorAll(".fleksibelChild")];
const normalChild = [...document.querySelectorAll(".normalChild")];
const tomboldownload = document.querySelector(".buttondownload");
const pilihan = [...document.querySelectorAll(".pilihan")];
let jumlah = 10;
let images = [];
let searchValue = "";

//Ganti galeri
fleksibel.addEventListener("click", () => {
    Fleksibel();
});

normal.addEventListener("click", () => {
    Normal();
});

//random
fetch(`https://pixabay.com/api/?key=30687749-55e3b1380528a1c406b03920f&editors_choice=true&per_page=10`)
.then(response => response.json())
.then(response => {
    response.hits.forEach(image => {
        let index = [...image.previewURL].indexOf("_");
        images.push(`<img class="imageContent rounded-sm mx-auto" data-iddownload="${[...image.previewURL].slice(47, index).join("")}" data-hightimage="${image.largeImageURL}" src="${image.webformatURL}" width="100%"/>`
        );
    });
    content.innerHTML = images.join("");
    download();
});

//Cari Gambar
cari.addEventListener("click", async function () {
    searchValue = search.value;
    await fetch(`https://pixabay.com/api/?key=30687749-55e3b1380528a1c406b03920f&q=${search.value}&editors_choice=true&per_page=10`)
    .then(response => response.json())
    .then(response => {
        if (response.hits.length > 0) {
            images = [];
            galeri.classList.remove("hidden");
            lihatlebih.classList.remove("hidden");
            response.hits.forEach(image => {
                let index = [...image.previewURL].indexOf("_");
                images.push(`<img class="imageContent rounded-sm mx-auto" data-iddownload="${[...image.previewURL].slice(47, index).join("")}" data-hightimage="${image.largeImageURL}" src="${image.webformatURL}" width="100%"/>`);
            });
            content.innerHTML = images.join("");
        } else {
            content.innerHTML = `<h1 class="text-xl text-center">Gambar untuk kata kunci  <span class="italic font-extrabold">${search.value}</span> tidak dapat di temukan.</h1><h2 class="text-center text-md">di rekomendasikan cari menggunakan bahasa inggris.</h2>`;
            galeri.classList.add("hidden");
            lihatlebih.classList.add("hidden");
        }
        download();
    });
});

//lihat lebih
lihatlebih.addEventListener("click", async function () {
    lihatlebih.classList.add("animate-pulse",
        "hidden");
    let newsimages = [];
    jumlah += 10;
    await fetch(`https://pixabay.com/api/?key=30687749-55e3b1380528a1c406b03920f&q=${searchValue}&editors_choice=true&per_page=${jumlah}`)
    .then(response => response.json())
    .then(response => {
        response.hits.forEach(image => {
            let index = [...image.previewURL].indexOf("_");
            newsimages.push(`<img class="imageContent rounded-sm mx-auto"  data-iddownload="${[...image.previewURL].slice(47, index).join("")}" data-hightimage="${image.largeImageURL}" src="${image.webformatURL}" width="100%"/>`);
        });
        images.push(newsimages.slice(-10).join(""));
        content.innerHTML = images.join("");
        content.addEventListener("load", () => {
            lihatlebih.classList.remove("hidden");
        })
        download();
    })
    .finally(() => {
        lihatlebih.classList.remove("animate-pulse");
    });
});

//scroll
window.onscroll = () => {
    scroll();
}
function scroll() {
    if (document.body.scrollTop > 390) {
        galeri.classList.add("fixed", "top-0", "shadow-md");
        content.classList.replace("mt-3", "mt-32");
    } else {
        galeri.classList.remove("fixed", "top-0", "shadow-md");
        content.classList.replace("mt-32", "mt-3")
    }
}

//Ganti Galeri
function Fleksibel() {
    content.classList.add("grid-cols-2");
    fleksibelChild.forEach(f => {
        f.classList.replace("bg-slate-300", "bg-slate-600");
    })
    normalChild.forEach(n => {
        n.classList.replace("bg-slate-600", "bg-slate-300");
    });
};
function Normal() {
    content.classList.remove("grid-cols-2");
    normalChild.forEach(n => {
        n.classList.replace("bg-slate-300", "bg-slate-600");
    });
    fleksibelChild.forEach(f => {
        f.classList.replace("bg-slate-600", "bg-slate-300");
    });
};

//Download
function download() {
    [...document.querySelectorAll(".imageContent")].forEach(img => {
        img.addEventListener("click", () => {
            document.querySelector(".download img").src = img.dataset.hightimage;
            document.querySelector(".download img").addEventListener("load", () => {
                document.querySelector(".download img").classList.remove("animate-pulse");
            });
            downloadImage.classList.replace("hidden", "fixed");
            tomboldownload.innerHTML = `
            <a href="https://pixabay.com/id/images/download/${img.dataset.iddownload}_640.jpg?attachment">
            <button class="low py-2 px-4 rounded-full mt-5 bg-sky-500 text-white text-sm font-bold mx-auto" type="button">Download <span class="font-semibold">- low</span></button>
            </a>
            <a href="https://pixabay.com/id/images/download/${img.dataset.iddownload}_1280.jpg?attachment">
            <button class="medium py-2 px-4 rounded-full mt-5 bg-sky-500 text-white text-sm font-bold mx-auto" type="button">Download <span class="font-semibold">- medium</span></button>
            </a>
            <a href="https://pixabay.com/id/images/download/${img.dataset.iddownload}_1920.jpg?attachment">
            <button class="hight py-2 px-4 rounded-full bg-sky-500 mt-1 text-white text-sm font-bold mx-auto" type="button">Download <span class="font-semibold">- hight</span></button>
            </a>
            <a href="https://pixabay.com/id/images/download/${img.dataset.iddownload}.jpg?attachment">
            <button class="hight py-2 px-4 rounded-full bg-sky-500 mt-1 text-white text-sm font-bold mx-auto" type="button">Download <span class="font-semibold">- ultra hight</span></button>
            </a>
            <button class="closeDownload py-2 px-32 rounded-full bg-slate-700 mt-8 mb-5 text-white font-bold text-sm mx-auto" type="button">Close</button>
            <p class="text-[.8rem] text-slate-200 italic underline mt-10 mb-5">Buat akun <a href="pixabay.com" class="font-bold text-sm">Pixabay</a> untuk mendownload gambar di <span class="font-bold text-sm">Pixipel </span> kualitas medium hingga ultra tanpa chapcha.</p>`;
            close();
        });
    });
};

//Close
function close() {
    const closeDownload = document.querySelector(".closeDownload");
    closeDownload.addEventListener("click", () => {
        downloadImage.classList.replace("fixed", "hidden");
    });
}

//Pilihan
pilihan.forEach(e => {
    e.addEventListener("click", async function() {
        searchValue = e.textContent;
        await fetch(`https://pixabay.com/api/?key=30687749-55e3b1380528a1c406b03920f&editors_choice=true&q=${e.textContent}&per_page=10`)
        .then(response => response.json())
        .then(response => {
            images = [];
            response.hits.forEach(image => {
                let index = [...image.previewURL].indexOf("_");
                images.push(`<img class="imageContent rounded-sm mx-auto" data-iddownload="${[...image.previewURL].slice(47, index).join("")}" data-hightimage="${image.largeImageURL}" src="${image.webformatURL}" width="100%"/>`
                );
            });
            content.innerHTML = images.join("");
            download();
        });
    });
});