#! /bin/bash

apt-get -y update
#apt-get upgrade

#INSTALL NODE
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
npm install -g n
n latest

apt-get install -y build-essential libudev-dev

npm install -g pm2
npm install -g node-gyp

#INSTALL MONGO
apt-get install -y mongodb-server
sudo service mongodb enable
sudo service mongodb start

pm2 start index.js --name=RESTAURANT_SERVICE --watch
pm2 save
pm2 startup

echo "
network={
    ssid=\"NUGO\"
    psk=\"583dkglexnf\"
}
" >> "/etc/wpa_supplicant/wpa_supplicant.conf"

reboot