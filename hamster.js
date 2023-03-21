window.addEventListener('load', init, false);


var CeldaTamanyo = 25; //Tamanyo de la celda
var marginLeft = 35, marginTop = 30; //Margenes del laberinto
var canvas = null, graphics = null, laberintoG = null, celdas = null; //Laberinto generador(dimensionX, dimension Y) y las celdas
var visitedCells = 0, CellStack = null;
var TotalCells = 0, CeldaActual = null;
var VecinasEncontradas = null, celdaAux = null;
var origenx, origeny, destinox, destinoy; //coordenadas del hamster marron y blanco
var lastKey = null;
var movimientoOrigen = null; //direccion que toma el hamster marron
var movimientoDestino = null; //direccion que toma el hamster blanco
var SpriteOrigen = new Image();
var SpriteDestino = new Image();
var PartidaEmpezada = false;
var puntuacion1 = 0, puntuacion2 = 0;
var paredes1 = 0, paredes2 = 0;
var sprites = new Array();
var numeroSprites = 0, MAXSPRITES = 10;

SpriteOrigen.src = 'images/hamster.png';
SpriteDestino.src = 'images/hamster_blanco.png';

function Sprite() {
    this.x = (random(laberintoG.dimensionX));
    this.y = random(laberintoG.dimensionY);
    this.posX;
    this.posY;
    this.width;
    this.height;
    this.tipo = random(7);
    this.imagen = new Image();
    if (this.tipo >= 0 && this.tipo <= 5) {
        this.imagen.src = 'images/frutas.png';
        this.paredes = 0;
        this.posX = 21 + random(3) * 175;
        this.posY = 58 + random(2) * 175;
        this.width = 175;
        this.height = 175;
    }
    else {



        this.imagen.src = 'images/rueda.png';
        this.paredes = 1 + random(9);
        this.posX = 0;
        this.posY = 0;
        this.width = 302;
        this.height = 302;

    }

    this.intersectsH = function() {
        var result = false;
        if (this.x == origenx && this.y == origeny) {
            puntuacion1++;
            paredes1 += this.paredes;
            result = true;
        }
        if (this.x == destinox && this.y == destinoy) {
            puntuacion2++;
            paredes2 += this.paredes;
            result = true;
        }

        return result;
    }

    this.intersects = function(sprite) {
        if (sprite != null) {
            return(this.x == sprite.x && this.y == sprite.y);
        }
    }

    this.dibujar = function() {
        graphics.drawImage(this.imagen, this.posX, this.posY, this.width, this.height, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);
    }
}
;



celda = function(x, y, N, S, E, O) {
    this.x = x;
    this.y = y;
    this.N = N;
    this.S = S;
    this.E = E;
    this.O = O;

    this.Estado = "VACIA"; //VACIA, ORIGEN, DESTINO, VISITADA

    this.isIntacta = function() {
        return (this.N == 1 && this.S == 1 && this.E == 1 && this.O == 1);
    };



    this.dibujarCelda = function() {


        if (this.N == 1) {

            graphics.moveTo(marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo));
            graphics.lineTo(marginLeft + this.x + CeldaTamanyo + this.x * CeldaTamanyo, marginTop + this.y + y * CeldaTamanyo);

        }
        if (this.S == 1) {
            graphics.moveTo(marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo) + CeldaTamanyo);
            graphics.lineTo(marginLeft + this.x + CeldaTamanyo + this.x * CeldaTamanyo, marginTop + this.y + y * CeldaTamanyo + CeldaTamanyo);


        }
        if (this.E == 1) {
            graphics.moveTo(marginLeft + this.x + (this.x * CeldaTamanyo) + CeldaTamanyo, marginTop + this.y + (this.y * CeldaTamanyo));
            graphics.lineTo(marginLeft + this.x + CeldaTamanyo + this.x * CeldaTamanyo, marginTop + this.y + y * CeldaTamanyo + CeldaTamanyo);


        }
        if (this.O == 1) {
            graphics.moveTo(marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo));
            graphics.lineTo(marginLeft + this.x + this.x * CeldaTamanyo, marginTop + this.y + y * CeldaTamanyo + CeldaTamanyo);


        }
        if (this.Estado == "ORIGEN" || this.Estado == "AMBOS") {
            if (movimientoOrigen == null) {
                graphics.drawImage(SpriteOrigen, 47, 33, 31, 31, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);
            }
            else if (movimientoOrigen == "ARRIBA") {
                graphics.drawImage(SpriteOrigen, 44, 95, 30, 30, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);

            }
            else if (movimientoOrigen == "DERECHA") {
                graphics.drawImage(SpriteOrigen, 48, 31, 29, 29, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);

            }
            else if (movimientoOrigen == "ABAJO") {
                graphics.drawImage(SpriteOrigen, 47, 63, 29, 29, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);

            }
            else if (movimientoOrigen == "IZQUIERDA") {
                graphics.drawImage(SpriteOrigen, 47, 0, 31, 31, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);

            }
            //graphics.fillStyle="rgb(255,0,0)";
            //graphics.fillRect(5+this.x+(this.x*CeldaTamanyo),5+this.y+(this.y*CeldaTamanyo),CeldaTamanyo,CeldaTamanyo);


        }
        if (this.Estado == "DESTINO" || this.Estado == "AMBOS") {
            if (movimientoDestino == null) {
                graphics.drawImage(SpriteDestino, 47, 63, 29, 29, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);
            }
            else if (movimientoDestino == "ARRIBA") {
                graphics.drawImage(SpriteDestino, 44, 95, 30, 30, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);

            }
            else if (movimientoDestino == "DERECHA") {
                graphics.drawImage(SpriteDestino, 48, 31, 29, 29, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);

            }
            else if (movimientoDestino == "ABAJO") {
                graphics.drawImage(SpriteDestino, 47, 63, 29, 29, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);

            }
            else if (movimientoDestino == "IZQUIERDA") {
                graphics.drawImage(SpriteDestino, 47, 0, 31, 31, marginLeft + this.x + (this.x * CeldaTamanyo), marginTop + this.y + (this.y * CeldaTamanyo), CeldaTamanyo, CeldaTamanyo);

            }
            //graphics.fillStyle="rgb(255,0,0)";
            //graphics.fillRect(5+this.x+(this.x*CeldaTamanyo),5+this.y+(this.y*CeldaTamanyo),CeldaTamanyo,CeldaTamanyo);


        }



    };


};

encontrarVecinas = function(x, y) {
    this.x = x;
    this.y = y;
    VecinasEncontradas = [];
    var cont = 0;
    this.encontrar = function() {

        try {
            if (celdas.getCeldaAt(this.x, y + 1).isIntacta()) {
                VecinasEncontradas.push(celdas.getCeldaAt(this.x, y + 1));
                cont++;
            }
        } catch (err) {
        }


        try {
            if (celdas.getCeldaAt(this.x + 1, y).isIntacta()) {
                VecinasEncontradas.push(celdas.getCeldaAt(this.x + 1, y));
                cont++;
            }
        } catch (err) {
        }

        try {
            if (celdas.getCeldaAt(this.x, y - 1).isIntacta()) {
                VecinasEncontradas.push(celdas.getCeldaAt(this.x, y - 1));
                cont++;
            }

        } catch (err) {
        }
        try {
            if (celdas.getCeldaAt(this.x - 1, y).isIntacta()) {
                VecinasEncontradas.push(celdas.getCeldaAt(this.x - 1, y));
                cont++;
            }
        } catch (err) {
        }
    };

    this.size = function() {
        return cont;
    };

};



laberinto = function(dimX, dimY) {
    this.dimensionX = dimX;
    this.dimensionY = dimY;


    this.inicializar = function() {
        visitedCells = 1;
        CellStack = [];
        celdas = [];
        for (var i = 0; i < this.dimensionX; i++) {

            for (var j = 0; j < this.dimensionY; j++) {
                celdas.push(new celda(i, j, 1, 1, 1, 1));
            }
        }

        celdas.getCeldaAt = function(x, y) {

            for (var i = 0; i < celdas.length; i++) {
                if (celdas[i].x == x && celdas[i].y == y)
                    return celdas[i];
            }

        };

        TotalCells = celdas.length;



        CeldaActual = celdas[random(celdas.length)];


    };

    this.generar = function() {
        while (visitedCells < TotalCells) {

            this.vecinas = new encontrarVecinas(CeldaActual.x, CeldaActual.y);
            this.vecinas.encontrar();

            if (this.vecinas.size() > 0) {
                celdaAux = VecinasEncontradas[random(this.vecinas.size())];


                this.romperMuro(CeldaActual, celdaAux);



                CellStack.push(CeldaActual);
                CeldaActual = celdaAux;
                visitedCells++;
            }
            else {
                CeldaActual = CellStack.pop();

            }



        }


    };

    this.empezarPartida = function() {
        origenx = random(laberintoG.dimensionX);
        origeny = random(laberintoG.dimensionY);
        destinox = random(laberintoG.dimensionX);
        destinoy = random(laberintoG.dimensionY);

        celdas.getCeldaAt(origenx, origeny).Estado = "ORIGEN";
        celdas.getCeldaAt(destinox, destinoy).Estado = "DESTINO";


    };


    this.romperMuro = function(celda1, celda2) {
        var x1 = celda1.x;
        var x2 = celda2.x;
        var y1 = celda1.y;
        var y2 = celda2.y;

        if (x1 == x2 - 1) {
            celdas.getCeldaAt(celda1.x, celda1.y).E = 0;
            celdas.getCeldaAt(celda2.x, celda2.y).O = 0;

        }
        if (x1 == x2 + 1) {
            celdas.getCeldaAt(celda1.x, celda1.y).O = 0;
            celdas.getCeldaAt(celda2.x, celda2.y).E = 0;

        }
        if (y1 == y2 - 1) {
            celdas.getCeldaAt(celda1.x, celda1.y).S = 0;
            celdas.getCeldaAt(celda2.x, celda2.y).N = 0;

        }
        if (y1 == y2 + 1) {
            celdas.getCeldaAt(celda1.x, celda1.y).N = 0;
            celdas.getCeldaAt(celda2.x, celda2.y).S = 0;

        }



    };

    this.dibujaLaberinto = function() {
        graphics.strokeStyle = "rgb(0,0,0)";
        graphics.beginPath();
        for (var i = 0; i < this.dimensionX; i++) {
            for (var j = 0; j < this.dimensionY; j++) {
                celdas.getCeldaAt(i, j).dibujarCelda();
            }

        }

    };
};



function random(max) {
    return Math.floor(Math.random() * max);
}




function init() {
    canvas = document.getElementById('canvas');

    graphics = canvas.getContext('2d');


    laberintoG = new laberinto(30, 15);
    laberintoG.inicializar();


    laberintoG.generar();
    laberintoG.empezarPartida();
    setTimeout(otra, 1000);
    run();
}


function otra() {

    setTimeout(otra, 1000 + random(9000));

    //var numeroSprites=0, MAXSPRITES=5;
    if (sprites.length < MAXSPRITES) {
        sprites.push(new Sprite());
        numeroSprites = sprites.length;
    }
}



function run() {
    setTimeout(run, 50);
    if (PartidaEmpezada) {
        canvas.style.background = '#BFCCF0 url(images/Jaula.png)';

        for (i = 0; i < sprites.length; i++) {
            if (sprites[i].intersectsH()) {
                var pos = sprites.indexOf(sprites[i]);
                if (pos > -1) {
                    sprites.splice(pos, 1);
                    numeroSprites--;
                }
            }
        }


        paint(graphics);
    }
    else {

        canvas.style.background = '#F2FCF0 url(images/JaulaSinAlpha.png)';

        graphics.fillStyle = 'rgb(0,0,0)';
        graphics.font = "bold 25px Arial";
        graphics.fillText('Pulsa Enter Para Empezar con el juego de los hamsters', 30, 35);
        graphics.font = "bold 18px Arial";
        graphics.fillText('Flechas para hamster marron, (w-a-s-d) para el blanco', 30, 200);
        graphics.fillText('Consigue mas fruta que el otro, hay frutas especiales que te permiten atravesar paredes', 30, 400);

    }
}

function paint(graphics) {
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    graphics.lineWidth = 2;
    graphics.lineCap = "square";
    graphics.lineJoin = "bevel";
    laberintoG.dibujaLaberinto();

    for (i = 0; i < sprites.length; i++) {
        sprites[i].dibujar();
    }

    graphics.fillStyle = 'rgb(255,0,0)';
    graphics.font = "14px Arial";
    graphics.fillText('Puntuacion(marron): ' + puntuacion1, 30, 15);
    if (paredes1 > 0)
        graphics.fillText('Puede atravesar  ' + paredes1 + ' paredes', 200, 15);
    graphics.fillStyle = 'rgb(0,0,255)';
    graphics.font = "14px Arial";
    graphics.fillText('Puntuacion(blanco): ' + puntuacion2, 700, 15);
    if (paredes2 > 0)
        graphics.fillText('Puede atravesar  ' + paredes2 + ' paredes', 500, 15)


    graphics.stroke();


}

document.addEventListener('keydown', function(evt) {
    lastKey = evt.keyCode;

    if (PartidaEmpezada == true) {
        if (lastKey == 38 && (celdas.getCeldaAt(origenx, origeny).N == 0 || paredes1 > 0)) { //Arriba
            movimientoOrigen = "ARRIBA";

            if (celdas.getCeldaAt(origenx, origeny - 1).Estado != "DESTINO") {
                if (celdas.getCeldaAt(origenx, origeny).Estado != "AMBOS")
                    celdas.getCeldaAt(origenx, origeny).Estado = "VACIA";
                else
                    celdas.getCeldaAt(origenx, origeny).Estado = "DESTINO";
                celdas.getCeldaAt(origenx, origeny - 1).Estado = "ORIGEN";

            }
            else {
                celdas.getCeldaAt(origenx, origeny).Estado = "VACIA";
                celdas.getCeldaAt(origenx, origeny - 1).Estado = "AMBOS";

            }
            if (celdas.getCeldaAt(origenx, origeny).N == 1)
                paredes1--;
            origeny--;
        }



        if (lastKey == 39 && (celdas.getCeldaAt(origenx, origeny).E == 0 || paredes1 > 0)) { //Derecha
            movimientoOrigen = "DERECHA";
            if (celdas.getCeldaAt(origenx + 1, origeny).Estado != "DESTINO") {
                if (celdas.getCeldaAt(origenx, origeny).Estado != "AMBOS")
                    celdas.getCeldaAt(origenx, origeny).Estado = "VACIA";
                else
                    celdas.getCeldaAt(origenx, origeny).Estado = "DESTINO";
                celdas.getCeldaAt(origenx + 1, origeny).Estado = "ORIGEN";

            }
            else {
                celdas.getCeldaAt(origenx, origeny).Estado = "VACIA";
                celdas.getCeldaAt(origenx + 1, origeny).Estado = "AMBOS";

            }
            if (celdas.getCeldaAt(origenx, origeny).E == 1)
                paredes1--;
            origenx++;
        }
        if (lastKey == 40 && (celdas.getCeldaAt(origenx, origeny).S == 0 || paredes1 > 0)) { //Abajo
            movimientoOrigen = "ABAJO";
            if (celdas.getCeldaAt(origenx, origeny + 1).Estado != "DESTINO") {
                if (celdas.getCeldaAt(origenx, origeny).Estado != "AMBOS")
                    celdas.getCeldaAt(origenx, origeny).Estado = "VACIA";
                else
                    celdas.getCeldaAt(origenx, origeny).Estado = "DESTINO";
                celdas.getCeldaAt(origenx, origeny + 1).Estado = "ORIGEN";

            }
            else {
                celdas.getCeldaAt(origenx, origeny).Estado = "VACIA";
                celdas.getCeldaAt(origenx, origeny + 1).Estado = "AMBOS";

            }
            if (celdas.getCeldaAt(origenx, origeny).S == 1)
                paredes1--;
            origeny++;

        }
        if (lastKey == 37 && (celdas.getCeldaAt(origenx, origeny).O == 0 || paredes1 > 0)) { //Izquierda
            movimientoOrigen = "IZQUIERDA";
            if (celdas.getCeldaAt(origenx - 1, origeny).Estado != "DESTINO") {
                if (celdas.getCeldaAt(origenx, origeny).Estado != "AMBOS")
                    celdas.getCeldaAt(origenx, origeny).Estado = "VACIA";
                else
                    celdas.getCeldaAt(origenx, origeny).Estado = "DESTINO";
                celdas.getCeldaAt(origenx - 1, origeny).Estado = "ORIGEN";

            }
            else {
                celdas.getCeldaAt(origenx, origeny).Estado = "VACIA";
                celdas.getCeldaAt(origenx - 1, origeny).Estado = "AMBOS";

            }
            if (celdas.getCeldaAt(origenx, origeny).O == 1)
                paredes1--;
            origenx--;

        }
        // 87w 65a 83s 68d
        if (lastKey == 87 && (celdas.getCeldaAt(destinox, destinoy).N == 0 || paredes2 > 0)) { //Arriba
            movimientoDestino = "ARRIBA";

            if (celdas.getCeldaAt(destinox, destinoy - 1).Estado != "ORIGEN") {
                if (celdas.getCeldaAt(destinox, destinoy).Estado != "AMBOS")
                    celdas.getCeldaAt(destinox, destinoy).Estado = "VACIA";
                else
                    celdas.getCeldaAt(destinox, destinoy).Estado = "ORIGEN";
                celdas.getCeldaAt(destinox, destinoy - 1).Estado = "DESTINO";

            }
            else {
                celdas.getCeldaAt(destinox, destinoy).Estado = "VACIA";
                celdas.getCeldaAt(destinox, destinoy - 1).Estado = "AMBOS";

            }
            if (celdas.getCeldaAt(destinox, destinoy).N == 1)
                paredes2--;
            destinoy--;
        }



        if (lastKey == 68 && (celdas.getCeldaAt(destinox, destinoy).E == 0 || paredes2 > 0)) { //Derecha
            movimientoDestino = "DERECHA";
            if (celdas.getCeldaAt(destinox + 1, destinoy).Estado != "ORIGEN") {
                if (celdas.getCeldaAt(destinox, destinoy).Estado != "AMBOS")
                    celdas.getCeldaAt(destinox, destinoy).Estado = "VACIA";
                else
                    celdas.getCeldaAt(destinox, destinoy).Estado = "ORIGEN";
                celdas.getCeldaAt(destinox + 1, destinoy).Estado = "DESTINO";

            }
            else {
                celdas.getCeldaAt(destinox, destinoy).Estado = "VACIA";
                celdas.getCeldaAt(destinox + 1, destinoy).Estado = "AMBOS";

            }
            if (celdas.getCeldaAt(destinox, destinoy).E == 1)
                paredes2--;
            destinox++;
        }
        if (lastKey == 83 && (celdas.getCeldaAt(destinox, destinoy).S == 0 || paredes2 > 0)) { //Abajo
            movimientoDestino = "ABAJO";
            if (celdas.getCeldaAt(destinox, destinoy + 1).Estado != "ORIGEN") {
                if (celdas.getCeldaAt(destinox, destinoy).Estado != "AMBOS")
                    celdas.getCeldaAt(destinox, destinoy).Estado = "VACIA";
                else
                    celdas.getCeldaAt(destinox, destinoy).Estado = "ORIGEN";
                celdas.getCeldaAt(destinox, destinoy + 1).Estado = "DESTINO";

            }
            else {
                celdas.getCeldaAt(destinox, destinoy).Estado = "VACIA";
                celdas.getCeldaAt(destinox, destinoy + 1).Estado = "AMBOS";

            }
            if (celdas.getCeldaAt(destinox, destinoy).S == 1)
                paredes2--;
            destinoy++;

        }
        if (lastKey == 65 && (celdas.getCeldaAt(destinox, destinoy).O == 0 || paredes2 > 0)) { //Izquierda
            movimientoDestino = "IZQUIERDA";
            if (celdas.getCeldaAt(destinox - 1, destinoy).Estado != "ORIGEN") {
                if (celdas.getCeldaAt(destinox, destinoy).Estado != "AMBOS")
                    celdas.getCeldaAt(destinox, destinoy).Estado = "VACIA";
                else
                    celdas.getCeldaAt(destinox, destinoy).Estado = "ORIGEN";
                celdas.getCeldaAt(destinox - 1, destinoy).Estado = "DESTINO";

            }
            else {
                celdas.getCeldaAt(destinox, destinoy).Estado = "VACIA";
                celdas.getCeldaAt(destinox - 1, destinoy).Estado = "AMBOS";

            }
            if (celdas.getCeldaAt(destinox, destinoy).O == 1)
                paredes2--;
            destinox--;

        }
    }

    if (lastKey == 13) { //Enter
        PartidaEmpezada = true;

        lastKey = null;
    }

    if (lastKey == 90) {
        paredes2 += 10;
    }

    if (lastKey == 107) {
        paredes1 += 10;
    }





}, false);

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function empezar() {
    /*
     CeldaTamanyo=25;
     marginLeft=15, marginTop=20;
     canvas=null,graphics=null, laberintoG=null, celdas=null;
     visitedCells=0,	CellStack=null;
     TotalCells=0, CeldaActual=null;
     VecinasEncontradas=null, celdaAux=null;
     origenx, origeny, destinox,destinoy;
     lastKey=null;
     movimientoOrigen=null;
     movimientoDestino=null;
     SpriteOrigen=new Image();
     SpriteDestino=new Image();
     
     SpriteOrigen.src='images/laberinto/hamster.png';
     SpriteDestino.src='images/laberinto/hamster_blanco.png';
     */
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    CeldaTamanyo = 25; //Tamanyo de la celda
    marginLeft = 35, marginTop = 30; //Margenes del laberinto
    canvas = null, graphics = null, laberintoG = null, celdas = null; //Laberinto generador(dimensionX, dimension Y) y las celdas
    visitedCells = 0, CellStack = null;
    TotalCells = 0, CeldaActual = null;
    VecinasEncontradas = null, celdaAux = null;
    origenx, origeny, destinox, destinoy; //coordenadas del hamster marron y blanco
    lastKey = null;
    movimientoOrigen = null; //direccion que toma el hamster marron
    movimientoDestino = null; //direccion que toma el hamster blanco
    SpriteOrigen = new Image();
    SpriteDestino = new Image();
    PartidaEmpezada = false;
    puntuacion1 = 0, puntuacion2 = 0;
    paredes1 = 0, paredes2 = 0;
    sprites = new Array();
    numeroSprites = 0, MAXSPRITES = 5;

    SpriteOrigen.src = 'images/hamster.png';
    SpriteDestino.src = 'images/hamster_blanco.png';
    init();
    PartidaEmpezada = true;
}

