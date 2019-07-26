document.addEventListener("DOMContentLoaded", () => {

    // Setup Constants

    const attributeSource = "src";
    const attributeWidth = "width";
    const attributeHeight = "height";
    const attributeLink = "href";
    const attributeDisabled = "disabled";

    const classHidden = "d-none";

    const eventChange = "change";
    const eventClick = "click";

    // Setup Elements

    const name = document.getElementById("name");
    const frame = document.getElementById("frame");
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
            capture.removeAttribute(attributeDisabled);
            clear.removeAttribute(attributeDisabled);
        } else {
            overlay.classList.add(classHidden);
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
            alert(message); // TODO: Change To Bootstrap Alert
        }
    };

    const getVideoConstraints = function() {
        switch (orientation.value) {
            case "default":
                return true;
            case "standard":
                return {
                    "facingMode": "environment"
                };
            case "selfie":
                return {
                    "facingMode": "user"
                };
            default:
                return false;
        }
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
                .catch(() => {
                    toggleInputs(false);
                    cameraConnect(null);
                    messageUser("Unable to connect to camera. Please change permissions and/or reload the page.");
                });
        } else {
            messageUser("Unable to connect to camera.");
        }
    };

    const cameraCapture = function(enabled) {
        if (enabled) {
            canvas.classList.add(classHidden);
            canvas.setAttribute(attributeWidth, stream.clientWidth);
            canvas.setAttribute(attributeHeight, stream.clientHeight);
            canvas.getContext("2d").drawImage(stream, 0, 0, stream.clientWidth, stream.clientHeight);
            output.setAttribute(attributeSource, canvas.toDataURL("image/png"));
        } else {
            canvas.classList.remove(classHidden);
            canvas.setAttribute(attributeWidth, 0);
            canvas.setAttribute(attributeHeight, 0);
            canvas.getContext("2d").drawImage(null, 0, 0, 0, 0);
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

    orientation.addEventListener(eventChange, () => {
        cameraEnable();
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
    cameraEnable();

});
