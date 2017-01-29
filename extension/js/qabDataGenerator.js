import _ from 'lodash';

const svgHashs = [
    '6ed8a9528a114cc9818a6e2bb3893bd1',
    '08e9266742a9484b90115d29bbfa9360',
    '5b2b0a3903004b6694d8fa0db50b7f01',
    '435e49d899854561bbba999a07a11ae5',
    '5a40d0bf85a840d39b35d3ae591c839f',
    '10a62ad7b12141408fa60fb03ae6db1e',
    '24ebf2bc93984afcad837adef6a01897',
    'e0d8e7b17b5b4fefa4a0a6d937063fac',
    '70dc8c4e71214ec6b6e60f394b96e272',
    '9c9db476b9fa46a0b10f550c2ceec920',
    '6184e94276d544f09e1e2c934257c0a4',
    '3b70004d49194e2f8a10b4d311ccadd5',
    '719b6e39cb504af3abaed0ea8a05f8e6',
    '8444b626357c49eb82185eb904380c97',
    '78c178ef3f9c4e59b0afc52d852c7fa4'
];

const texts = [
    "tiger",
    "closed",
    "jazzy",
    "drop",
    "obtainable",
    "disagreeable",
    "acceptable",
    "decorate",
    "dam",
    "electric",
    "step",
    "stroke",
    "appear",
    "muddle",
    "air",
    "bottle",
    "well-made",
    "step",
    "pocket",
    "envious",
    "tired",
    "bedroom",
    "hook",
    "pine",
    "loose",
    "deceive",
    "courageous",
    "prose",
    "bad",
    "airplane",
    "rich",
    "godly",
    "twig",
    "assorted",
    "try",
    "nauseating",
    "immense",
    "unwieldy",
    "fearful",
    "sturdy",
    "unadvised",
    "stick",
    "loud",
    "miniature",
    "exuberant",
    "muscle",
    "whistle",
    "brawny",
    "innate",
    "watery"
]

function getRandomSvgHash(){
    return _.sample(svgHashs);
}

function getRandomText(){
    return _.sample(texts);
}

function getRandomColor() {
    return "#"+((1<<24)*Math.random()|0).toString(16);
}

export {
    getRandomSvgHash,
    getRandomText,
    getRandomColor
};
