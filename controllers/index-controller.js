const express = require('express');
const exportador = require('../export');


function info(req, res) {
    exportador.start();
    res.json(
        {message: 'The server is running!'}
    );
}

module.exports = { info };