# Problem Deffinition
When a URL is shared for a specific resource in Google cloud (such as a project's kubernetes clusters, storage or security) the url either doesn't specify the "authuser" or it specifies a specific number, such as "authuser=0". Depending on the order in which Google accounts were signed in with this can cause links to bring the user to a page with no permissions to view the resource.

# Aims

* A plugin that allows the user to select the "authuser"
* It should sync accross devices
* Write as much as possible to ensure security