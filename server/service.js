import request from 'superagent';
import async from 'async';
import { cities, forecastCities, EXPORTTABLE, EXPORTTABLE2 } from './constans';

const URL = 'http://v.juhe.cn/historyWeather/weather'
const URL2 = 'http://v.juhe.cn/weather/index'

export default {
  async download(req, res) {
    try {
      const { date } = req.params
      const urls = cities.map((city) => {
        const url = `${URL}?city_id=${city.id}&weather_date=${date}&key=4400a8fb0f541e3e233d76ca7dc9e28e`;
        return url;
      });
      async.mapLimit(urls, 5, async (url, callback) => {
        const result = (await request(url)).body.result;
        callback(null, result);
      }, (err, results) => {
        if (err) {
          res.send({
            result: false,
            reason: '请求失败，请联系QQ: 498127119',
          });
        } else {
          const weatherList = results.map(data => `${data.city_name},${data.weather_date},${data.day_temp},${data.night_temp},`
            + `${data.day_weather},${data.night_weather}`);
          weatherList.unshift(EXPORTTABLE);
          const rawCSV = weatherList.join('\n')
          res.set('Content-Description', 'File Transfer')
          res.set('Content-Type', 'application/csv; charset=utf-8')
          res.set('Content-Disposition', `attachment; filename=${date}.csv`)
          res.set('Expires', '0')
          res.set('Cache-Control', 'must-revalidate');
          res.send(rawCSV);
        }
      });
    } catch (e) {
      res.send({
        result: false,
        reason: '请求失败，请联系QQ: 498127119',
      });
    }
  },
  async downloadForecast(req, res) {
    try {
      const urls = Object.keys(forecastCities).map((key) => {
        const url = `${URL2}?cityname=${forecastCities[key]}&key=0aad7661347c25800bc94d085792ec6e`;
        return url;
      });
      async.mapLimit(urls, 5, async (url, callback) => {
        const result = (await request(url)).body.result;
        callback(null, result);
      }, (err, results) => {
        if (err) {
          res.send({
            result: false,
            reason: '请求失败，请联系QQ: 498127119',
          });
        } else {
          let citiesForecast = []
          results.forEach((data) => {
            const cityForecast = Object.keys(data.future).map(key =>
              `${data.today.city},${data.future[key].date},${data.future[key].week},${data.future[key].weather},`
              + `${data.future[key].temperature},${data.future[key].wind}`);
            citiesForecast = citiesForecast.concat(cityForecast);
          });
          citiesForecast.unshift(EXPORTTABLE2);
          const rawCSV = citiesForecast.join('\n')
          const date = new Date()
          res.set('Content-Description', 'File Transfer')
          res.set('Content-Type', 'application/csv; charset=utf-8')
          res.set('Content-Disposition', `attachment; filename=${date.toLocaleDateString()}.csv`)
          res.set('Expires', '0')
          res.set('Cache-Control', 'must-revalidate');
          res.send(rawCSV);
        }
      });
    } catch (e) {
      res.send({
        result: false,
        reason: '请求失败，请联系QQ: 498127119',
      });
    }
  },
};
