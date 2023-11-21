# Installation
1. Go to `chrome://extensions/`
2. Enable Developer mode (top right)
3. Load Unpacked (top left)
4. Oh, you should have cloned/downloaded this first. If you haven't done that, do that.
5. Unzip this project if you downloaded it
6. Select the directory of this project
7. Proffit

# Problem Deffinition
When a URL is shared for a specific resource in Google cloud (such as a project's kubernetes clusters, storage or security) the url either doesn't specify the "authuser" or it specifies a specific number, such as "authuser=0". Depending on the order in which Google accounts were signed in with this can cause links to bring the user to a page with no permissions to view the resource.

# Aims
* A plugin that allows the user to select the "authuser"
* It should sync accross devices
* Write as much as possible to ensure security