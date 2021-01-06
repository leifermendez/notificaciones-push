const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
/**
 * Settings VAPID
 */

const vapidKeys = {
    "publicKey": "BMtQTXeTAMb6dirLG0o2oMENske28eSfSRJkK6VEdXH9lcH3mwfEU7cza8hNhEnJOOyacb95QOeIFaTpPdFn8Xw",
    "privateKey": "eOLnIMyvDEhCWvwTOFax9MGbV0W8c_WTjZ_KCW1CREY"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {

    const pushSubscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/cvnWI1iv1n4:APA91bEXvhI0HVrovVh82lI4HhcRKGT6dh28Bs3PpUAthvy68tz54PxZaVNj18cIOk8rK6EuAxZ3DCBdHiFM-v3y6cyD_s--JON13JP8zpaBMJE1fZUmijtzwUIst3QWxkpWgeX4VnGE',
        keys: {
            auth: 'H1UaF1zNA1jPlVJw6nLAGQ',
            p256dh: 'BJIAsd0i40iAtHUinrAzNeR8UGb5HG8oEHCkcyPOda67i9UVIUhtWpD0ULEnITYX9pT8TlMTT6-ZdZFMO0-r7QE'
        }
    };

    const payload = {
        "notification": {
            "title": "😄😄 Saludos",
            "body": "Subscribete a mi canal de YOUTUBE",
            "vibrate": [100, 50, 100],
            "image": "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se envio subscribete!!' })

}

app.route('/api/enviar').post(enviarNotificacion);


const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});
