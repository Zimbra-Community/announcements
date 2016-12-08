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
package tk.barrydegraaff.announcements;

import java.util.Map;

import com.zimbra.common.localconfig.LC;
import com.zimbra.common.service.ServiceException;
import com.zimbra.common.soap.Element;
import com.zimbra.common.soap.SoapParseException;
import com.zimbra.soap.DocumentHandler;
import com.zimbra.soap.ZimbraSoapContext;

import java.sql.*;
import java.io.*;
import java.text.*;
import java.util.*;


public class Announcements extends DocumentHandler {
    final String db_connect_string = this.getDbConnectionString();

    public Element handle(Element request, Map<String, Object> context)
            throws ServiceException {
        try {
            ZimbraSoapContext zsc = getZimbraSoapContext(context);
            Element response = zsc.createElement(
                    "AnnouncementsResponse"
            );

            switch (request.getAttribute("action")) {
                case "getAnnouncements":
                    return getAnnouncements(db_connect_string, response);
                case "publishAnnouncementOrComment":
                    return publishAnnouncementOrComment(db_connect_string, request, response);
                case "getComments":
                    return getComments(db_connect_string, request, response);
                default:
                    return getAnnouncements(db_connect_string, response);
            }
        } catch (
                Exception e)
        {
            throw ServiceException.FAILURE("exception occurred handling command", e);
        }
    }

    private String getDbConnectionString() {
        Properties prop = new Properties();
        try {
            FileInputStream input = new FileInputStream("/opt/zimbra/lib/ext/Announcements/db.properties");
            prop.load(input);
            input.close();
            return prop.getProperty("db_connect_string");
        } catch (IOException ex) {
            ex.printStackTrace();
            return "";
        }
    }


    private Element getAnnouncements(String db_connect_string, Element response) {
        try {
            String result = "";
            Connection connection = DriverManager.getConnection(db_connect_string);
            PreparedStatement queryApp = null;
            ResultSet announcements = null;
            if (!connection.isClosed()) {
                queryApp = connection.prepareStatement("SELECT AnnouncementsEntry.entryId, AnnouncementsEntry.userName, AnnouncementsEntry.createDate, AnnouncementsEntry.title, AnnouncementsEntry.content, " +
                        " (select count(*) from AnnouncementsComments WHERE AnnouncementsEntry.entryId = AnnouncementsComments.entryId) as comments "+
                        "FROM AnnouncementsEntry order by createDate DESC LIMIT 0, 25");
                announcements = queryApp.executeQuery();

                while (announcements.next()) {
                    Element content = response.addNonUniqueElement("content");
                    content.addAttribute("createDate", announcements.getTimestamp("createDate").toString());
                    content.addAttribute("userName", announcements.getString("userName"));
                    content.addAttribute("content", announcements.getString("content"));
                    content.addAttribute("title", announcements.getString("title"));
                    content.addAttribute("comments", announcements.getString("comments"));
                    content.addAttribute("entryId", announcements.getString("entryId"));
                }
                announcements.close();
                connection.close();
            }
            return response;
        } catch (Exception ex) {
            Element content = response.addNonUniqueElement("content");
            content.setText("Exception thrown: " + ex.toString());
            return response;
        }
    }

    private Element getComments(String db_connect_string, Element request, Element response) {
        try {
            if(this.isNumeric(request.getAttribute("entryId"))) {
                String result = "";
                Connection connection = DriverManager.getConnection(db_connect_string);
                ResultSet announcements = null;
                if (!connection.isClosed()) {
                    PreparedStatement stmt = connection.prepareStatement("SELECT * from AnnouncementsComments WHERE entryId = ? order by createDate DESC LIMIT 0, 25");
                    stmt.setString(1, request.getAttribute("entryId"));
                    stmt.executeQuery();
                    announcements = stmt.executeQuery();

                    while (announcements.next()) {
                        Element content = response.addNonUniqueElement("content");
                        content.addAttribute("id", announcements.getString("id"));
                        content.addAttribute("entryId", announcements.getString("entryId"));
                        content.addAttribute("createDate", announcements.getTimestamp("createDate").toString());
                        content.addAttribute("userName", announcements.getString("userName"));
                        content.addAttribute("content", announcements.getString("content"));
                    }
                    announcements.close();
                    connection.close();
                }
            }
            return response;
        } catch (Exception ex) {
            Element content = response.addNonUniqueElement("content");
            content.setText("Exception thrown: " + ex.toString());
            return response;
        }
    }


    private Element publishAnnouncementOrComment(String db_connect_string, Element request, Element response) {
        try {
            String result = "";
            Connection connection = DriverManager.getConnection(db_connect_string);

            if (!connection.isClosed()) {
                if(this.isNumeric(request.getAttribute("entryId")))
                {
                    PreparedStatement stmt = connection.prepareStatement("INSERT INTO AnnouncementsComments VALUES (NULL, ?, ?, NOW(),?)");
                    stmt.setString(1, this.uriDecode(request.getAttribute("entryId")));
                    stmt.setString(2, this.uriDecode(request.getAttribute("userName")));
                    stmt.setString(3, this.uriDecode(request.getAttribute("content")));
                    stmt.executeQuery();
                }
                else {
                    PreparedStatement stmt = connection.prepareStatement("INSERT INTO AnnouncementsEntry VALUES (NULL, ?, NOW(),?,?)");
                    stmt.setString(1, this.uriDecode(request.getAttribute("userName")));
                    stmt.setString(2, this.uriDecode(request.getAttribute("title")));
                    stmt.setString(3, this.uriDecode(request.getAttribute("content")));
                    stmt.executeQuery();
                }
                connection.close();
            }
            return getAnnouncements(db_connect_string, response);
        } catch (Exception ex) {
            Element content = response.addNonUniqueElement("content");
            content.setText("Exception thrown: " + ex.toString());
            return response;
        }
    }

    private String uriDecode(String dirty) {
        try {
            String clean = java.net.URLDecoder.decode(dirty, "UTF-8");
            return clean;
        } catch(Exception ex) {
        return ex.toString();
        }
    }

    private boolean isNumeric(String str)
    {
        try
        {
            double d = Double.parseDouble(str);
        }
        catch(NumberFormatException nfe)
        {
            return false;
        }
        return true;
    }
}

