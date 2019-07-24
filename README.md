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
  - Zimbra 8.8.15
  

### Installing
Use the automated installer:

    wget https://raw.githubusercontent.com/Zimbra-Community/announcements/master/announcement-installer.sh -O /tmp/announcement-installer.sh
    chmod +rx /tmp/announcement-installer.sh
    /tmp/announcement-installer.sh

    Enable for a COS:
    zmprov mc default zimbraFeaturePortalEnabled TRUE
    zmprov mc default zimbraPortalName tk_barrydegraaff_announcements

    Or for a single user:
    zmprov ma admin@myzimbra.com zimbraFeaturePortalEnabled TRUE

Optional, configure your feeds and allow Zimbra to fetch them:

    zmprov mc default +zimbraProxyAllowedDomains zimbra.com
    zmprov mc default +zimbraProxyAllowedDomains nextcloud.com
    
Set configurable options here: [config_template.xml](https://raw.githubusercontent.com/Zimbra-Community/announcements/master/zimlet/tk_barrydegraaff_announcements/config_template.xml)

 
### Known issues

- The feed reader reads RSS feeds, not ATOM feeds.
