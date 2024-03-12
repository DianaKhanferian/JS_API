/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */

/* • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
• Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
• Отобразите информацию о фотографе под изображением.
• Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
• Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, если будет показана та же самая картинка.
• Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
• Реализовать все с помощью async/await, без цепочем then. */

document.addEventListener('DOMContentLoaded', () => {
    const accessKey = '';
    const photo = document.getElementById('photo');
    const photographerName = document.getElementById('photographerName');
    const likeButton = document.getElementById('likeButton');
    const likeCount = document.getElementById('likeCount');
    const photoOfDayButton = document.getElementById('photoOfDayButton');
    const likedPhotosContainer = document.getElementById('likedPhotosContainer');

    let likes = 0;
    let likedPhotos = [];

    function getRandomPhoto() {
        fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
            .then((response) => response.json())
            .then((data) => {
                const imageUrl = data.urls.regular;
                const { name } = data.user;

                photo.src = imageUrl;
                photographerName.textContent = `Photographer: ${name}`;
            })
            .catch((error) => console.error('Error fetching random photo:', error));
    }

    function updateLikes() {
        likeCount.textContent = `Likes: ${likes}`;
    }

    function saveToLocalStorage() {
        localStorage.setItem('likes', likes.toString());
        localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
    }

    function loadFromLocalStorage() {
        const savedLikedPhotos = localStorage.getItem('likedPhotos');

        if (savedLikedPhotos) {
            likedPhotos = JSON.parse(savedLikedPhotos);

            likedPhotosContainer.innerHTML = '';

            likedPhotos.forEach((photoUrl) => {
                const likedPhoto = document.createElement('img');
                likedPhoto.src = photoUrl;
                likedPhotosContainer.appendChild(likedPhoto);
            });
        }
    }

    likeButton.addEventListener('click', () => {
        likes++;
        updateLikes();
        likedPhotos.push(photo.src);
        saveToLocalStorage();
        getRandomPhoto();
    });

    photoOfDayButton.addEventListener('click', () => {
        likedPhotosContainer.innerHTML = '';

        likedPhotos.forEach((photoUrl) => {
            const likedPhoto = document.createElement('img');
            likedPhoto.src = photoUrl;
            likedPhotosContainer.appendChild(likedPhoto);
        });
    });

    getRandomPhoto();
    loadFromLocalStorage();
});
