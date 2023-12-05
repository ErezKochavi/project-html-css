function showWorldFlags() {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
        let carouselInner = document.querySelector(".carousel-inner");
        let carouselItems = '';

        for (let i = 0; i < response.data.length; i++) {
            carouselItems +=
                `<div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <img src="${response.data[i].flags.png}" class="d-block w-100 rounded" alt="${response.data[i].flags.alt}">
                </div>`;
        }

        carouselInner.innerHTML = carouselItems;
    });
}




function search() {
    let country = document.querySelector("#country").value;
    axios
        .get(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
            console.log(response.data[0])
            document.getElementById("content").innerHTML = `<h3 class="text-center text-light" >${response.data[0].name.common}</h3>
    <div class="text-center">
    <img src=${response.data[0].flags.png} alt=${response.data[0].flags.alt} class="mx-auto"/>
                </div>
    <p class="text-center text-light">${country} is Located in ${response.data[0].region}</p>
    `;
        });
};
showWorldFlags();