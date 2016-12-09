# Annoucements
Show a list of announcements in Zimbra as the first thing people see after login.

[https://raw.githubusercontent.com/Zimbra-Community/annoucements/master/announcements-screenshot.png](https://raw.githubusercontent.com/Zimbra-Community/annoucements/master/announcements-screenshot.png)

# To install `Portal` version:

     cat manifest.xml > /opt/zimbra/jetty-distribution-9.3.5.v20151012/webapps/zimbra/portals/example/manifest.xml
     cat tk_barrydegraaff_announcements-portal.js > /media/iso/opt/zimbra/zimlets-deployed/_dev/tk_barrydegraaff_announcements/tk_barrydegraaff_announcements.js

     And do:
     zmprov ma admin@myzimbra.com zimbraFeaturePortalEnabled TRUE

 
