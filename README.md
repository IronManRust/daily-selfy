# Daily Selfy

[https://ironmanrust-daily-selfy.netlify.app](https://ironmanrust-daily-selfy.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d54be578-7f6e-43c7-954b-c299746a318b/deploy-status)](https://app.netlify.com/sites/ironmanrust-daily-selfy/deploys)

## Summary

Capture a picture a day for use in time-lapse animations.

## Background

Have you ever wanted to make a long-duration selfie time-lapse animation, but were turned off by overly-complicated Android and iOS apps? I was, so I made this.

Details:

* Nothing to install - it's just a fully-responsive HTML5 webpage. However, if you'd prefer offline support, it can be installed and used as a progressive web application.
* No cloud storage to deal with - save your images directly to your device.
* Works equally well with laptops (default orientation) and phones/tablets (standard or selfie orientation).
* When taking selfies, optionally overlay a face-shaped frame to assist with aligning your image and cut down on required post-processing work.

## Screenshot

![Screenshot](screenshot.png)

## Post-Processing

To make a video out of the selfie images, use the following shell script:

`ffmpeg -framerate 1 -pattern_type glob -i "*.png" video.mp4`

Explanation:

* `ffmpeg` - [https://www.ffmpeg.org](https://www.ffmpeg.org)
* `-framerate 1` - Set the framerate to 1 fps; adjust as desired.
* `-pattern_type glob` - Use glob pattern matching for input files.
* `-i "*.png"` - Sequentially match all `.png` files in the current directory as input.
* `video.mp4` - Set the output file name.

FFmpeg has many additional options to adjust settings such as video resolution and codec used, but this should provide a sane, basic output.
