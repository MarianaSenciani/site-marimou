const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./cvData.json', 'utf8')).pt;

fetch('http://localhost:3000/api/translate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(translations => {
  const finalData = {
    pt: data,
    en: translations.en,
    es: translations.es
  };
  fs.writeFileSync('./fullCV.json', JSON.stringify(finalData, null, 2));
  console.log("Translation done");
})
.catch(console.error);
