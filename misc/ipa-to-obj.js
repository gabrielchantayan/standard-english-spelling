
const fs = require('fs');
const main = async () => {


    let data = fs.readFileSync('ipa.txt', 'utf8');

    let lines = data.split('\n');

    let obj = {};   

    // The key is the word, the value is the IPA
    // buerger	/ˈbjuɹɡɝ/

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let parts = line.split('\t');
        let word = parts[0];
        let ipa = parts[1].split(',')[0];
        ipa = ipa.slice(1, ipa.length - 1);
        obj[word] = ipa;
    }

    fs.writeFileSync('ipa.json', JSON.stringify(obj));

}

main();