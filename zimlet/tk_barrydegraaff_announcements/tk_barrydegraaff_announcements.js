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
   try {
      if(!this.AnnounceTab)
      {
         this.AnnounceTab = this.createApp("Announcements", "", "Announcements",0);
         var appHeight = (Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )-110 );
         
         var zimletInstance = appCtxt._zimletMgr.getZimletByName('tk_barrydegraaff_announcements').handlerObject;
         var app = appCtxt.getApp(this.AnnounceTab);
         app.activate(true, this.AnnounceTab);
         app.setContent('<table><tr><td><div id="Announcements" style="padding:10px;width:800px; height:'+appHeight+'px; border:0px;overflow: scroll;z-index:400"></div></td><td><iframe style="padding:10px;width:400px; height:'+appHeight+'px; border:0px;overflow: scroll;z-index:400" src="'+zimletInstance.getResource('/rss/index.html')+'"></td></tr></table>');
         var overview = app.getOverview(); // returns ZmOverview
         overview.setContent('<div id="Announcements-Left" style="padding:10px;"><img style="width:80%; height:auto" src="'+zimletInstance.getResource('logo.svg')+'"><h2 style="color:red">Links</h2>&bull; <a style="color:red; font-size:14px;" href="https://hivos.myscienta.com" target="_blank">Scienta</a><br></div>');
         overview._setAllowSelection();      
         var toolbar = app.getToolbar(); // returns ZmToolBar
         toolbar.createButton("AddAnnouncement", {text: "Add Announcement"});
         toolbar.addSelectionListener("AddAnnouncement", new AjxListener(this, this.addAnnouceOrComment));         
         app.launch();    
      }
      else
      {
         var app = appCtxt.getApp(this.AnnounceTab);
         app.launch();
      }
   } catch (err) { console.log (err)} 

   var soapDoc = AjxSoapDoc.create("Announcements", "urn:Announcements", null);
   soapDoc.getMethod().setAttribute("action", "getAnnouncements");
   var params = {
   soapDoc: soapDoc,
   asyncMode: true,
   callback: new AjxCallback(void 0, this.showContent)
   };
   appCtxt.getAppController().sendRequest(params);
}
    
AnnouncementsZimlet.prototype.showContent = function (content)
{
   var announcements = content._data.AnnouncementsResponse.content;
   var resultHTML = "";var zimletInstance = appCtxt._zimletMgr.getZimletByName('tk_barrydegraaff_announcements').handlerObject;
   announcements.forEach(function(announcement) {
      resultHTML = resultHTML + "<h2 style=\"color:red; margin-bottom:0px;\">"+AnnouncementsZimlet.prototype.escapeHtml(announcement.title)+"</h2><small style=\"margin-top:-5px;\">"+AnnouncementsZimlet.prototype.escapeHtml(announcement.createDate)+" "+AnnouncementsZimlet.prototype.escapeHtml(announcement.userName)+"</small>"+AnnouncementsZimlet.prototype.escapeHtml(announcement.content)+
      "<br><table><tr><td><div style=\"width:37px; height:19px; color: white; text-align:center; padding-top:2px;  background-repeat: no-repeat; overflow:hidden; background-image:url('"+zimletInstance.getResource('comment.png')+"')\">0</div></td><td>&nbsp;&nbsp;<button style=\"height:20px; \" onclick=\"AnnouncementsZimlet.prototype.status('urft')\">Add comment</button></td></tr></table><hr style=\"border:none; height:1px; color:red; background-color:red;\">";
   });
   document.getElementById('Announcements').innerHTML = resultHTML;

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

AnnouncementsZimlet.prototype.escapeHtml =
function (unsafe) {
    if(unsafe)
    {
       return DOMPurify.sanitize(unsafe);
    }   
};

AnnouncementsZimlet.prototype.addAnnouceOrComment = function(isComment) {
   var addAnnouceOrComment = new DwtDialog({parent: appCtxt.getShell(), disposeOnPopDown: true});
   var composite = new DwtComposite({ parent: addAnnouceOrComment });

  addAnnouceOrComment.setView(composite);

  var input = new DwtInputField({
    parent: composite,
    className: 'announceTxt',
    hint: 'Announcement Title',
    id: 'announceTitle'
  });

  addAnnouceOrComment.dwtext = new ZmHtmlEditor({parent: composite});
  addAnnouceOrComment.dwtext.setMode("text/html");
  addAnnouceOrComment.dwtext.setSize(600,400); 
  addAnnouceOrComment.dwtext.setContent("");

  var files = new DwtInputField({
    parent: composite,
    className: 'announceTxt',
    id: 'announceFile'
  });

  composite.setSize(610,500); 
  addAnnouceOrComment.setTitle('New Announcement');
  addAnnouceOrComment.setButtonListener(DwtDialog.OK_BUTTON, new AjxListener(this, this.addAnnouceOrCommentCallback, [input, addAnnouceOrComment]));
  addAnnouceOrComment.addEnterListener(new AjxListener(this, this._renameFileCallback, [input, addAnnouceOrComment]));
  //add tab group and focus on the input field
  addAnnouceOrComment._tabGroup.addMemberBefore(addAnnouceOrComment.dwtext,addAnnouceOrComment._tabGroup.getFirstMember());
  addAnnouceOrComment._tabGroup.addMemberBefore(input, addAnnouceOrComment.dwtext);
  addAnnouceOrComment._tabGroup.setFocusMember(input);  
  addAnnouceOrComment.popup();
  document.getElementById('announceFile').innerHTML = '<b>Attachments</b><br><input type="file" multiple name="attachments" id="announceAttach">';
};

AnnouncementsZimlet.prototype.addAnnouceOrCommentCallback = function (input, addAnnouceOrComment)
{
   console.log(input.getValue());
   console.log(addAnnouceOrComment.dwtext.getContent());
   try {
      addAnnouceOrComment.setContent('');
      addAnnouceOrComment.popdown();
   } catch(err){}
}
