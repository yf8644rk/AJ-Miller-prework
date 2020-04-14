let names = ['Alex', 'Sam', 'Glen'];
for (let i = 0; i<3; i++){
    name = prompt('Enter a students name');
    names.push(name);
}
for (let i=0; i<names.length; i++){
    console.log(names[i]);
}