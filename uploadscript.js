    $(document).ready(function() {
        let selectedServer = '';

        // Identify the best server on page load
        getBestGofileServer();

        function getBestGofileServer() {
            $.ajax({
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
        let goFileContainer = $('<div>', {
            id: 'goFileContainer',
            class: 'uploadContainer'
        }).css({
            'width':'50%',
            'display': 'block'
        });
        let imgBBContainer = $('<div>', {
            id: 'imgBBContainer',
            class: 'uploadContainer'
        }).css({
            'width':'50%',
            'display': 'block'
        });
        let masterContainer = $('<div>', {
            id: 'masterContainer',
            class: 'masterContainer'
        }).css({
            'display': 'flex'
        });
        // Create the drag-and-drop zone
        let imgBBBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAAAgCAMAAAAysvoIAAAAkFBMVEVHcEwiotkiqOAdk8Qip+Aip94ipt8iqOAAbZMjqN8hpdsiqN8iotgip98ip+AiqOAip+Aio9wip+Aip98ip98hpt4jp90iqOAipt0hpd4ioNohpt4eoNAip+AiqN8ip+Ahpd4dntMiqOAiqN8ip98hpt4ipdwip+Aip98ipuAYisUiqOAiqN8ip98ip98jqOAM5QOUAAAAL3RSTlMAHOMH3E9w+wH+Jc0VXvXwlimEvJJJQKo5NSFZCuvVyEUQ0aNUOy+1aHwDw4yAnJjPk9MAAAKaSURBVHhe3dZbb+IwEAXg4yQEO4SwQCEUEij3e+f//7utx7a8WT8hWVq038v4VEayxjAu/gNn+jHFaz5IGwY5rpKYwEsGpI2DHJcgVuAVaZ9+jGSQIwhasJZ4xYK0aZBjK9ZE6zFekpM2CXJki97hej1seaUVqzxflYA4XHoCDk7DfCV4wxzAnrTHZbUE6+R4EtJKt1IV/ah6ey4TCTbfkUM1gMwF9SER5Lg/08ysvL6tObSLIi8Hyk4Mciw92wtehXYA8MUnVQmxBTAjL0GQY5mQlvOKZWSYk7QARMv3e5QVdzQFnqR9L+66FEGOZUra0a3UWbak/ZIjd9nfpF1QcB0AONsPrXT5CnIsLfeiAcyZ1LLhC6xK8NnugOA/ZBJDc2i4D6VmrB2CHEnhvlWuKzhyPUNw/QAe9tbdm+m3mr2zIEfieuFXOdcnDu4kGWmFfzOxslvNnkWQo/C98Kua68y2a2n71/o302/lPaoJciQb0k64NWvblYTr1nQpcfPh7t/MtNm5Tmbm+7Dp5khu5hWQeBIbSTuLbZdqpMRq/2YOiLUSc12vkFU3R1LYpmwTYlM7gfc4cb3i4s52M2fqnchtvel+9QVENyOSI2mD2Z2MiZvF5irVfjjirNpZTaw8k5F97e0v4NTNsZyoq2dn8QJfXAPJlaj+M28B0c2xpBUZbZ+LkCM7RktFxm7z1/8A6+2anNEnAHRyPBNiyVxx8WMU38SS4rOiP2WC336WnaB1cjzyWRG1j625wtrPYqSTlqhfC2DhO0fVowEwHxCR2uQpDJ/jasZCQgvI5XgLtszIUCWMcrxsYPj8L/gv2Brv5kG0m9jLfjcZ0XxjZ8y7SYha0pIb3s3Zj+a3YyecyvGGxvus39afiOY3shDVlDIzOR8AAAAASUVORK5CYII="
        var dropZoneText2 = `<img style="height: 32px; vertical-align:middle;padding-right: 5px; padding-bottom: 5px;" src="${imgBBBase64}" height="32px" title=""><div style="vertical-align:middle">ImgBB Upload (Drag & Drop)</div>`
        let dropZone2 = $('<div>', {
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
        let progressContainer2 = $('<div>', {
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
            $(this).css('border-color', 'rgb(14, 151, 205)');
        });

        dropZone2.on('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border-color', 'rgb(14, 151, 205)');
        });

        dropZone2.on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border-color', 'rgb(14, 151, 205)');

            let files2 = e.originalEvent.dataTransfer.files;
            if (files2.length > 0) {
                for (let i = 0; i < files2.length; i++) {
                    uploadFileToImgBB(files2[i]);
                }
            }
        });
        // Create the drag-and-drop zone
        let goFileBase64 = "data:image/png;base64,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"

        var dropZoneText = `<img style="height: 32px; vertical-align:middle;padding-right: 5px; padding-bottom: 5px;" src="${goFileBase64}" height="32px" title="" /><div style="vertical-align:middle">GoFile Upload (Drag & Drop)</div>`
        let dropZone = $('<div>', {
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
        //$('.fr-word-counter').after(dropZone);

        // Container for progress bars
        let progressContainer = $('<div>', {
            id: 'progress-container'
        }).css({
            'margin-top': '10px',
            'width': '97%',
            'display':'block'
        });

        dropZone.after(progressContainer);
        $('.fr-word-counter').after(masterContainer);
        $("#masterContainer").append((goFileContainer));
        $("#masterContainer").append((imgBBContainer));
        $("#goFileContainer").append((dropZone));
        $("#goFileContainer").append('<input type="file" id="fileInput" multiple style="display: none;">');
        $("#goFileContainer").append((progressContainer));
        $("#imgBBContainer").append((dropZone2));
        $("#imgBBContainer").append((progressContainer2));
        $("#imgBBContainer").append('<input type="file" id="fileInput2" multiple style="display: none;">');

        // Drag and drop handlers
        dropZone.on('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border-color', '#D2822D');
        });

        dropZone.on('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border-color', '#D2822D');
        });

        dropZone.on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border-color', '#D2822D');

            let files = e.originalEvent.dataTransfer.files;
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    uploadFileToGofile(files[i]);
                }
            }
        });
        $('#gofile-dropzone').click(function () {
            $('#fileInput').click();
        });
        $('#fileInput').on('change', function (event) {
            const files = event.target.files;
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    uploadFileToGofile(files[i]);
                }
            }
        });
        $('#imgbb-dropzone').click(function () {
            $('#fileInput2').click();
        });
        $('#fileInput2').on('change', function (event) {
            const files = event.target.files;
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    uploadFileToImgBB(files[i]);
                }
            }
        });
        $("#xfBbCode-1").click(function () {
            $(this).toggleClass("fr-active")
                .trigger('classChanged');
        });

        $("#xfBbCode-1").on(
            "classChanged", function () {
                if ($('#xfBbCode-1').hasClass("fr-active") && $('#bbCodeNotification').length === 0) {
                $("#masterContainer").before('<div id="bbCodeNotification" style="font-weight: bold; color: #D2822D; text-align: center">BB Code is currently active – links of uploaded files will not be automatically added to text box.</div>');
            }
            if (!$('#xfBbCode-1').hasClass("fr-active") && $('#bbCodeNotification').length > 0) {
                $("#bbCodeNotification").remove();
            }
            });

        function uploadFileToImgBB(file2) {
            let formData2 = new FormData();
            formData2.append('image', file2);

            // Create progress bar for each file
            let progressBarWrapper2 = $('<div>', {
                class: 'progress-bar-wrapper',
                text: `Uploading ${file2.name}...`
            }).css({
                'margin-bottom': '10px'
            });

            let progressBar2 = $('<div>', {
                class: 'upload-progress-bar'
            }).css({
                'width': '0%',
                'height': '5px',
                'background-color': '#23A8E0',
                'margin-top': '5px'
            });

            progressBarWrapper2.append(progressBar2);
            progressContainer2.append(progressBarWrapper2);
            var apiKey = 'ccbf4ad10414412d68ec86af720fc137'
            // Upload to Gofile.io
            $.ajax({
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
                        let urlViewer = response.data.url_viewer
                        let fileID2 = response.data.id
                        insertLinkIntoEditor2(imageLink2);
                        progressBarWrapper2.html(`<span style="color:#23A8E0;font-weight: bold">Uploaded:</span> ${file2.name}`);
                        progressBarWrapper2.append(`<a href="${urlViewer}" target="_blank"> [imgBB Page]</a><a href="${imageLink2}" target="_blank" id='${fileID2}'> [Direct Link]</a>`);
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
            let editor = $('.fr-element.fr-view'); // Target the inline editor
            editor.append(`<p>[IMG]${imageLink2}[/IMG]</p>`);
        }
        // File upload function with progress
        function uploadFileToGofile(file) {
            let formData = new FormData();
            formData.append('file', file);

            // Create progress bar for each file
            let progressBarWrapper = $('<div>', {
                class: 'progress-bar-wrapper',
                text: `Uploading ${file.name}...`
            }).css({
                'margin-bottom': '10px'
            });

            let progressBar = $('<div>', {
                class: 'upload-progress-bar'
            }).css({
                'width': '0%',
                'height': '5px',
                'background-color': '#D2822D',
                'margin-top': '5px'
            });

            progressBarWrapper.append(progressBar);
            progressContainer.append(progressBarWrapper);

            // Upload to Gofile.io
            $.ajax({
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
                        progressBarWrapper.html(`<span style="color:#D2822D;font-weight: bold">Uploaded:</span> ${file.name}`);
                        progressBarWrapper.append(`<a href="${link}" target="_blank"> [GoFile Page]</a><a href="${downloadLink}" target="_blank" id='${fileID}'> [Direct Link]</a>`);
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
            let editor = $('.fr-element.fr-view'); // Target the inline editor
            editor.append(`<p>${link}</p>`);
            editor.append(`<p>[SIZE=5][B]${fileName}[/B][/SIZE]</p>`);
            editor.append(`<p>[SIZE=4][URL='${directDownload}']Download Link[/URL][/SIZE]</p>`);
            editor.append(`<p>[IMG]${thumbnail}[/IMG]</p>`);
        }
    });
