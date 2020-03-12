document.addEventListener("DOMContentLoaded", () => {

    // Setup Constants

    const attributeSource = "src";
    const attributeWidth = "width";
    const attributeHeight = "height";
    const attributeLink = "href";
    const attributeDisabled = "disabled";

    const classHidden = "d-none";
    const classRatio1by1 = "embed-responsive-1by1";
    const classRatio4by3 = "embed-responsive-4by3";
    const classRatio16by9 = "embed-responsive-16by9";
    const classRatio21by9 = "embed-responsive-21by9";

    const eventChange = "change";
    const eventClick = "click";

    // Setup Elements

    const name = document.getElementById("name");
    const frame = document.getElementById("frame");
    const ratio = document.getElementById("ratio");
    const resolution = document.getElementById("resolution");
    const dimensions = document.getElementById("dimensions");
    const orientation = document.getElementById("orientation");
    const overlay = document.getElementById("overlay");
    const stream = document.getElementById("stream");
    const canvas = document.getElementById("canvas");
    const capture = document.getElementById("capture");
    const clear = document.getElementById("clear");
    const standby = document.getElementById("standby");
    const output = document.getElementById("output");
    const download = document.getElementById("download");

    // Decalre Functions

    const toggleInputs = function(enabled) {
        if (enabled) {
            overlay.classList.remove(classHidden);
            overlay.removeAttribute(attributeDisabled);
            capture.removeAttribute(attributeDisabled);
            clear.removeAttribute(attributeDisabled);
        } else {
            overlay.classList.add(classHidden);
            overlay.setAttribute(attributeDisabled, true);
            capture.setAttribute(attributeDisabled, true);
            clear.setAttribute(attributeDisabled, true);
        }
    };

    const toggleResults = function(enabled) {
        if (enabled) {
            standby.classList.add(classHidden);
            output.classList.remove(classHidden);
            download.removeAttribute(attributeDisabled);
        } else {
            standby.classList.remove(classHidden);
            output.classList.add(classHidden);
            download.setAttribute(attributeDisabled, true);
        }
    };

    const messageUser = function(message) {
        if (message) {
            alert(message);
        }
    };

    const ratioSet = function() {
        const embeddedItems = document.getElementsByClassName("embed-responsive");
        for (const embeddedItem of embeddedItems) {
            embeddedItem.classList.remove(classRatio1by1);
            embeddedItem.classList.remove(classRatio4by3);
            embeddedItem.classList.remove(classRatio16by9);
            embeddedItem.classList.remove(classRatio21by9);
            switch (ratio.value) {
                case "1by1":
                    embeddedItem.classList.add(classRatio1by1);
                    break;
                case "4by3":
                    embeddedItem.classList.add(classRatio4by3);
                    break;
                case "16by9":
                    embeddedItem.classList.add(classRatio16by9);
                    break;
                case "21by9":
                    embeddedItem.classList.add(classRatio21by9);
                    break;
                default:
                    // Do Nothing
                    break;
            }
        }
    };

    const getVideoSizeWidth = function() {
        switch (resolution.value) {
            case "160l":
                return 160;
            case "320l":
                return 320;
            case "480l":
                return 480;
            case "640l":
                return 640;
            case "720l":
                return 720;
            case "800l":
                return 800;
            case "960l":
                return 960;
            case "1080l":
                return 1080;
            case "1280l":
                return 1280;
            case "1920l":
                return 1920;
            default:
                return null;
        }
    };

    const getVideoSizeHeight = function() {
        switch (resolution.value) {
            case "160p":
                return 160;
            case "320p":
                return 320;
            case "480p":
                return 480;
            case "640p":
                return 640;
            case "720p":
                return 720;
            case "800p":
                return 800;
            case "960p":
                return 960;
            case "1080p":
                return 1080;
            case "1280p":
                return 1280;
            case "1920p":
                return 1920;
            default:
                return null;
        }
    };

    const getVideoConstraints = function() {
        switch (orientation.value) {
            case "default":
                return {
                    "facingMode": null,
                    "width": {
                        "min": getVideoSizeWidth()
                    },
                    "height": {
                        "min": getVideoSizeHeight()
                    }
                };
            case "standard":
                return {
                    "facingMode": "environment",
                    "width": {
                        "min": getVideoSizeWidth()
                    },
                    "height": {
                        "min": getVideoSizeHeight()
                    }
                };
            case "selfie":
                return {
                    "facingMode": "user",
                    "width": {
                        "min": getVideoSizeWidth()
                    },
                    "height": {
                        "min": getVideoSizeHeight()
                    }
                };
            default:
                return false;
        }
    };

    const getCanvasMultiplier = function() {
        switch (ratio.value) {
            case "1by1":
                return 1;
            case "4by3":
                return 4 / 3;
            case "16by9":
                return 16 / 9;
            case "21by9":
                return 21 / 9;
            default:
                return 0;
        }
    };

    const getCanvasWidth = function() {
        switch (resolution.value) {
            case "160l":
                return 160;
            case "160p":
                return 160 / getCanvasMultiplier();
            case "320l":
                return 320;
            case "320p":
                return 320 / getCanvasMultiplier();
            case "480l":
                return 480;
            case "480p":
                return 480 / getCanvasMultiplier();
            case "640l":
                return 640;
            case "640p":
                return 640 / getCanvasMultiplier();
            case "720l":
                return 720;
            case "720p":
                return 720 / getCanvasMultiplier();
            case "800l":
                return 800;
            case "800p":
                return 800 / getCanvasMultiplier();
            case "960l":
                return 960;
            case "960p":
                return 960 / getCanvasMultiplier();
            case "1080l":
                return 1080;
            case "1080p":
                return 1080 / getCanvasMultiplier();
            case "1280l":
                return 1280;
            case "1280p":
                return 1280 / getCanvasMultiplier();
            case "1920l":
                return 1920;
            case "1920p":
                return 1920 / getCanvasMultiplier();
            default:
                return null;
        }
    };

    const getCanvasHeight = function() {
        switch (resolution.value) {
            case "160l":
                return 160 / getCanvasMultiplier();
            case "160p":
                return 160;
            case "320l":
                return 320 / getCanvasMultiplier();
            case "320p":
                return 320;
            case "480l":
                return 480 / getCanvasMultiplier();
            case "480p":
                return 480;
            case "640l":
                return 640 / getCanvasMultiplier();
            case "640p":
                return 640;
            case "720l":
                return 720 / getCanvasMultiplier();
            case "720p":
                return 720;
            case "800l":
                return 800 / getCanvasMultiplier();
            case "800p":
                return 800;
            case "960l":
                return 960 / getCanvasMultiplier();
            case "960p":
                return 960;
            case "1080l":
                return 1080 / getCanvasMultiplier();
            case "1080p":
                return 1080;
            case "1280l":
                return 1280 / getCanvasMultiplier();
            case "1280p":
                return 1280;
            case "1920l":
                return 1920 / getCanvasMultiplier();
            case "1920p":
                return 1920;
            default:
                return null;
        }
    };

    const dimensionsSet = function() {
        dimensions.value = `${Math.floor(getCanvasWidth())}x${Math.floor(getCanvasHeight())}`;
    };

    const cameraConnect = function(media) {
        stream.srcObject = media;
    };

    const cameraEnable = function() {
        const constraints = {
            "audio": false,
            "video": getVideoConstraints()
        };
        if (navigator &&
            navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia(constraints)
                .then((media) => {
                    toggleInputs(true);
                    cameraConnect(media);
                })
                .catch((error) => {
                    toggleInputs(false);
                    cameraConnect(null);
                    if (error &&
                        error.name) {
                        switch (error.name) {
                            case "AbortError":
                                messageUser("Unable to connect to camera - reason unknown.");
                                break;
                            case "NotAllowedError":
                                messageUser("Unable to connect to camera - invalid permissions.");
                                break;
                            case "NotFoundError":
                                messageUser("Unable to connect to camera - no valid hardware found.");
                                break;
                            case "NotReadableError":
                                messageUser("Unable to connect to camera - hardware issue detected.");
                                break;
                            case "OverconstrainedError":
                                messageUser(`Unable to connect to camera - invalid constraint (${error.constraint ? error.constraint : "unknown"}).`);
                                break;
                            case "SecurityError":
                                messageUser("Unable to connect to camera - disabled media support.");
                                break;
                            case "TypeError":
                                messageUser("Unable to connect to camera - invalid or insecure request.");
                                break;
                            default:
                                messageUser("Unable to connect to camera.");
                                break;
                        }
                    } else {
                        messageUser("Unable to connect to camera.");
                    }
                });
        } else {
            messageUser("Unable to connect to camera.");
        }
    };

    const cameraCapture = function(enabled) {
        if (enabled) {
            canvas.classList.add(classHidden);
            canvas.setAttribute(attributeWidth, getCanvasWidth());
            canvas.setAttribute(attributeHeight, getCanvasHeight());
            canvas.getContext("2d").drawImage(stream, 0, 0, getCanvasWidth(), getCanvasHeight());
            output.setAttribute(attributeWidth, getCanvasWidth());
            output.setAttribute(attributeHeight, getCanvasHeight());
            output.setAttribute(attributeSource, canvas.toDataURL("image/png"));
        } else {
            canvas.classList.remove(classHidden);
            canvas.removeAttribute(attributeWidth);
            canvas.removeAttribute(attributeHeight);
            output.removeAttribute(attributeWidth);
            output.removeAttribute(attributeHeight);
            output.removeAttribute(attributeSource);
        }
    };

    // Setup Event Listeners

    frame.addEventListener(eventChange, () => {
        switch (frame.value) {
            case "none":
                overlay.setAttribute(attributeSource, "./img/overlay-none.png");
                break;
            case "face":
                overlay.setAttribute(attributeSource, "./img/overlay-face.svg");
                break;
            default:
                // Do Nothing
                break;
        }
    });

    ratio.addEventListener(eventChange, () => {
        ratioSet();
        dimensionsSet();
        cameraEnable();
    });

    resolution.addEventListener(eventChange, () => {
        ratioSet();
        dimensionsSet();
        cameraEnable();
    });

    orientation.addEventListener(eventChange, () => {
        ratioSet();
        dimensionsSet();
        cameraEnable();
    });

    overlay.addEventListener(eventClick, () => {
        if (stream.srcObject !== null) {
            toggleResults(true);
            cameraCapture(true);
        } else {
            toggleResults(false);
            cameraCapture(false);
            messageUser("Unable to capture image.");
        }
    });

    capture.addEventListener(eventClick, () => {
        if (stream.srcObject !== null) {
            toggleResults(true);
            cameraCapture(true);
        } else {
            toggleResults(false);
            cameraCapture(false);
            messageUser("Unable to capture image.");
        }
    });

    clear.addEventListener(eventClick, () => {
        toggleResults(false);
        cameraCapture(false);
    });

    download.addEventListener(eventClick, () => {
        const prefix = name.value
            ? `${name
                .value
                .trim()
                .toLowerCase()
                .replace(/ +/g, "-")}-`
            : "";
        const date = new Date();
        const dateYear = (date.getFullYear() + 0)
            .toString()
            .padStart(4, "0");
        const dateMonth = (date.getMonth() + 1)
            .toString()
            .padStart(2, "0");
        const dateDay = (date.getDate() + 0)
            .toString()
            .padStart(2, "0");
        const element = document.createElement("a");
        element.classList.add(classHidden);
        element.setAttribute(attributeLink, output.src);
        element.setAttribute("download", `${prefix}${dateYear}-${dateMonth}-${dateDay}.png`);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });

    // Initialize Default State

    toggleInputs(false);
    toggleResults(false);
    ratioSet();
    dimensionsSet();
    cameraEnable();

});
