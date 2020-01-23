const faker = require('faker');
const service = require('../service');
const axios = require('axios');
const assert = require('assert');
const logger = require('pino')({
  prettyPrint: true,
});

const ACTIONS = Object.keys(service);

let IDS = [];

console.table(ACTIONS);

const index = 4;

async function startBot(index) {
  const params = service[ACTIONS[index]].params;
  const body = service[ACTIONS[index]].body;
  const method = service[ACTIONS[index]].method;
  const url = service[ACTIONS[index]].url;

  async function action(data, method, url) {
    logger.info(
      `method:${method}, url:${url}, data:${JSON.stringify(
        data,
      )}, IDS length: ${IDS.length}`,
    );

    const options = {
      baseURL: 'http://localhost:3000',
      url,
      method,
      data,
    };
    try {
      const res = await axios(options);
      return res.data;
    } catch (err) {
      logger.fatal('Service down', err);
      process.exit(-1);
    }
  }

  function createURL(url, params) {
    if (!params) return url;
    const id = IDS[getRandomIdIndex(IDS)];
    const newUrl = `${url}/${id}`;
    return newUrl;
  }

  function createBody(body) {
    let id;
    if (method === 'POST') {
      id = faker.random.uuid();
      IDS.push(id);
    } else {
      id = IDS[getRandomIdIndex(IDS)];
    }
    if (!body) return undefined;
    return {
      id: body.includes('id') ? id : undefined,
      name: body.includes('name') ? faker.commerce.productName() : undefined,
      price: body.includes('price')
        ? Number(faker.finance.amount())
        : undefined,
      quantyty: body.includes('quantyty') ? faker.random.number() : undefined,
    };
  }

  function getRandomIdIndex(targetArr) {
    const randomId = faker.random.number({
      min: 0,
      max: targetArr.length - 1,
    });
    assert.ok(
      IDS.length > randomId,
      `Bad index ${randomId}, IDS length: ${IDS.length}`,
    );
    return randomId;
  }

  const aData = createBody(body);
  const aUrl = createURL(url, params);

  return await action(aData, method, aUrl);
}

async function initBot() {
  const res = await startBot(4);
  IDS = res.map(e => e.id);
}

(async () => {
  await initBot();
  //TODO: start bot here, with actions running by random ms
  ACTIONS.forEach((e, index) => {
    setInterval(
      async () => {
        await startBot(index);
      },
      faker.random.number({
        min: 1000,
        max: 3000,
      }),
    );
  });
})();
