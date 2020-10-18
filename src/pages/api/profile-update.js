import logger, { levels } from '@/lib/logger';

export default (req, res) => {
  fetch('http://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token-access': 'random',
    },
    body: req.body,
  }).then(
    () => {
      res.statusCode = 200;
      res.json({});
    },
    (err) => {
      logger.log(levels.ERROR, err);
      res.statusCode = 500;
      res.json({});
    }
  );
};
