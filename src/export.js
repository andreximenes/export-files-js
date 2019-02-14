'use strict'
const path = require('path');
const fs = require('fs');
const LOGGER = require('./logger');
const shell = require('shelljs');

let dtUltExport = null;
let started = true;

const EXTENSION = ".class";

const URL_ORIGEM = 'D:\\workspace_sts\\p2k-15.07.XX\\bin';
const URL_DESTINO = 'D:\\Exportador\\Exportados\\TIM';
const TIMEOUT = 5000;


//Inicio da aplicação.
start();


function start(){
    try {
        validaPath(URL_ORIGEM);
        LOGGER.clear();
        LOGGER.printLogo();
        LOGGER.printLine();
        LOGGER.printLog("ORIGEM: " + URL_ORIGEM);
        LOGGER.printLog("DESTINO: " + URL_DESTINO);
        LOGGER.printLine();
        watch();

    } catch (err) {
        LOGGER.printError('Erro durante a execução do programa:');
        LOGGER.printError(err);
    }
}

function watch() {
    try {
        validaPath(URL_ORIGEM);

        LOGGER.printLog('Monitorando o path: ' + URL_ORIGEM);
        if (dtUltExport == null) {
            dtUltExport = new Date();
        }

        if (started) {
            copyFolderRecursiveSync(URL_ORIGEM, URL_DESTINO);
        }

        setTimeout(() => {
            watch();
        }, TIMEOUT);
    } catch (err) {
        LOGGER.printError('Erro durante a execução do programa.');
        LOGGER.printError(err);
    }
}

function copyFolderRecursiveSync(source, target) {
    var files = [];
    try {
        //check if folder needs to be created or integrated
        var targetFolder = path.join(target, path.basename(source));

        //copy
        if (fs.lstatSync(source).isDirectory()) {
            files = fs.readdirSync(source);
            files.forEach(function (file) {
                var curSource = path.join(source, file);
                let metaData = fs.lstatSync(curSource);
                if (metaData.isDirectory()) {
                    copyFolderRecursiveSync(curSource, targetFolder);
                } else {
                    let fileDtLastModified = metaData.mtime;
                    let fileExtension = file.substring(file.indexOf('.'));
                    if (fileDtLastModified > dtUltExport && fileExtension === EXTENSION) {
                        if (!fs.existsSync(targetFolder)) {
                            //fs.mkdirSync(targetFolder, { recursive: true });
                            shell.mkdir('-p', targetFolder);
                        }
                        dtUltExport = fileDtLastModified;
                        copyFileSync(curSource, targetFolder);
                        LOGGER.printLog('ARQUIVO COPIADO: ' + path.join(targetFolder, file), true);
                    }
                }
            });
        }
    } catch (err) {
        console.error(err);
    }
}

function copyFileSync(source, target) {
    var targetFile = target;
    try {
        //if target is a directory a new file with the same name will be created
        if (fs.existsSync(target)) {
            if (fs.lstatSync(target).isDirectory()) {
                targetFile = path.join(target, path.basename(source));
            }
        }
        fs.writeFileSync(targetFile, fs.readFileSync(source));
    } catch (err) {
        LOGGER.printError(err);
    }
}


function validaPath(path) {
    if (!fs.existsSync(path)) {
        throw 'ERROR: Path Inválido => ' + path;
    } else {
        return true
    }
}
