// ==UserScript==
// @name         KICOWNIK
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Do działania na NI potrzebny wykrywacz włączony
// @author       Nolifequ
// @icon         https://cdn-icons-png.flaticon.com/512/523/523442.png
// @match        https://fobos.margonem.pl/
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Nolif1/kicownik/main/kic-resp.user.js
// @downloadURL  https://raw.githubusercontent.com/Nolif1/kicownik/main/kic-resp.user.js
// ==/UserScript==

(function() {
    'use strict';

    const accessTokens = [
        'o.15n00HNr0a2cTae4bNX9B6mTh290U4eh',
        'o.zPfR1mkUeCLjaChOxwC3P9CYAEUZLOjt',
    ];

    let notificationCount = 0;
    const maxNotifications = 1;

    function sendPushbulletNotification(title, body) {
        const url = 'https://api.pushbullet.com/v2/pushes';
        const data = {
            type: 'note',
            title: title,
            body: body,
        };

        accessTokens.forEach(token => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('powiadomienie wysłane:', data);
            })
            .catch(error => {
                console.error('błąd:', error);
            });
        });
    }

    function checkForMob() {
        if (notificationCount >= maxNotifications) {
            return;
        }

        const mobName = 'Zabójczy Królikk';
        const elements = document.querySelectorAll('*');
        let found = false;

        elements.forEach(element => {
            if (element.textContent.includes(mobName)) {
                found = true;
            }
        });

        if (found) {
            sendPushbulletNotification('Zabójczy Królik (tytan 70lvl)', 'Jaskinia Caerbannoga (29,17)');
            notificationCount++;

            if (notificationCount >= maxNotifications) {
                clearInterval(checkInterval);
            }
        }
    }

    const checkInterval = setInterval(checkForMob, 1000);
})();
