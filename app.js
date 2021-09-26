const wrapper=document.querySelector('.wrapper'),
      inputPart=wrapper.querySelector('.input-part'),
      infoTxt=inputPart.querySelector('.info-txt'),
      inputField=inputPart.querySelector('input'),
      locationBtn=inputPart.querySelector('button'),
      wIcon=document.querySelector('.weather-part img'),
      arrowBack=wrapper.querySelector('header i');
      let apiKey=`5f87e51fa4ad41c376c4a86636bb6c22`;
      let api;
      
    //   first step
inputField.addEventListener('keyup',(e)=>{
    if(e.key=='Enter' && inputField.value!=''){
        // console.log('hello');
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert('Sizning brouzerining geolocatsiyani support qilmaydi');
    }
});

function onSuccess(position){
    // console.log(position);
    const {latitude,longitude}=position.coords;
    console.log(latitude,longitude);
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();

}

function onError(error){
    infoTxt.innerText='Siz geolocatsiyaga rozilik bermadingiz';
    infoTxt.classList.add('error');
}
function requestApi(city){
    api=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();

}

function fetchData(){
    infoTxt.innerText='Ob-xavo ma\'lumotlari olinmoqda';
    infoTxt.classList.add('pending');
    fetch(api).then(response=>response.json()).then(data=>weatherDetails(data))

}
function weatherDetails(info){
    infoTxt.classList.replace('pending','error');
    if(info.cod=='404'){
        infoTxt.innerText=`${inputField.value} bunday shahar mavjud emas`;
    }
    else{
        const city=info.name;
        const country=info.sys.country;
        const {description,id}=info.weather[0];
        const {feels_like,humidity,temp}=info.main;

        if(id==800){
            wIcon.src='icons/clear.svg';
        }else if(id>=200 && id<=232){
            wIcon.src='icons/strom.svg';
        }else if(id>=600 && id<=622){
            wIcon.src='icons/snow.svg';
        }else if(id>=701 && id<=781){
            wIcon.src='icons/haze.svg';
        }else if(id>=801 && id<=804){
            wIcon.src='icons/cloud.svg';
        }else if((id>=300 && id<=321) || (id>=500 && id<=531)){
            wIcon.src='icons/rain.svg';
        }
        wrapper.querySelector('.temp .numb').innerText=Math.floor(temp);
        wrapper.querySelector('.weather').innerText=description;
        wrapper.querySelector('.location span').innerText=`${city},${country}`;
        wrapper.querySelector('.temp .numb-2').innerText=Math.floor(feels_like);
        wrapper.querySelector('.humidity span').innerText=`${humidity}%`;

        inputField.value='';
        infoTxt.classList.remove('pending','error');
        wrapper.classList.add('active');
    }
    console.log(info);
}

arrowBack.addEventListener('click',()=>{
    wrapper.classList.remove('active');
})