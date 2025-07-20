const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchStations() {
  const { data } = await axios.get('https://en.wikipedia.org/wiki/List_of_Delhi_Metro_stations');
  const $ = cheerio.load(data);
  const stations = [];
  $('table.wikitable').first().find('tr').each((_, tr) => {
    const cells = $(tr).find('td');
    if (cells.length >= 3) {
      const name = $(cells[0]).text().trim();
      const lines = $(cells[2]).text().trim().split(',');
      lines.forEach(line => {
        stations.push({ label: name, value: name, line: line.trim() });
      });
    }
  });

  fs.writeFileSync(
    'src/data/stations.js',
    `export const metroLines = ${JSON.stringify([...new Set(stations.map(s => s.line))], null, 2)};\n` +
    `export const stations = ${JSON.stringify(stations, null, 2)};\n`
  );
}

fetchStations();
