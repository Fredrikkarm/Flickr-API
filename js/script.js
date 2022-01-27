const key = 'a69126157ff2423df556d30b8e2f4cb3';

const button = document.querySelector('button');

button.addEventListener('click', function (event) {
    const input = document.querySelector('input');
    const input2 = document.querySelectorAll('input');
    let searchText = input.value;
    console.log(input.value);
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;

for(let i = 0; i < input2[1].value; i++){
    fetch(url).then(
        function (response) {
            //console.log(response);

            if (response.status >= 200 && response.status < 300) {
                //console.log('success');
                return response.json();

            }
            else {
                throw 'Something went wrong. :(';
            }
        }
    ).then(
        function (data) {
            //console.log(data);
            //Vi hämtar första bilden
            getImageUrl(data.photos.photo[0]);

        }
    ).catch(
        function (error) {
            console.log('something went wrong');
            //console.log(error);
            document.getElementById('error').innerText = 'Wops! did you write something in the input? you can write pretty much anything';

            //får inte detta till att funka, alltså error meddelandet kommer bara upp om input inte finns, om input2[1] är tom kommer alltså inget error
            if(input2[1].value.length == 0 ){document.getElementById('error').innerText = 'how many images do you want to showcase?'}
        }
    );
}
    clearImages();
    document.getElementById('error').innerText = '';

}); //eventlister slutar

//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject) {
    let photo = photoObject;
    let size = 'z';
    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    //console.log(imgUrl);
    displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url) {
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

//tar bort alla images renderade
function clearImages() {
    const images = document.querySelectorAll('img');
    for (const img of images) {
        img.remove();
    }
}

// function clearText() {
//     const text = document.querySelectorAll('h4');
//     for (const h4 of text) {

//     }
// }