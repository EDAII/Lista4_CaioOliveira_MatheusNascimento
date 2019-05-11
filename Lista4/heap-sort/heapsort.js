let input, insert, insertBtn, btnInsert, sort, output, speed;
let nodes = [];
let list = [];
let lista = []
let n;
let scl = 1;

const colors = {background: [0, 0, 0], stroke: [255], text: [0], fill: [255]};

async function setup() {
    var cnv = createCanvas(windowWidth, windowHeight - 30);
    cnv.style('display', 'block');
    cnv.style('margin-left', 0);
    fillVector()
    insertTree(lista)
    n = list.length; 
    sort = createButton('Ordenar');
    sort.style('background-color',0)
    sort.mousePressed(() => {
        n = list.length;
        heapsort(); 
  
      });
}

async function fillVector(){
    let vectorSize = random(4,15)
    for(let i = 0; i < vectorSize ;i++){
        lista.push(parseInt(random(1,50)));  
    }
    lista = lista.toString()
    console.log(lista)
}

async function insertTree(lista) {
   
    lista = lista.split(',');
    nodes = [];
    list = [];
    for (let i = 0; i < lista.length; i++) {
        list.push(parseInt(lista[i]));
        await sleep(100);
        nodes.push(new TreeNode(i, list[i]));
        await setParents();
        await sleep(100);

    }
}


function layers() {
    return Math.log2(list.length) + 1;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight - 30);
}

function draw() {
    background(colors.background);
    fill(255)
    text("Heap sort", width/2,50);
    translate(width / 2, height / 2);
    
    for (let i = 0; i < list.length; i++) {
        textSize(30);
        textAlign(CENTER);
        stroke(colors.stroke);
        fill(255);
        
        text(list[i], 50 * i - width / 2 + 25, 100 - height / 2);
        fill(colors.text);
        noFill();
        stroke(colors.stroke);
        rect(50 * i - width / 2 , -height / 2 +65, 50, 50);
    }
    scale(scl);
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i]) {
            nodes[i].update();
            nodes[i].draw();
        } else console.log("lol");
    }


}

async function setParents() {
    let n = 0;
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].setParent(nodes[Math.floor((i - 1) / 2)]);
    }
}

async function swap(i, j) {
    let tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;

    tmp = nodes[i];
    nodes[i] = nodes[j];
    nodes[j] = tmp;


    nodes[j].index = j;
    nodes[i].index = i;
    await setParents();
    await sleep(map(70, 0, 100, 3000, 200));

}

async function heapsort() {
    await buildheap();
    await sleep(map(70, 0, 100, 200, 2000) * 2);
    while (n > 1) {
        n--;
        await swap(0, n);
        await downheap(0);
    }
    output.html(list.join(","));
}

async function buildheap() {
    for (let index = n / 2 - 1; index >= 0; index--)
        await downheap(Math.floor(index));
}

async function downheap(v) {
    let w = 2 * v + 1;
    while (w < n) {
        if (w + 1 < n)
            if (list[w + 1] > list[w]) w++;

        if (list[v] >= list[w]) return;
        await swap(v, w);
        v = w;
        w = 2 * v + 1;
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}