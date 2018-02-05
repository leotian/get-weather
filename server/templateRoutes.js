import express from 'express';
import axios from 'axios';

const router = express.Router()

router.get('/',  async (req, res) => {
  if (__IS_DEVELOPMENT__) {
    const ret = await axios({
      method: 'get',
      url: 'http://localhost:8080/index.html/#/',
    })
    res.send(ret.data);
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.sendfile(`${process.cwd()}/dist/index.html`);
  }
})

export default router;
