Xbox + Node + Hue + Pi
=============

Use an [Xbox 360 controller](http://www.amazon.co.uk/Official-Xbox-Common-Controller-Windows/dp/B004JU0JSK/ref=sr_1_1?s=videogames&ie=UTF8&qid=1410824220&sr=1-1&keywords=xbox+wired+controller) to control [ Phillips Hue lights](http://www2.meethue.com) via [node.js](http://nodejs.org) on a [Raspberry Pi](http://www.raspberrypi.org).

All confgured via a Web UI run across the LAN from the Pi.

![Configuration UI screenshot.](http://jkg3.com/images/231.png)

## Getting Started

_*Note:* This app is only tested running in Raspbian on the Raspberry Pi. Should work on other linux's wont work on Windows or Mac OS X_

1. Plug in Xbox Controller to any USB port 
2. Download & Install Xbox Driver `sudo apt-get install xboxdrv`
3. Download the [latest release](https://github.com/JamieKnight/xbox-node-hue/releases)
4. Unzip into local directory and change into that director
5. Modfy `/module/lamps.js` with the details for you hue bride account (follow the setup guide at http://www.developers.meethue.com/documentation/getting-started)
6. Run `npm install`
7. Run `xboxdrv --silent &` to run driver and place into background.
8. Run `node app.js`
9. Press buttons on your controller, see colors change.
10. Marvel in awe.


