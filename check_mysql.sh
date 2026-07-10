#!/bin/bash
sudo mysql -e "SELECT User, Host, plugin FROM mysql.user WHERE User='gassolutions';"
