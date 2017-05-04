Annoucements Portal
==========

If you find Annoucements Portal useful and want to support its continued development, you can make donations via:
- PayPal: info@barrydegraaff.tk
- Bank transfer: IBAN NL55ABNA0623226413 ; BIC ABNANL2A

This portal shows a list of announcements and RSS feeds in Zimbra as the first thing people see after login. Also People can
add new announcements or comment on them.

![https://raw.githubusercontent.com/Zimbra-Community/annoucements/master/announcements-screenshot.png](https://raw.githubusercontent.com/Zimbra-Community/annoucements/master/announcements-screenshot.png)

### Install prerequisites
  - Zimbra 8.7 and above

### Installing
Use the automated installer:

    wget https://raw.githubusercontent.com/Zimbra-Community/annoucements/master/announcement-installer.sh -O /tmp/announcement-installer.sh
    chmod +rx /tmp/announcement-installer.sh
    /tmp/tmp/announcement-installer.sh

    zmprov mc default zimbraFeaturePortalEnabled TRUE
    zmprov mc default zimbraPortalName tk_barrydegraaff_announcements

Optional, configure your feeds and allow Zimbra to fetch them:

    zmprov mc default +zimbraProxyAllowedDomains zimbra.com
    zmprov mc default +zimbraProxyAllowedDomains nextcloud.com
    
Set configurable options here: /opt/zimbra/zimlets-deployed/_dev/tk_barrydegraaff_announcements/config_template.xml

 
### Known issues

- The feed reader reads RSS feeds, not ATOM feeds.
