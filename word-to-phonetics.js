import fs from 'fs';


const symbol_map = [
	[/(?<=[bdgjlmnrvwyz])e?s\b/g, 'z'],
	[/(?<=[rnmx])ed/g, 'd'],
	[/sch(?![aeiou])/g, 'sk'],
	[/stion/g, 'şçın'],
	[/tion/g, 'şın'],
	[/ch(?=em)/g, 'k'],
	[/ch(?=[r])/g, 'k'],
	[/ich[ie]/g, 'ş'],
	[/ts(?!\b)/g, 'ț'],
	[/que(?=\b)/g, 'k'],
	[/que(?=[s])/g, 'k'],
	['cie', 'sī'],
	[/(?<!g)ge/g, 'džı'],
	[/(?<!\b)(?<!g)g[ei]/g, 'džı'],
	// [/^[gkm]n/g, 'n'],
	[/gh(?=[aeiou])/g, 'g'],
	[/[au]ght/g, 'ø'],
	[/j(?=[aeiou])/g, 'dž'],
	[/cia/g, 'şı'],
	[/cal(?![ekcli])/g, 'kıl'],
	[/(?<![aeiouys])ed(?=\b)/g, 'ıd'],
	[/[ea]sure/g, 'žır'],
	[/mb(?:ing)?\b/g, 'm'],
    [/(?<!i)den/g, 'dın'],
	[/rea/g, 'rī'],
    [/(?<=e)ci/g, 'sı'],
	[/c[eiy](?!o)/g, 's'],
	[/[ai]ble\b/g, 'ıbıl'],
	[/ea/g, 'e'],
	[/ch/g, 'ç'],
	[/ee/g, 'ī'],
	[/ate/g, 'eit'],
	['zh', 'ž'],
	// ['ew', 'yu'],
	['wh', 'h'],
	['sh', 'ş'],
	['ph', 'f'],
	['th', 'þ'],
	['wr', 'r'],
	['qu', 'kw'],
	[/xh?/g, 'ks'],
	// ['\bpt', 't'],
	// ['\bps', 's'],
	// ['\btm', 'm'],
	['c', 'k'],
    [/y\b/g, 'ī']
];



const rewrite_word = (word) => {

    let changes = []

    for (let i = 0; i < symbol_map.length; i++) {
        let symbol = symbol_map[i];
        let nw = word.replaceAll(symbol[0], symbol[1]);
        if (nw !== word) {
            word = nw;
            changes.push(symbol[0]);
        }
    }

    return [word, changes.join(', ')];
}

const main = () => {
    let data = fs.readFileSync('10000-words.txt', 'utf8');
    let lines = data.split('\n');
    let new_lines = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let words = line.split(' ');
        let new_words = [];
        for (let j = 0; j < words.length; j++) {
            let word = words[j];
            let nw = rewrite_word(word);
            new_words.push(`${nw[0]}\t${word}\t${nw[1]}`);
        }
        new_lines.push(new_words.join(' '));
    }
    fs.writeFileSync('words.txt', new_lines.join('\n'));
}

main();