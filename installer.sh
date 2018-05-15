#! /bin/bash

apt-get -y update

#INSTALL NODE
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
npm install -g n
n latest

apt-get install -y build-essential libudev-dev

npm install -g pm2
npm install -g node-gyp
# npm install

pm2 start index.js --name=RESTAURANT_SERVICE --watch
pm2 save
pm2 startup

apt-get install -y mongodb-server
sudo service mongodb enable
sudo service mongodb start

echo "

network={
    ssid=\"NUGO-TI\"
    psk=\"wifi@nugopraiati\"
}

" >> "/etc/wpa_supplicant/wpa_supplicant.conf"


reboot
