'use strict';

const list = document.querySelector('.main-list');
const selectMovie = document.querySelector('#movie');
let objectArray = [];

const render = (array) => {
    array.forEach(element => {
        const li = document.createElement('li');
        li.classList.add('card');
        li.innerHTML = `<img src=${element.photo} alt="фото"> 
        <h1>${element.name}</h1>`;
        for (let prop in element) {
            if (prop === 'photo' || prop === 'name') continue;
            li.innerHTML += (`<p>${prop[0].toUpperCase() + prop.slice(1)}: ${element[prop]}</p>`);
        }
        list.append(li);
    });
};

const toArray = (str) => {
    return str.split(',');
};

const dataSelect = () => {
    fetch('dbHeroes.json')
        .then(response => {
            return response.json();
        }).then(data => {
            data.forEach(element => {
                objectArray += element.movies + ',';
            });
            objectArray = toArray(objectArray);
            let uniq = Array.from(new Set(objectArray));

            for (let i = 0; i < uniq.length - 1; i++) {
                let opt = uniq[i];
                let optionVal = document.createElement("option");
                optionVal.textContent = opt;
                optionVal.value = opt;
                selectMovie.appendChild(optionVal);
            }
            let optionVal = document.createElement("option");
            optionVal.textContent = 'All';
            optionVal.value = 'all';
            selectMovie.appendChild(optionVal);
        })
        .catch(error => {
            console.error(error);
        });
};

dataSelect();


selectMovie.addEventListener('change', () => {
    let movie = selectMovie.options[selectMovie.selectedIndex].value;
    let filterArray = [];
    list.innerHTML = '';
    if (movie === 'all') {
        fetch('dbHeroes.json')
            .then(response => {
                return response.json();
            }).then(data => {
                render(data);
            });
    }
    fetch('dbHeroes.json')
        .then(response => {
            return response.json();
        }).then(data => {
            data.forEach(element => {
                let elementMovies = element.movies;
                for (let i = 0; i < elementMovies.length; i++) {
                    if (element.movies[i] === movie) {
                        filterArray.push(element);
                    }
                }
            });
            console.log(filterArray);
            render(filterArray);
        });
});