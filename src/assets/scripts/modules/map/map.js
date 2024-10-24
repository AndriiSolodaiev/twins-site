const filterBtn = document.querySelector('#filter-button');
const filterNav = document.querySelector('.map-navigation');
if (filterBtn) {
  filterBtn.addEventListener('click', function() {
    filterNav.classList.toggle('oppened');
  });
}
export default function googleMap() {
  global.initMap = initMap;
}
// Google map start
async function func() {
  const script = document.createElement('script');
  let key = 'AIzaSyCaYQ83EA9peTsEI6ih6cUc6uaCjn080qE';
  // if (window.location.href.match(/localhost/)) key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&language=ua`;
  document.getElementsByTagName('head')[0].appendChild(script);
}

// setTimeout(func, 1000);
const maps = document.querySelectorAll('.map');
const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

maps.forEach(image => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);
        func();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});
// eslint-disable-next-line no-unused-vars
function initMap() {
  const gmarkers1 = [];
  // const center = {
  //   lat: 49.2281012,
  //   lng: 28.3925433,
  // };
  const center = {
    lat: 49.2330266,
    lng: 28.3977645,
  };

  const choosedCategories = new Set();
  choosedCategories.add('main');
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: 'ua',
    styles: getMapTheme(),
  });
  window.googleMap = map;
  const filterMarkers = function(category, categoriesArray) {
    gmarkers1.forEach(el => {
      if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach(item => {
    item.addEventListener('click', evt => {
      evt.stopImmediatePropagation();
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers('main', choosedCategories);
    });
  });
  var baseFolder = '/wp-content/themes/3d/assets/images/map/';
  var defaultMarkerSize = new google.maps.Size(56, 90);
  var buildLogoSize = new google.maps.Size(82, 82);
  if (document.documentElement.clientWidth < 1600) {
    var defaultMarkerSize = new google.maps.Size(46, 80);
    var buildLogoSize = new google.maps.Size(82, 82);
  }
  const markersAdresses = {
    main: `${baseFolder}main.png`,
    mall: `${baseFolder}mall.svg`,
    park: `${baseFolder}park.svg`,
    pharmacy: `${baseFolder}pharmacy.svg`,
    restaurant: `${baseFolder}restaurant.svg`,
    school: `${baseFolder}school.svg`,
    sport: `${baseFolder}sport.svg`,
    supermarket: `${baseFolder}supermarket.svg`,
    drivingSchool: `${baseFolder}driving-school.svg`,
    post: `${baseFolder}post.svg`,
    aquapark: `${baseFolder}aquapark.svg`,
    petrolStation: `${baseFolder}petrol-station.svg`,
    busStop: `${baseFolder}bus-stop.svg`,
    carWashing: `${baseFolder}car-washing.svg`,
  };
  const markersData = [
    {
      type: 'main',
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
      position: { lat: 49.2281991, lng: 28.3926229 },
      text: 'ЖК Twins м. Вінниця, вул. Келецька, 123-А',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.2300049, lng: 28.3949817 },
      text: 'Школа «Гарант» - вулиця Келецька, 126а, Вінниця, Вінницька область, Украина, 21029',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.2314283, lng: 28.3996741 },
      text: 'Школа #35  - вулиця Миколи Ващука, 10, Вінниця, Вінницька область, Украина, 21029',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.2322123, lng: 28.4038258 },
      text:
        'Школа мистецтв «Вишенька» - вулиця Василя Порика, 28б, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.2310605, lng: 28.3956916 },
      text:
        'Дитячий садочок «ДивоСвіт» - вулиця Стельмаха, 43Б, Вінниця, Вінницька область, Украина, 21000',
    },

    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.2251329, lng: 28.4066378 },
      text: 'Школа #25 - вулиця Келецька, 89, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.2285897, lng: 28.3999452 },
      text:
        'Дитячий садочок #72 - вулиця Миколи Ващука, 19, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.2249041, lng: 28.4019813 },
      text:
        'Дитячий садочок #74 - вулиця Андрія Первозванного, 68, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.2287781, lng: 28.404579 },
      text:
        'Дитячий садочок #59 - вулиця Воїнів-Інтернаціоналістів, 16, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.2237371, lng: 28.4082318 },
      text: 'Дитячий садочок #61 - проспект Юності, 30, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.228309, lng: 28.3986663 },
      text: 'Аптека «Конекс» - вулиця Келецька, 122а, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.2294067, lng: 28.3992772 },
      text: 'Аптека «Бажаю Здоровʼя» - вул. Ващука, Миколи, 14, Вінниця, Украина, 21029',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.2326766, lng: 28.4070526 },
      text:
        'Центр сімейної медицини «MedSun» - Політехнічна, 2-Р, Вінниця, Вінницька область, Украина, 21021',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.2303219, lng: 28.3976451 },
      text:
        'Медичний центр «Med Ok» - вулиця Миколи Ващука, 20 Б, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.2270311, lng: 28.4060666 },
      text:
        'Реабілітаційний центр «AXIS» - вулиця Келецька, 102, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.227266, lng: 28.4104279 },
      text:
        'Медичний центр «Моє Здоровʼя»- проспект Юності, 16 б, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.2353587, lng: 28.4142731 },
      text:
        'Вінницька городська больница #1 - Хмельницьке шосе, 92, Вінниця, Вінницька область, Украина, 21000',
    },

    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.2275383, lng: 28.3960388 },
      text: 'ТЦ «Plaza Park» - вулиця Келецька, 121, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.2283057, lng: 28.3987288 },
      text: 'Ринок «Вишенька» - вулиця Келецька, 122А, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.2380241, lng: 28.4053917 },
      text: 'ТОЦ The Mall - Хмельницьке шосе, 114 В, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.2377707, lng: 28.3968372 },
      text: 'Епіцентр - Хмельницьке шосе, 1-А, Зарванці, Вінницька область, Украина, 21000',
    },
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.2365947, lng: 28.3986128 },
      text: 'Metro - Хмельницьке шосе, 1 0, 5 KM, Вінниця, Вінницька область, Украина, 23223',
    },
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.2271173, lng: 28.4106755 },
      text: 'ТРЦ S)Mall - проспект Юності, 18, Вінниця, Вінницька область, Украина, 21021',
    },
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.2260513, lng: 28.4125869 },
      text: 'ТРЦ Магігранд - вулиця Келецька, 78 В, Вінниця, Вінницька область, Украина, 21000',
    },

    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.2330792, lng: 28.3934522 },
      text: 'Ресторан Oasis - вулиця Рибацька, Зарванці, Вінницька область, Украина, 23223',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.2377025, lng: 28.4043489 },
      text:
        'McDonalds біля ТОЦ The Mall - Хмельницьке шосе, 114, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.2274345, lng: 28.3952053 },
      text: 'Ресторан Червоний Цепелін (в Плаза Парк) ',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.2268139, lng: 28.407486 },
      text:
        'Ресторан «Теревені» - вулиця Келецька, 100, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.2209018, lng: 28.411136 },
      text:
        'Ресторан «Cherry Lake» - проспект Юності, 77, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.2260108, lng: 28.4126193 },
      text:
        'McDonalds біля ТРЦ Магігранд - проспект Юності, 43-А, Вінниця, Вінницька область, Украина, 21030',
    },
    {
      type: 'park',
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 41.737285, lng: 44.7132783 },
      text: 'Sapori Veri - Ірпінь, вул. Університетська, 20',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.2314161, lng: 28.4046034 },
      text: 'Басейн «Маяк» - вулиця Василя Порика, 28, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.2274522, lng: 28.3959631 },
      text:
        'Тренажерний зал Fitness House - вулиця Келецька, 121, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.2304731, lng: 28.3969808 },
      text:
        'Тренажерний зал Top Gym - вулиця Миколи Ващука, 20, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.2261373, lng: 28.4124733 },
      text:
        'Тренажерний зал GBS Level - вулиця Келецька, 78В, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.2310438447, lng: 28.3984194647 },
      text: 'Стадіон - вулиця Миколи Ващука, 10, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'supermarket',
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 49.2270689, lng: 28.3960066 },
      text: 'Супермаркет Сільпо - вулиця Келецька, 121, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'supermarket',
      icon: { url: markersAdresses.supermarket, scaledSize: defaultMarkerSize },
      position: { lat: 49.2377347, lng: 28.4056058 },
      text: 'Супермаркет АТБ - Хмельницьке шосе, 114в, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'drivingSchool',
      icon: { url: markersAdresses.drivingSchool, scaledSize: defaultMarkerSize },
      position: { lat: 49.22865449, lng: 28.3956975 },
      text:
        'Автошкола на Вишеньці - вулиця Келецька, 130а, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.2274522, lng: 44.7146424 },
      text: 'Стадіон - вулиця Миколи Ващука, 10, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'aquapark',
      icon: { url: markersAdresses.aquapark, scaledSize: defaultMarkerSize },
      position: { lat: 49.2315055, lng: 28.4046839 },
      text:
        'Аквапарк «Маяк» - вулиця Василя Порика, 28, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'post',
      icon: { url: markersAdresses.post, scaledSize: defaultMarkerSize },
      position: { lat: 49.2319754, lng: 28.4019622 },
      text: 'НоваПошта #23 - Порика, Василя, 46, Вінниця, Вінницька область, Украина, 21021',
    },
    {
      type: 'busStop',
      icon: { url: markersAdresses.busStop, scaledSize: defaultMarkerSize },
      position: { lat: 49.2370253, lng: 28.4041529 },
      text:
        'Західний Автовокзал - Хмельницьке шосе, 107, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'petrolStation',
      icon: { url: markersAdresses.petrolStation, scaledSize: defaultMarkerSize },
      position: { lat: 49.2314095, lng: 28.4056734 },
      text: 'АЗС «WOG» - вулиця Василя Порика, 28, Вінниця, Вінницька область, Украина, 21034',
    },
    {
      type: 'petrolStation',
      icon: { url: markersAdresses.petrolStation, scaledSize: defaultMarkerSize },
      position: { lat: 49.2384907, lng: 28.4002884 },
      text: 'АЗС OKKO - Хмельницьке ш., 107-В, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'carWashing',
      icon: { url: markersAdresses.carWashing, scaledSize: defaultMarkerSize },
      position: { lat: 49.230228, lng: 28.3908037 },
      text: 'Автомийка Бастіон - вулиця Келецька, 125, Вінниця, Вінницька область, Украина, 21000',
    },
    {
      type: 'carWashing',
      icon: { url: markersAdresses.carWashing, scaledSize: defaultMarkerSize },
      position: { lat: 49.23336724213077, lng: 28.394595164707443 },
      text: 'Автомийка Clean Up - 1 км Барського шосе, Вінниця, Вінницька область, Украина, 21010',
    },
  ];
  /* beautify preserve:end */
  const infowindow = new google.maps.InfoWindow({
    text: '',
    maxWidth: 300,
  });
  markersData.forEach(marker => {
    const category = marker.type;
    const mapMarker = new google.maps.Marker({
      map,
      category,
      animation: google.maps.Animation.DROP,
      zIndex: marker.zIndex || 1,
      icon: marker.icon,
      cursor: 'grap', // курсор при наведении на макркер жк
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
    });

    google.maps.event.addListener(mapMarker, 'click', function() {
      infowindow.setContent(marker.text);
      infowindow.open(map, mapMarker);
      map.panTo(this.getPosition());
    });

    mapMarker.name = marker.type;
    gmarkers1.push(mapMarker);
  });
}

// window.addEventListener("load", () => {
// const legend = document.querySelector("[data-accordeon]");
// const legendTitle = document.querySelector(".infrastructure-markers__btn");
// const openedMarker = document.querySelector(".infrastructure-markers__btn svg");
// const markersHeight = getComputedStyle(
//   document.querySelector(".infrastructure-markers__ul")
// ).height;
// if (document.documentElement.clientWidth < 575) {
//     legend.classList.remove("opened");
//     gsap.timeline().fromTo(legend, { y: 0 }, { y: markersHeight });
//     gsap.timeline().fromTo(legendTitle, {y: 0}, {y: markersHeight});
// }

// legendTitle.addEventListener("click", () => {
//   const legendWrapper = document.querySelector('.infastructure-markers__wrapper');
//   legend.classList.toggle('opened');
//   openedMarker.classList.toggle('rotate');
//   if (legend.classList.contains("opened")) {
//     legendWrapper.classList.remove('closed');
//     gsap.timeline().fromTo(legend, { y: markersHeight }, { y: 0 });
//     gsap.timeline().fromTo(legendTitle, {y: markersHeight}, {y: 0});
//   } else {
//     legendWrapper.classList.add('closed')
//     gsap.timeline().fromTo(legend, { y: 0 }, { y: markersHeight });
//     gsap.timeline().fromTo(legendTitle, {y: 0}, {y: markersHeight});
//   }
// });
// });

function getMapTheme() {
  return [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#424b5b',
        },
        {
          weight: 2,
        },
        {
          gamma: '1',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          weight: 0.6,
        },
        {
          color: '#545b6b',
        },
        {
          gamma: '0',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#545b6b',
        },
        {
          gamma: '1',
        },
        {
          weight: '10',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#000117',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#666c7b',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#545b6b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#424a5b',
        },
        {
          lightness: '0',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#666c7b',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2e3546',
        },
      ],
    },
  ];
}
