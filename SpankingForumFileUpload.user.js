// ==UserScript==
// @name         GoFile/ImgBB File Upload for SpankingForum.su
// @match        https://spankingforum.su/threads/*
// @match        https://spankingforum.su/forums/*/post-thread
// @match        https://spankingforum.su/direct-messages/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=spankingforum.su
// @require		 https://code.jquery.com/jquery-latest.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

waitForKeyElements (
    ".fr-word-counter", click
);

function click() {

    jQuery(document).ready(function() {
        let selectedServer = '';

        // Identify the best server on page load
        getBestGofileServer();

        function getBestGofileServer() {
            jQuery.ajax({
                url: 'https://api.gofile.io/servers',
                type: 'GET',
                success: function(response) {
                    if (response.status === 'ok') {
                        selectedServer = response.data.servers[0].name;
                    } else {
                        console.log(selectedServer);
                        console.log(response);
                    }
                },
                error: function(response) {
                    console.log(selectedServer);
                    console.log(response);
                }
            });
        }
        let goFileContainer = jQuery('<div>', {
            id: 'goFileContainer',
            class: 'uploadContainer'
        }).css({
            'width':'50%',
            'display': 'block'
        });
        let imgBBContainer = jQuery('<div>', {
            id: 'imgBBContainer',
            class: 'uploadContainer'
        }).css({
            'width':'50%',
            'display': 'block'
        });
        let masterContainer = jQuery('<div>', {
            id: 'masterContainer',
            class: 'masterContainer'
        }).css({
            'display': 'flex'
        });
        // Create the drag-and-drop zone
        var dropZoneText2 = `<img style="height: 32px; vertical-align:middle;padding-right: 5px" src="https://simgbb.com/images/logo.png" height="32px" title=""><span style="vertical-align:middle">ImgBB Upload (Drag & Drop)</span>`
        let dropZone2 = jQuery('<div>', {
            id: 'imgbb-dropzone',
            class: 'imgbb-dropzone',
            html: dropZoneText2
        }).css({
            'border': '2px dashed rgb(14, 151, 205)',
            'padding': '20px',
            'text-align': 'center',
            'margin-top': '10px',
            'cursor': 'pointer',
            'position': 'relative',
            'background-color': 'rgb(60, 70, 89)',
            'font-weight': 'bold',
            'color': 'rgb(14, 151, 205)',
            'width':'97%',
            'float':'right'
        });

        // Append the dropzone below the inline editor

        // Container for progress bars
        let progressContainer2 = jQuery('<div>', {
            id: 'progress-container2'
        }).css({
            'margin-top': '10px',
            'width':'97%',
            'float':'right',
            'display':'block'
        });

        dropZone2.after(progressContainer2);

        // Drag and drop handlers
        dropZone2.on('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).css('border-color', '#42464D');
        });

        dropZone2.on('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).css('border-color', '#42464D');
        });

        dropZone2.on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).css('border-color', '#42464D');

            let files2 = e.originalEvent.dataTransfer.files;
            if (files2.length > 0) {
                for (let i = 0; i < files2.length; i++) {
                    uploadFileToImgBB(files2[i]);
                }
            }
        });
        // Create the drag-and-drop zone
        var dropZoneText = `<img style="height: 32px; vertical-align:middle;padding-right: 5px" src="https://gofile.io/dist/img/logo-small-70.png" height="32px" title=""><span style="vertical-align:middle">GoFile Upload (Drag & Drop)</span>`
        let dropZone = jQuery('<div>', {
            id: 'gofile-dropzone',
            class: 'dropzone',
            html: dropZoneText
        }).css({
            'border': '2px dashed #D2822D',
            'padding': '20px',
            'text-align': 'center',
            'margin-top': '10px',
            'cursor': 'pointer',
            'position': 'relative',
            'background-color': 'rgb(81, 76, 71)',
            'font-weight': 'bold',
            'color': '#D2822D',
            'width':'97%'
        });

        // Append the dropzone below the inline editor
        //jQuery('.fr-word-counter').after(dropZone);

        // Container for progress bars
        let progressContainer = jQuery('<div>', {
            id: 'progress-container'
        }).css({
            'margin-top': '10px',
            'width': '97%',
            'display':'block'
        });

        dropZone.after(progressContainer);
        jQuery('.fr-word-counter').after(masterContainer);
        jQuery("#masterContainer").append((goFileContainer));
        jQuery("#masterContainer").append((imgBBContainer));
        jQuery("#goFileContainer").append((dropZone));
        jQuery("#goFileContainer").append('<input type="file" id="fileInput" multiple style="display: none;">');
        jQuery("#goFileContainer").append((progressContainer));
        jQuery("#imgBBContainer").append((dropZone2));
        jQuery("#imgBBContainer").append((progressContainer2));
        jQuery("#imgBBContainer").append('<input type="file" id="fileInput2" multiple style="display: none;">');

        // Drag and drop handlers
        dropZone.on('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).css('border-color', '#D2822D');
        });

        dropZone.on('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).css('border-color', '#D2822D');
        });

        dropZone.on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery(this).css('border-color', '#D2822D');

            let files = e.originalEvent.dataTransfer.files;
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    uploadFileToGofile(files[i]);
                }
            }
        });
        jQuery('#gofile-dropzone').click(function () {
            jQuery('#fileInput').click();
        });
        jQuery('#fileInput').on('change', function (event) {
            const files = event.target.files;
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    uploadFileToGofile(files[i]);
                }
            }
        });
        jQuery('#imgbb-dropzone').click(function () {
            jQuery('#fileInput2').click();
        });
        jQuery('#fileInput2').on('change', function (event) {
            const files = event.target.files;
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    uploadFileToImgBB(files[i]);
                }
            }
        });

        function uploadFileToImgBB(file2) {
            let formData2 = new FormData();
            formData2.append('image', file2);

            // Create progress bar for each file
            let progressBarWrapper2 = jQuery('<div>', {
                class: 'progress-bar-wrapper',
                text: `Uploading ${file2.name}...`
            }).css({
                'margin-bottom': '10px'
            });

            let progressBar2 = jQuery('<div>', {
                class: 'upload-progress-bar'
            }).css({
                'width': '0%',
                'height': '5px',
                'background-color': '#4caf50',
                'margin-top': '5px'
            });

            progressBarWrapper2.append(progressBar2);
            progressContainer2.append(progressBarWrapper2);
            var apiKey = 'ccbf4ad10414412d68ec86af720fc137'
            // Upload to Gofile.io
            jQuery.ajax({
                url: `https://api.imgbb.com/1/upload?key=${apiKey}`,
                type: 'POST',
                data: formData2,
                processData: false,
                contentType: false,
                xhr: function() {
                    let xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                            let percentComplete2 = (e.loaded / e.total) * 100;
                            progressBar2.css('width', percentComplete2 + '%');
                        }
                    }, false);
                    return xhr;
                },
                success: function(response) {
                    if (response.data.url != '') {
                        let imageLink2 = response.data.url
                        insertLinkIntoEditor2(imageLink2);
                        progressBarWrapper2.text(`Uploaded: ${file2.name}`);
                        progressBarWrapper2.append(`<a href="${imageLink2}" target="_blank"> [Open File]</a>`);
                        progressBar2.css('width', '100%');
                    } else {
                        progressBarWrapper2.text(`Failed to upload: ${file2.name}`);
                        progressBar2.css('background-color', '#f44336'); // Red for error
                    }
                },
                error: function(response) {
                    progressBarWrapper2.text(`Error uploading: ${file2.name}`);
                    progressBar2.css('background-color', '#f44336');
                    console.log(response)
                }
            });
        }

        // Insert link into the XenForo inline editor
        function insertLinkIntoEditor2(imageLink2) {
            let editor = jQuery('.fr-element.fr-view'); // Target the inline editor
            editor.append(`<p>[IMG]${imageLink2}[/IMG]</p>`);
        }
        // File upload function with progress
        function uploadFileToGofile(file) {
            let formData = new FormData();
            formData.append('file', file);

            // Create progress bar for each file
            let progressBarWrapper = jQuery('<div>', {
                class: 'progress-bar-wrapper',
                text: `Uploading ${file.name}...`
            }).css({
                'margin-bottom': '10px'
            });

            let progressBar = jQuery('<div>', {
                class: 'upload-progress-bar'
            }).css({
                'width': '0%',
                'height': '5px',
                'background-color': '#4caf50',
                'margin-top': '5px'
            });

            progressBarWrapper.append(progressBar);
            progressContainer.append(progressBarWrapper);

            // Upload to Gofile.io
            jQuery.ajax({
                url: `https://${selectedServer}.gofile.io/contents/uploadfile`,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                xhr: function() {
                    let xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                            let percentComplete = (e.loaded / e.total) * 100;
                            progressBar.css('width', percentComplete + '%');
                        }
                    }, false);
                    return xhr;
                },
                success: function(response) {
                    if (response.status === 'ok') {
                        let link = response.data.downloadPage;
                        let fileID = response.data.id;
                        let MD5 = response.data.md5;
                        var fileName = `${file.name}`
                        var server = response.data.servers[0]
                        var thumbnail = `https://${server}.gofile.io/download/web/${fileID}/thumb_${MD5}`
                        var downloadLink = `https://${server}.gofile.io/download/web/${fileID}/${file.name}`
                        insertLinkIntoEditor(link,downloadLink,thumbnail,fileName);
                        progressBarWrapper.text(`Uploaded: ${file.name}`);
                        progressBarWrapper.append(`<a href="${link}" target="_blank"> [Open File]</a>`);
                        progressBar.css('width', '100%');
                    } else {
                        progressBarWrapper.text(`Failed to upload: ${file.name}`);
                        progressBar.css('background-color', '#f44336'); // Red for error
                    }
                },
                error: function() {
                    progressBarWrapper.text(`Error uploading: ${file.name}`);
                    progressBar.css('background-color', '#f44336');
                }
            });
        }

        // Insert link into the XenForo inline editor
        function insertLinkIntoEditor(link,directDownload,thumbnail,fileName) {
            let editor = jQuery('.fr-element.fr-view'); // Target the inline editor
            editor.append(`<p>${link}</p>`);
            editor.append(`<p>[SIZE=5][B]${fileName}[/B][/SIZE]</p>`);
            editor.append(`<p>[SIZE=4][URL='${directDownload}']Download Link[/URL][/SIZE]</p>`);
            editor.append(`<p>[IMG]${thumbnail}[/IMG]</p>`);
        }
    });
}
