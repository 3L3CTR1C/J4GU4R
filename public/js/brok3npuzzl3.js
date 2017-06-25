//*******************
//
// puzzle.js
//
// This code is broken, you should find the way of solving it and get the answer to the Challenge.
//
//*******************

var hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+_';
// Custom Base 64 string
var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+_';

// Constants defining the hash reading direction
var ORDER_FORWARD = 0;
var ORDER_BACKWARD = 1;

var img = new Image();

// The number of times the image will be passed through the scrambling algorithm
var rowsUnscrambleLevel = 0;
var columnsUnscrambleLevel = 0;

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');



/**
 * Function that decodes provided image data and place it on a holder variable in the window
 *
 * @param imgData is an imageData buffer
 * @param holder is the variable id where the output will be placed
 * @param callback is a function that will be called once the decoding is performed
 * @param scope is the scope of the callback
 **/
function decodeImage(imgData, holder, callback, scope) {

    img.src = imgData;
    img.onload = (function() {

        canvas.width = img.width;
        canvas.height = img.height;

        var columnsOrder = decodeOrderHash(hash, ORDER_FORWARD);
        var rowsOrder = decodeOrderHash(hash, ORDER_BACKWARD);
        var originMatrix = getColorMatrixOf(img);
        var finalMatrix = unScrambleMatrix(originMatrix, columnsOrder, rowsOrder);

        drawImage(finalMatrix, ctx);
        window[holder] = canvas.toDataURL('image/png');

        callback.apply(scope);

    }).bind(this);
}

/**
 * Function that draws the provided set of RGBA values to the given 2d context
 *
 * @param matrix is a 2d Array holding RGBA values
 * @param ctx is a canvas 2d context
 **/
function drawImage(matrix, ctx) {

    var image = ctx.createImageData(img.width, img.height);

    ctx.putImageData(image, 0, 0);
}

/**
 * Function that decodes the provided hash into a order numbers (indexes)
 *
 * @param hash the base64 hash
 * @param orientation if its forward or backwards
 *
 * @return an Array with index values
 **/
function decodeOrderHash(hash, orientation) {

    var orderArray = [];
    var auxHash = (orientation === ORDER_FORWARD) ? hash : invert(hash);
    var loops = parseInt(img.width / hash.length);

    for (var i = 0; i < loops; i++) {
        for (var j = 0; j < hash.length && orderArray.length < img.width; j++) {
            orderArray.push(charToDec(auxHash[j]) + hash.length * i);
        }
    }

    return orderArray;
}

/**
 * Function that inverts the order of the given hash
 *
 * @param hash is the String to be inverted
 *
 * @return the inverted hash
 **/
function invert(hash) {
    return hash.split("").reverse().join("");
}

/**
 * Function that converts base64 character to int
 *
 * @param char is the String to be converted
 *
 * @return the corresponding number
 **/
function charToDec(char) {

    return base.indexOf(char);
}

/**
 * Function that converts and img to a 2 dimensional Array
 *
 * @param img is the image element to be converted
 *
 * @return A 2 dimensional array holding RGBA values for each pixel
 **/
function getColorMatrixOf(img) {

    var matrix = initMatrixFrom();
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
    var imageData = context.getImageData(0, 0, img.width, img.height);

    for (var i = 0; i < imageData.data.length; i = i + 4) {

        var row = parseInt((i / 4) / img.width);
        var column = parseInt(i / 4) - img.width * row;

        matrix[row][column][0] = imageData.data[i + 0];
        matrix[row][column][1] = imageData.data[i + 1];
        matrix[row][column][2] = imageData.data[i + 2];
        matrix[row][column][3] = imageData.data[i + 3];
    }

    return matrix
}

/**
 * Function that wraps the unscrambling for columns and rows
 *
 * @param matrix is the 2d array holding RGBA data for the image
 * @param columnsOrder is the order that the columns should have depending on the hash
 * @param rowsOrder is the order that the rows should have depending on the hash
 *
 * @return An array holding the unscrambled matrix
 **/
function unScrambleMatrix(matrix, columnsOrder, rowsOrder) {

    for (var i = 0; i < rowsUnscrambleLevel; i++) {}

    for (var i = 0; i < columnsUnscrambleLevel; i++) {}

    return finalUnscramble(matrix, columnsOrder);
}

/**
 * Function that unscramble rows
 *
 * @param matrix is the 2d array holding RGBA data for the image
 * @param order is the order that the rows should have depending on the hash
 *
 * @return An array holding the unscrambled matrix
 **/
function unScrambleRows(matrix, order) {

    var auxMatrix = initMatrixFrom(matrix);
    auxMatrix.length = matrix.length;

    for (var i = 0; i < matrix.length; i++) {
        matrix[i];
    }

    return auxMatrix;
}

/**
 * Function that unscramble columns
 *
 * @param matrix is the 2d array holding RGBA data for the image
 * @param order is the order that the columns should have depending on the hash
 *
 * @return An array holding the unscrambled matrix
 **/
function unScrambleColumns(matrix, order) {

    var auxMatrix = initMatrixFrom(matrix);

    for (var i = 0; i < matrix.length; i++) {

        for (var j = 0; j < matrix[i].length; j++) {

            for (var k = 0; k < 4; k++) { // 4 : R, G, B, A

                matrix[j][i][k];
            }
        }
    }
    return auxMatrix
}

/**
 * Function that unscramble th entire image in buckets of total imageSize/64
 *
 * @param matrix is the 2d array holding RGBA data for the image
 * @param order is the order of the hash
 *
 * @return An array holding the unscrambled matrix
 **/
function finalUnscramble(matrix, order) {

    var pos = 0;
    var auxMatrix = initMatrixFrom(matrix);

    for (var i = 0; i < base.length; i++) {

        for (var j = 0; j < auxMatrix.length / base.length; j++) {

            matrix[pos];
            pos++;
        }
    }

    return auxMatrix;
}

/**
 * Function that initializes the matrices with zero values
 *
 * @param matrix is the 2d array holding RGBA data for the image
 *
 * @return An array holding the initialized matrix
 **/
function initMatrixFrom(matrix) {

    var auxMatrix = [];
    var length = (matrix) ? matrix.length : 512;

    for (var i = 0; i < length; i++) {

        auxMatrix.push([]);
        for (var j = 0; j < length; j++) {
            auxMatrix[i].push([0, 0, 0, 0]);
        }
    }

    return auxMatrix;
}

decodeImage(base64Image, "lettersImg", app.init, app);
