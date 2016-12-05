#!/bin/bash

# Copyright (C) 2016  Barry de Graaff
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 2 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see http://www.gnu.org/licenses/.

set -e
# if you want to trace your script uncomment the following line
# set -x

# Make sure only root can run our script
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

ANNOUNCEMENTS_PWD=$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-10};echo;)

echo "db_password=$ANNOUNCEMENTS_PWD" > /opt/zimbra/lib/ext/Announcements/db.properties

# creating a user, just to make sure we have one (for mysql on CentOS 6, so we can execute the next mysql queries w/o errors)
ANNOUNCEMENTS_DBCREATE="$(mktemp /tmp/announcements-dbcreate.XXXXXXXX.sql)"
cat <<EOF > "${ANNOUNCEMENTS_DBCREATE}"
CREATE DATABASE announcements_db CHARACTER SET 'UTF8'; 
CREATE USER 'ad-announcements_db'@'127.0.0.1' IDENTIFIED BY '${ANNOUNCEMENTS_PWD}'; 
GRANT ALL PRIVILEGES ON announcements_db . * TO 'ad-announcements_db'@'127.0.0.1' WITH GRANT OPTION; 
FLUSH PRIVILEGES ; 
EOF

/opt/zimbra/bin/mysql --force < "${ANNOUNCEMENTS_DBCREATE}" > /dev/null 2>&1

cat <<EOF > "${ANNOUNCEMENTS_DBCREATE}"
DROP USER 'ad-announcements_db'@'127.0.0.1';
DROP DATABASE announcements_db;
CREATE DATABASE announcements_db CHARACTER SET 'UTF8'; 
CREATE USER 'ad-announcements_db'@'127.0.0.1' IDENTIFIED BY '${ANNOUNCEMENTS_PWD}'; 
GRANT ALL PRIVILEGES ON announcements_db . * TO 'ad-announcements_db'@'127.0.0.1' WITH GRANT OPTION; 
FLUSH PRIVILEGES ; 
EOF

echo "Creating database and user"
/opt/zimbra/bin/mysql < "${ANNOUNCEMENTS_DBCREATE}"

if [ -d "/opt/zimbra/common/share/database/" ]; then
   #shipped version from Zimbra (8.7)
   cd /opt/zimbra/common/share/database/ >/dev/null
else
   #shipped version from Zimbra (8.6)
   cd /opt/zimbra/cbpolicy*/share/database/ >/dev/null
fi

echo "Populating announcements_db please wait..."
/opt/zimbra/bin/mysql announcements_db < /root/AnnouncementsEntry.sql
