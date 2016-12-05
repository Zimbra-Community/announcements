/*
 Copyright (C) 2016  Barry de Graaff

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see http://www.gnu.org/licenses/.
 */

function tk_barrydegraaff_announcements_HandlerObject() {
}

tk_barrydegraaff_announcements_HandlerObject.prototype = new ZmZimletBase();
tk_barrydegraaff_announcements_HandlerObject.prototype.constructor = tk_barrydegraaff_announcements_HandlerObject;
var AnnouncementsZimlet = tk_barrydegraaff_announcements_HandlerObject;

AnnouncementsZimlet.prototype.init =
  function () {
    // Initialize the zimlet

   try {
      if(!this.AnnounceTab)
      {
         this.AnnounceTab = this.createApp("Announcements", "", "Announcements",0);
         var zimletInstance = appCtxt._zimletMgr.getZimletByName('tk_barrydegraaff_announcements').handlerObject;
         var app = appCtxt.getApp(this.AnnounceTab);
         app.activate(true, this.AnnounceTab);
         app.setContent('<div id="Announcements" style="padding:10px;">Test</div>');
         var overview = app.getOverview(); // returns ZmOverview
         overview.setContent('<div id="Announcements-Left" style="padding:10px;">Announcements-Left</div>');
        // var child = document.getElementById(overview._htmlElId);
        // child.parentNode.removeChild(child);
      
         var toolbar = app.getToolbar(); // returns ZmToolBar
         //toolbar.dispose();
         toolbar.createButton("AddAnnouncement", {text: "Add Accouncement"});
         toolbar.addSelectionListener("AddAnnouncement", new AjxListener(this, this.AddAnnouncement));         
         app.launch();    
      }
      else
      {
         var app = appCtxt.getApp(this.AnnounceTab);
         app.launch();
      }
   } catch (err) { console.log (err)} 

   var soapDoc = AjxSoapDoc.create("Announcements", "urn:Announcements", null);
   soapDoc.getMethod().setAttribute("type", "all");
   soapDoc.getMethod().setAttribute("user", "test@domain.com");
   var params = {
   soapDoc: soapDoc,
   asyncMode: true,
   callback: new AjxCallback(void 0, this._parseResponse)
   //,
   //errorCallback: new AjxCallback(void 0, ._handleError, [action, errorCallback])
   };
   
   appCtxt.getAppController().sendRequest(params);


}
    
AnnouncementsZimlet.prototype._parseResponse = function (args)
{
   console.log(args);
}
    
AnnouncementsZimlet.prototype.status =
  function(text, type) {
    var transitions = [ ZmToast.FADE_IN, ZmToast.PAUSE, ZmToast.PAUSE, ZmToast.PAUSE, ZmToast.FADE_OUT ];
    appCtxt.getAppController().setStatusMsg(text, type, null, transitions);
  };

AnnouncementsZimlet.prototype.AddAnnouncement = function() {
   alert('Not yet implemented');
}

AnnouncementsZimlet.prototype.appLaunch =
  function(appName) {
  
};

AnnouncementsZimlet.prototype.onSelectApp = function (appName) {

};

AnnouncementsZimlet.prototype.appActive =
  function(appName, active) {

};
