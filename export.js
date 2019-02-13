const path = require('path');
const fs = require('fs');  
const extension = ".class";
const fsm = require('fs-meta').sync;

let dtUltExport = null;
let started = true;

function start (urlOrigem, urlDestino) {
    console.log('Procurando por novos arquivos...');
    if(dtUltExport == null){
        try{
            dtUltExport = new Date();
        } catch(err){
            console.error(err);
        }
    }
    
    if(started) {
        urlOrigem = 'D:\\workspace_sts\\p2k-15.07.XX\\bin';
        urlDestino = 'C:\\Users\\andre.luz\\Desktop\\exportados\\';
       
        copyFolderRecursiveSync(urlOrigem, urlDestino);
        
    }
    
    setTimeout(() => {
        start();
    }, 5000);
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    try{
        //copy
        if ( fs.lstatSync( source ).isDirectory() ) {
            files = fs.readdirSync( source );
            files.forEach( function ( file ) {
                var curSource = path.join( source, file );
                let metaData = fs.lstatSync( curSource );
                if ( metaData.isDirectory() ) {
                    copyFolderRecursiveSync( curSource, targetFolder );
                } else {
                    let fileDtLastModified = metaData.mtime;
                    if(fileDtLastModified > dtUltExport){
                        dtUltExport = fileDtLastModified;
                        copyFileSync( curSource, targetFolder );
                        console.log('Arquivo: ' + file + " copiado para: " + targetFolder)
                    }
                }
            } );
        }

    } catch(err){
        console.error(err);
    }
}

function copyFileSync( source, target ) {
    var targetFile = target;
    try{
        //if target is a directory a new file with the same name will be created
        if ( fs.existsSync( target ) ) {
            if ( fs.lstatSync( target ).isDirectory() ) {
                targetFile = path.join( target, path.basename( source ) );
            }
        }
        fs.writeFileSync(targetFile, fs.readFileSync(source));
    } catch(err){
        console.error(err);
    }

}

function stop(){
    started = false;
}

module.exports = {start, stop};