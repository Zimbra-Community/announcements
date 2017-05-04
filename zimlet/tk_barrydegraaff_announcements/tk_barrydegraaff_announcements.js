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

};

tk_barrydegraaff_announcements_HandlerObject.prototype = new ZmZimletBase();
tk_barrydegraaff_announcements_HandlerObject.prototype.constructor = tk_barrydegraaff_announcements_HandlerObject;
var AnnouncementsZimlet = tk_barrydegraaff_announcements_HandlerObject;

AnnouncementsZimlet.prototype.init = function () {
   var zimletInstance = appCtxt._zimletMgr.getZimletByName('tk_barrydegraaff_announcements').handlerObject;
   if(document.getElementById('AnnouncementPortal'))
   {
      ZmPortalApp.prototype.refreshPortlets = function() 
      {
         AnnouncementsZimlet.prototype.addAnnouceOrComment();
         /*var soapDoc = AjxSoapDoc.create("Announcements", "urn:Announcements", null);
         soapDoc.getMethod().setAttribute("action", "getAnnouncements");
         var params = {
            soapDoc: soapDoc,
            asyncMode: true,
            callback: new AjxCallback(void 0, AnnouncementsZimlet.prototype.showContent)
         };
         appCtxt.getAppController().sendRequest(params);      */
      };
      
      document.getElementById('zb__PORTAL__REFRESH_title').innerHTML = 'Add Announcement';
      document.getElementById('zb__PORTAL__REFRESH_title').title="";
                       
      document.getElementById('AnnouncementPortal').innerHTML = document.getElementById('AnnouncementPortal').innerHTML + '<table><tr><td style="vertical-align:top"><div id="Announcements" style="padding-left:10px;width:760px; border:0px;"></div></td><td style="vertical-align:top"><div class="feedtitle">Hivos.org news</div><div id=\"feed1\"></div><br><br><div class="feedtitle">Vacancies</div><div id=\"feed2\"></div><br><br><div class="feedtitle">Zimbra on your device</div><div id=\"feed3\"></div></td></tr></table>'; 
      
      var soapDoc = AjxSoapDoc.create("Announcements", "urn:Announcements", null);
      soapDoc.getMethod().setAttribute("action", "getAnnouncements");
      var params = {
         soapDoc: soapDoc,
         asyncMode: true,
         callback: new AjxCallback(void 0, this.showContent)
      };
      appCtxt.getAppController().sendRequest(params);      
      AnnouncementsZimlet.prototype.timer();
   }
};

AnnouncementsZimlet.prototype.timer = function ()
{
   
   setTimeout(function(){      
      var soapDoc = AjxSoapDoc.create("Announcements", "urn:Announcements", null);
      soapDoc.getMethod().setAttribute("action", "getAnnouncements");
      var params = {
      soapDoc: soapDoc,
      asyncMode: true,
      callback: new AjxCallback(void 0, AnnouncementsZimlet.prototype.showContent)
      };
      appCtxt.getAppController().sendRequest(params);      
      AnnouncementsZimlet.prototype.timer();
   },60000);
};
    
AnnouncementsZimlet.prototype.showContent = function (content)
{
   try {
      var announcements = content._data.AnnouncementsResponse.content;
      var resultHTML = "";
      var zimletInstance = appCtxt._zimletMgr.getZimletByName('tk_barrydegraaff_announcements').handlerObject;
      announcements.forEach(function(announcement) {
         resultHTML = resultHTML + "<div class=\"announcementTitle\">"+AnnouncementsZimlet.prototype.escapeHtml(announcement.title)+"<div title=\"Show comments\" onclick=\"AnnouncementsZimlet.prototype.showComments("+announcement.entryId+")\" style=\"cursor:pointer;width:37px; height:19px; color: red; text-align:center; padding-top:2px;  background-repeat: no-repeat; overflow:hidden; float:right; background-image:url('"+zimletInstance.getResource('comment-white.png?1')+"')\">"+AnnouncementsZimlet.prototype.escapeHtml(announcement.comments)+"</div></div><div class=\"announcementBody\">"+
         "<small class=\"annoucementMeta\">"+AnnouncementsZimlet.prototype.escapeHtml(announcement.createDate.substring(0,announcement.createDate.length-5))+" "+
         AnnouncementsZimlet.prototype.escapeHtml(announcement.userName)+"</small><br><br>"+AnnouncementsZimlet.prototype.escapeHtml(announcement.content);
         
         if(announcement.url)
         {
            resultHTML = resultHTML + " <a href='"+AnnouncementsZimlet.prototype.escapeHtml(announcement.url)+"'>"+AnnouncementsZimlet.prototype.escapeHtml(announcement.url)+"</a>";
         }
         
         resultHTML = resultHTML + "<div class=\"announcementFooter\"><a title=\"Add comments\" onclick=\"AnnouncementsZimlet.prototype.addAnnouceOrComment("+announcement.entryId+")\"><img src=\""+zimletInstance.getResource('plus.png')+"\"></a><a title=\"Scroll to top\" onclick=\"location.href='#announcementTop'\"><img src=\""+zimletInstance.getResource('top-arrow.png')+"\"></a></div></div><div id=\"commentsFor"+announcement.entryId+"\"></div><br>";
      });
      document.getElementById('Announcements').innerHTML = resultHTML;
      AnnouncementsZimlet.prototype.setPhoneHelp();
      
      var divs = document.getElementsByClassName('announcementBody');
      for (var i = 0; i < divs.length; i++) {
          var a = divs[i].getElementsByTagName('a');
          for (var j = 0; j < a.length; j++) {
              var elem = a[j];
              elem.setAttribute('target', '_blank');
          }
      }   
   } catch (err)
   {
      console.log(err);
      //ignore   
   }
   
   //to-do: read this from config, for loop it   
   AnnouncementsZimlet._feed = 'https://www.hivos.org/news.xml';
	var postCallback = null;
	postCallback = new AjxCallback(this, AnnouncementsZimlet.prototype._displayRSSResultsDialog, ["feed1"]);
	AnnouncementsZimlet.prototype._invoke(postCallback);
   
   AnnouncementsZimlet._feed = 'https://www.hivos.org/vacancies/all/rss.xml';
	var postCallback = null;
	postCallback = new AjxCallback(this, AnnouncementsZimlet.prototype._displayRSSResultsDialog, ["feed2"]);
	AnnouncementsZimlet.prototype._invoke(postCallback);
};

AnnouncementsZimlet.prototype.showComments = function (entryId)
{
   var soapDoc = AjxSoapDoc.create("Announcements", "urn:Announcements", null);
   soapDoc.getMethod().setAttribute("action", "getComments");
   soapDoc.getMethod().setAttribute("entryId", entryId);      
   
   var params = {
   soapDoc: soapDoc,
   asyncMode: true,
   callback: new AjxCallback(void 0, this.showCommentsCallback)
   };
   appCtxt.getAppController().sendRequest(params);   
};

AnnouncementsZimlet.prototype.showCommentsCallback = function (content)
{
   var announcements = content._data.AnnouncementsResponse.content;
   var resultHTML = "";
   var entryId = "";
   var zimletInstance = appCtxt._zimletMgr.getZimletByName('tk_barrydegraaff_announcements').handlerObject;
   if(announcements)
   {
      announcements.forEach(function(announcement) {
         entryId = announcement.entryId;
         resultHTML = resultHTML + "<div class=\"commentBody\">"+
         "<small class=\"annoucementMeta\">"+AnnouncementsZimlet.prototype.escapeHtml(announcement.createDate.substring(0,announcement.createDate.length-5))+" "+
         AnnouncementsZimlet.prototype.escapeHtml(announcement.userName)+"</small><br><br>"+AnnouncementsZimlet.prototype.escapeHtml(announcement.content) +
         "</div>";
      });
      document.getElementById('commentsFor'+entryId).innerHTML = resultHTML;
     
      var divs = document.getElementsByClassName('announcementBody');
      for (var i = 0; i < divs.length; i++) {
          var a = divs[i].getElementsByTagName('a');
          for (var j = 0; j < a.length; j++) {
              var elem = a[j];
              elem.setAttribute('target', '_blank');
          }
      }   
   }
};

AnnouncementsZimlet.prototype.setPhoneHelp = function()
{
   var username = appCtxt.getActiveAccount().name.match(/.*@/);
   username = username[0].replace('@','');
   
   document.getElementById('feed3').innerHTML ='<div style="width:100%; margin:0px;height:100%; border:0px;">Here are some video links to help you configure Zimbra on your smart phone. Choose your device: <ul><li><a target="_blank" href="https://youtu.be/unZR7G8oIPw">iPhone</a></li><li><a target="_blank" href="https://youtu.be/fWyT--AVuSU">Android</a></li><li><a target="_blank" href="https://youtu.be/HvsNo6Wqf3Q">Windows Phone</a></li></ul><b>Other devices and laptops</b><table><tbody><tr><td style="width: 100px;">What?</td><td style="width: 100px;">Protocol</td><td style="width: 100px;">Server</td><td style="width: 100px;">Port</td><td style="width: 100px;">Security</td></tr><tr><td style="width: 100px;">Incoming mail</td><td style="width: 100px;">IMAP</td><td style="width: 100px;">mail.hivos.org</td><td style="width: 100px;">993</td><td style="width: 100px;">SSL/TLS</td></tr><tr><td style="width: 100px;">Outgoing mail</td><td style="width: 100px;">SMTP</td><td style="width: 100px;">mail.hivos.org</td><td style="width: 100px;">587</td><td style="width: 100px;">STARTTLS</td></tr><tr><td style="width: 100px;">Calendar</td><td style="width: 100px;">CalDAV</td><td colspan="3">https://mail.hivos.org/dav/<b>'+username+'</b>/Calendar</td></tr></tbody></table></div>';
};
 
AnnouncementsZimlet.prototype.status =
  function(text, type) {
    var transitions = [ ZmToast.FADE_IN, ZmToast.PAUSE, ZmToast.PAUSE, ZmToast.PAUSE, ZmToast.FADE_OUT ];
    appCtxt.getAppController().setStatusMsg(text, type, null, transitions);
  };

AnnouncementsZimlet.prototype.escapeHtml =
function (unsafe) {
    if(unsafe)
    {
       return DOMPurify.sanitize(unsafe);
    }   
};

AnnouncementsZimlet.prototype.addAnnouceOrCommentCallback = function (title, addAnnouceOrComment, entryId)
{
   var addingComment = !isNaN(entryId);
   if(!addingComment)
   {
      var title = title.getValue();
   }   
   var body = addAnnouceOrComment.dwtext.getContent();
   body = body.replace(/(\<html\>|\<\/html\>|\<body\>|\<\/body\>)/ig,'');
   
   if(!addingComment)
   {
      if((title.length < 3)||(body.length < 10))
      {
         AnnouncementsZimlet.prototype.status('Please add title and announcement body.',ZmStatusView.LEVEL_WARNING)
         return;
      }   
   }
   else if ((body.length < 10)&&(addingComment))
   {
      AnnouncementsZimlet.prototype.status('Please add comment body.',ZmStatusView.LEVEL_WARNING)
      return;      
   }
   

   var soapDoc = AjxSoapDoc.create("Announcements", "urn:Announcements", null);
   if(!addingComment)
   {
      soapDoc.getMethod().setAttribute("action", "publishAnnouncementOrComment");
      soapDoc.getMethod().setAttribute("title", encodeURIComponent(title));
      soapDoc.getMethod().setAttribute("entryId", "n/a");      
   }
   else
   {
      soapDoc.getMethod().setAttribute("action", "publishAnnouncementOrComment");
      soapDoc.getMethod().setAttribute("entryId", entryId);      
   }   
   soapDoc.getMethod().setAttribute("content", encodeURIComponent(body));
   soapDoc.getMethod().setAttribute("userName", encodeURIComponent((appCtxt.get(ZmSetting.DISPLAY_NAME) ? appCtxt.get(ZmSetting.DISPLAY_NAME) : '') + ' &lt;' + appCtxt.getActiveAccount().name + '&gt;'));

   var params = {
   soapDoc: soapDoc,
   asyncMode: true,
   callback: new AjxCallback(void 0, this.showContent)
   };
   appCtxt.getAppController().sendRequest(params);

   try {
      addAnnouceOrComment.setContent('');
      addAnnouceOrComment.popdown();
   } catch(err){}
};


AnnouncementsZimlet.prototype.addAnnouceOrComment = function(entryId) {
   var addingComment = !isNaN(entryId);
   
   var addAnnouceOrComment = new DwtDialog({parent: appCtxt.getShell(), disposeOnPopDown: true});
   var composite = new DwtComposite({ parent: addAnnouceOrComment });

   addAnnouceOrComment.setView(composite);

   if(!addingComment)
   {
      var title = new DwtInputField({
        parent: composite,
        className: 'announceTxt',
        hint: 'Announcement Title',
        id: 'announceTitle'
      });
   }
   addAnnouceOrComment.dwtext = new ZmHtmlEditor({parent: composite});
   addAnnouceOrComment.dwtext.setMode("text/html");
   addAnnouceOrComment.dwtext.setSize(600,400); 
   addAnnouceOrComment.dwtext.setContent("");
   
   if(!addingComment)
   {
      var files = new DwtInputField({
        parent: composite,
        className: 'announceTxt',
        id: 'announceFile'
      });
   }

   composite.setSize(610,500); 
   if(!addingComment)
   {
      addAnnouceOrComment.setTitle('New Announcement');
   }
   else
   {   
      addAnnouceOrComment.setTitle('New Comment');
   }

   addAnnouceOrComment.setButtonListener(DwtDialog.OK_BUTTON, new AjxListener(this, this.addAnnouceOrCommentCallback, [title, addAnnouceOrComment, entryId]));
   addAnnouceOrComment.addEnterListener(new AjxListener(this, this.addAnnouceOrCommentCallback, [title, addAnnouceOrComment, entryId]));

   if(!addingComment)
   {
      addAnnouceOrComment._tabGroup.addMemberBefore(addAnnouceOrComment.dwtext,addAnnouceOrComment._tabGroup.getFirstMember());
      addAnnouceOrComment._tabGroup.addMemberBefore(title, addAnnouceOrComment.dwtext);
      addAnnouceOrComment._tabGroup.setFocusMember(title);  

   }
   else
   {   
      addAnnouceOrComment._tabGroup.addMemberBefore(addAnnouceOrComment.dwtext,addAnnouceOrComment._tabGroup.getFirstMember());
      addAnnouceOrComment._tabGroup.setFocusMember(addAnnouceOrComment.dwtext);  
   }   
   addAnnouceOrComment.popup();

   if(!addingComment)
   {
      document.getElementById('announceFile').innerHTML = '<b>Attachments</b><br><input type="file" multiple name="attachments" id="announceAttach">';
   }   
};

AnnouncementsZimlet.prototype.addAnnouceOrCommentCallback = function (title, addAnnouceOrComment, entryId)
{
   var addingComment = !isNaN(entryId);
   if(!addingComment)
   {
      var title = title.getValue();
   }   
   var body = addAnnouceOrComment.dwtext.getContent();
   body = body.replace(/(\<html\>|\<\/html\>|\<body\>|\<\/body\>)/ig,'');
   
   if(!addingComment)
   {
      if((title.length < 3)||(body.length < 10))
      {
         AnnouncementsZimlet.prototype.status('Please add title and announcement body.',ZmStatusView.LEVEL_WARNING)
         return;
      }   
   }
   else if ((body.length < 10)&&(addingComment))
   {
      AnnouncementsZimlet.prototype.status('Please add comment body.',ZmStatusView.LEVEL_WARNING)
      return;      
   }
   

   var soapDoc = AjxSoapDoc.create("Announcements", "urn:Announcements", null);
   if(!addingComment)
   {
      soapDoc.getMethod().setAttribute("action", "publishAnnouncementOrComment");
      soapDoc.getMethod().setAttribute("title", encodeURIComponent(title));
      soapDoc.getMethod().setAttribute("entryId", "n/a");      
   }
   else
   {
      soapDoc.getMethod().setAttribute("action", "publishAnnouncementOrComment");
      soapDoc.getMethod().setAttribute("entryId", entryId);      
   }   
   soapDoc.getMethod().setAttribute("content", encodeURIComponent(body));
   soapDoc.getMethod().setAttribute("userName", encodeURIComponent((appCtxt.get(ZmSetting.DISPLAY_NAME) ? appCtxt.get(ZmSetting.DISPLAY_NAME) : '') + ' &lt;' + appCtxt.getActiveAccount().name + '&gt;'));

   var params = {
   soapDoc: soapDoc,
   asyncMode: true,
   callback: new AjxCallback(void 0, this.showContent)
   };
   appCtxt.getAppController().sendRequest(params);

   try {
      addAnnouceOrComment.setContent('');
      addAnnouceOrComment.popdown();
   } catch(err){}
};


/* Code to deal with RSS feeds */

AnnouncementsZimlet.prototype._invoke =
function(postCallback) {
	var feedUrl = ZmZimletBase.PROXY + AjxStringUtil.urlComponentEncode(AnnouncementsZimlet._feed);
	AjxRpc.invoke(null, feedUrl, null, new AjxCallback(this, AnnouncementsZimlet.prototype._reponseHandler, postCallback), true);
};

AnnouncementsZimlet.prototype._displayRSSResultsDialog =
function(elem) {
document.getElementById(elem).innerHTML = AnnouncementsZimlet.prototype.feedGetHTML();
};

AnnouncementsZimlet.prototype._reponseHandler =
function(postCallback, reponse) {
	var items = "";
	try {
		items = reponse.xml.getElementsByTagName("item");
	} catch(e) {//there was some expn getting feed
		return;
	}
	AnnouncementsZimlet.titleDescArray = new Array();
	AnnouncementsZimlet._currentFeedIndex = 0;
	var counter = 0;
	for (var i = 0; i < items.length; i++) {
		try {
			var title = desc = "";
			var titleObj = items[i].getElementsByTagName("title")[0].firstChild;
			var descObj = items[i].getElementsByTagName("description")[0].firstChild;
			var linkObj = items[i].getElementsByTagName("link")[0].firstChild;
         var pubDate = items[i].getElementsByTagName("pubDate")[0].firstChild;
			if (titleObj.textContent) {
				AnnouncementsZimlet.titleDescArray[counter] = {title: titleObj.textContent, desc:descObj.textContent, link:linkObj.textContent, pubDate:pubDate.textContent};
			} else if (titleObj.text) {
				AnnouncementsZimlet.titleDescArray[counter] =  {title: titleObj.text, desc:descObj.text, link:linkObj.text, pubDate:pubDate.textContent}; 
			}
			counter++;
		}catch(e) {//print some exception
			AnnouncementsZimlet._showErrorMsg(e);
			return;
		}
	}

   if(postCallback)
	   postCallback.run(this);

};

AnnouncementsZimlet.prototype.feedGetHTML =
function() {
	var html = "";
	var i = 0;

	for(var j=0;j<AnnouncementsZimlet.titleDescArray.length; j++) {
		var val = AnnouncementsZimlet.titleDescArray[j];

		html = html + "<a target=\"_blank\" href=\""+AnnouncementsZimlet.prototype.escapeHtml(val.link)+"\">"+AnnouncementsZimlet.prototype.escapeHtml(val.title)+"</a><br><hr class=\"feeditem\">";

	}

	return html;
};  
