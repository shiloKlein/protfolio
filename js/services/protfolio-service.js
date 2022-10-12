'use strict'


const G_PROJECTS = 
[
{
    id:'touch-nums',
    name: 'touch the nums',
    title: 'Great grade A exersise',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing',
    url:'./projects/touch-nums/index.html',
    publishedAt: Date.now(),
    lables: ['matrix', 'game'],
},
{
    id:'pacman',
    name: 'pacman',
    title: 'Lighter version of the known game',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing',
    url:'./projects/pacman/index.html',
    publishedAt: Date.now(),
    lables: ['pacman','old games', 'game'],
},
{
    id:'mine-sweeper',
    name: 'Mine Sweeper',
    title: 'The old and loved game with new cool features',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing',
    url:'./projects/mine-sweeper/index.html',
    publishedAt: Date.now(),
    lables: ['mine sweeper','old games', 'game'],
},
{
    id:'book-shop',
    name: 'book shop',
    title: 'A demo to shopping site',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing',
    url:'./projects/book-shop/index.html',
    publishedAt: Date.now(),
    lables: ['shop', 'books'],
}
]
console.log('use strict');

function getProjects(){
    return G_PROJECTS
}