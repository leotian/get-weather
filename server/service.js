import request from 'superagent';
import async from 'async';
import { cities, EXPORTTABLE } from './constans';

const URL = 'http://v.juhe.cn/historyWeather/weather'

export default {
  async download(req, res) {
    const { date } = req.params
    const urls = cities.map((city) => {
      const url = `${URL}?city_id=${city.id}&weather_date=${date}&key=4400a8fb0f541e3e233d76ca7dc9e28e`;
      return url;
    })
    async.mapLimit(urls, 10, async (url, callback) => {
      const result = (await request(url)).body.result;
      callback(null, result);
    }, (err, results) => {
      console.log(results);
    })
    res.send({
      result: false,
    });
  },
};
