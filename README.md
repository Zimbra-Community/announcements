Announcements Portal
==========

If you find Annoucements Portal useful and want to support its continued development, you can make donations via:
- PayPal: info@barrydegraaff.tk
- Bank transfer: IBAN NL55ABNA0623226413 ; BIC ABNANL2A

This portal shows a list of announcements and RSS feeds in Zimbra as the first thing people see after login. Also People can
add new announcements and comment on them. Spread the word in your organization!

![https://raw.githubusercontent.com/Zimbra-Community/announcements/master/announcements-screenshot.png](https://raw.githubusercontent.com/Zimbra-Community/announcements/master/announcements-screenshot.png)

### Features
  - Customizable colors
  - Configurable feeds
  - Deploy per cos or per user, what you want
  


### Install prerequisites
  - Zimbra 8.7 and above
  
Support for 8.6 at own risk. Place a [mariadb-java-client-1.1.8.jar](https://github.com/Zimbra-Community/announcements/raw/master/extra/mariadb-java-client-1.1.8.jar) in Jetty Lib folder:
/opt/zimbra/jetty-distribution-9.1.5.v20140505/common/lib/mariadb-java-client-1.1.8.jar   (remove this file when upgrading to 8.7)

### Installing
Use the automated installer:

    wget https://raw.githubusercontent.com/Zimbra-Community/announcements/master/announcement-installer.sh -O /tmp/announcement-installer.sh
    chmod +rx /tmp/announcement-installer.sh
    /tmp/announcement-installer.sh

    zmprov mc default zimbraFeaturePortalEnabled TRUE
    zmprov mc default zimbraPortalName tk_barrydegraaff_announcements

Optional, configure your feeds and allow Zimbra to fetch them:

    zmprov mc default +zimbraProxyAllowedDomains zimbra.com
    zmprov mc default +zimbraProxyAllowedDomains nextcloud.com
    
Set configurable options here: /opt/zimbra/zimlets-deployed/_dev/tk_barrydegraaff_announcements/config_template.xml

 
### Known issues

- The feed reader reads RSS feeds, not ATOM feeds.
