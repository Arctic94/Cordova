function compartir() {
    //////////////// dump database
    var dump;
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) { //// callback success
        console.log(JSON.stringify(result));
        dump = JSON.stringify(result);
        ///////////////////////
        var textFile = null,
            makeTextFile = function (text) {
                var data = new Blob([text], {
                    type: 'text/plain'
                });
                // If we are replacing a previously generated file we need to
                // manually revoke the object URL to avoid memory leaks.
                if (textFile !== null) {
                    window.URL.revokeObjectURL(textFile);
                }
                textFile = window.URL.createObjectURL(data);
                return textFile;
            };
        //makeTextFile(dump);
        var link = document.getElementById('descargar_bdd');
        link.name = makeTextFile(dump);
        //link.click();
        ///////////////////////// sharing
        var onSuccess = function (result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };
        var onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        };
        window.plugins.socialsharing.shareViaEmail(
            dump, // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
            'Respaldo Pro Audiologist',
            [localStorage.usuario], // TO: must be null or an array
            null, // CC: must be null or an array
            null, // BCC: must be null or an array
            null, // FILES: can be null, a string, or an array
            onSuccess, // called when sharing worked, but also when the user cancelled sharing via email. On iOS, the callbacks' boolean result parameter is true when sharing worked, false if cancelled. On Android, this parameter is always true so it can't be used). See section "Notes about the successCallback" below.
            onError // called when sh*t hits the fan
        );
    }).catch(function (err) {
        console.log(err);
    });
}