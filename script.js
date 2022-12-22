const content = document.querySelector(".content");
const lihatlebih = document.querySelector(".lihatlebih");
const search = document.querySelector("#search");
const cari = document.querySelector(".cari");
const galeri = document.querySelector(".galeri");
const normal = document.querySelector(".normal");
const fleksibel = document.querySelector(".fleksibel");
const fleksibelChild = [...document.querySelectorAll(".fleksibelChild")];
const normalChild = [...document.querySelectorAll(".normalChild")];
let jumlah = 10;
let images = [];
let searchValue = "";



//random
fetch(`https://pixabay.com/api/?key=30687749-55e3b1380528a1c406b03920f&editors_choice=true&per_page=10`)
.then(response => response.json())
.then(response => {
    response.hits.forEach(image => {
    images.push(`<img class="contentImage rounded-sm mx-auto" src="${image.webformatURL}" width="100%"/>`
        );
});
content.innerHTML = images.join("");
});




//Cari Gambar 

cari.addEventListener("click", async function () {
    searchValue = search.value;
await fetch(`https://pixabay.com/api/?key=30687749-55e3b1380528a1c406b03920f&q=${search.value}&editors_choice=true&per_page=10`)
    .then(response => response.json())
    .then(response => {
    if(response.hits.length > 0) {
    images = [];
    galeri.classList.remove("hidden");
    lihatlebih.classList.remove("hidden");
    response.hits.forEach(image => {
    images.push(`<img class="rounded-sm mx-auto" src="${image.webformatURL}" width="100%"/>`);
});
content.innerHTML = images.join("");
    }else {
        content.innerHTML = `<h1 class="text-xl text-center">Gambar untuk kata kunci  <span class="italic font-extrabold">${search.value}</span> tidak dapat di temukan.</h1><h2 class="text-center text-md">di rekomendasikan cari menggunakan bahasa inggris.</h2>`;
        galeri.classList.add("hidden");
        lihatlebih.classList.add("hidden");
    }
});
});




//lihat lebih 
lihatlebih.addEventListener("click", async function () {
    let newsimages = [];
    jumlah+=10;
await fetch(`https://pixabay.com/api/?key=30687749-55e3b1380528a1c406b03920f&q=${searchValue}&editors_choice=true&per_page=${jumlah}`)
    .then(response => response.json())
    .then(response => {
    response.hits.forEach(image => {
    newsimages.push(`<img class="rounded-sm mx-auto hover:brightness-75" src="${image.webformatURL}" width="100%"/>`);
});
images.push(newsimages.slice(-10).join(""));
content.innerHTML = images.join("");
});
});






//scroll
window.onscroll = () => {
    scroll();
}
function scroll() {
    if(document.body.scrollTop > 390){
        galeri.classList.add("fixed","top-0","shadow-md");
        content.classList.replace("mt-3","mt-32");
    }else {
        galeri.classList.remove("fixed","top-0","shadow-md");
        content.classList.replace("mt-32","mt-3")
    }
}



//Ganti Galeri 
fleksibel.addEventListener("click", () => {
    Fleksibel();
});

normal.addEventListener("click", () => {
    Normal();
});

function Fleksibel() {
    content.classList.add("grid-cols-2");
    fleksibelChild.forEach(f => {
        f.classList.replace("bg-slate-300","bg-slate-600");
    })
    normalChild.forEach(n => {
        n.classList.replace("bg-slate-600","bg-slate-300");
    });
};

function Normal() {
    content.classList.remove("grid-cols-2");
    normalChild.forEach(n => {
        n.classList.replace("bg-slate-300","bg-slate-600");
    });
    fleksibelChild.forEach(f => {
        f.classList.replace("bg-slate-600","bg-slate-300");
    });
};