/**
 * Created by wjaron on 20.02.17.
 */
var units = 'metric';
var getLocation = function (data) {
    var lat = data.lat;
    var lon = data.lon;
    var city = data.city;
    var state = data.regionName;
    var appid = "&APPID=64e9a724ade4f0b0a9eccb090c1f8725";
    url = 'http://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + lon + appid + '&units=';

getWeather = function (data) {
    var temp = data.main.temp;
    var temperatureUnit = units === 'metric' ? 'C' : 'F';
    var windUnit = units === 'metric' ? ' meters/s' : ' miles/h';
    var description = data.weather[0].description;
    var code = data.weather[0].icon;
    var wspeed = data.wind.speed;
    var html = '<img src="http://openweathermap.org/img/w/' + code + '.png" alt="Weather Icon">' + '<p> ' + Math.round(temp) + ' ' + temperatureUnit + ', ' + description + '<br> Wind Speed: ' + wspeed + windUnit + '</p><p>' + city + ', ' + state + '</p>';
    $('#weather').html(html)
    switch (temperatureUnit) {
        case 'F':
            var temps = [90, 70, 32];
            break;
        case 'C':
            temps = [32, 21, 0];
            break;
    }
    var imgs = [
        'url("img/Hot_Weather.jpg")',
        'url("img/nice-weather.jpg")',
        'url("img/autumn.jpg")',
        'url("img/Snow.jpg")'];
    if (temp >= temps[0]) {
        $('body').css('background-image', imgs[0]);
    } else if (temp < temps[0] && temp >= temps[1]) {
        $('body').css('background-image', imgs[1]);
    } else if (temp < temps[1] && temp >= temps[2]) {
        $('body').css('background-image', imgs[2]);
    } else if (temp < temps[2]) {
        $('body').css('background-image', imgs[3]);
    }
}
    $.getJSON(url + 'metric', getWeather, 'jsonp');
}

$(document).ready(function () {
    $.getJSON('http://ip-api.com/json', getLocation, 'jsonp');
    $('input[type=radio][name=temperature-units]').change(function () {
        if ($('#f').is(':checked')) {
            units = 'imperial';
        } else {
            units = 'metric';
        }
        $.getJSON(url + units, getWeather, 'jsonp');
    })
})