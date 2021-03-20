# Project Crouching Tiger Notes

## Required Software

* NodeJS          >= 0.10.40
* NPM             >= 1.4.28
* PHP             >= 5.5.9
* php5_pgsql      >= 5.5.9
* grunt           >= 0.4.5
* grunt-cli       >= 0.1.13


## Configuration and Setup

### Config files

There should be two config files used by the site, one is for AngularJS to use and the other is for PHP to use.  These files for security reasons are stored
in a directory outside of the project, namely the system path of: 
    
    /etc/lmc/ct

Inside this directory there should be the two config files of "config.js" that AngularJS uses and "config.ini" that PHP uses.  Both of these files are accessed 
by the use of symbolic links that are located in the top level directory and that point to the system directory

### NodeJS and NPM

First NodeJS and NPM must be installed, which can be download from https://nodejs.org/download/ or any OS that you
are running.  Alternately you can use the binary distributions found at https://github.com/nodesource/distributions
On Debian based Linux distros you do the following:

    sudo apt-get install curl
    curl -sL https://deb.nodesource.com/setup | sudo bash -
    sudo apt-get install -y nodejs

or alternatively if you don't need the latest release

    sudo apt-get install nodejs npm

Once *npm* is installed you will need to load all of the modules the code uses, which you execute from the project
top directory or document root:

    npm install
    
This will install the necessary Grunt packages that it needs for the minification.  Running the process of minification requires compilation upon any change 
to the code base in order for it to be part of the minified code base, which it creates a copy of the code base into a sub-directory called "dist" which 
should be used as the document root for the project if the optimized code is desired to be used. To perform the minification execute the following in the top
level directory where this readme is located:

    grunt

This will parse through all of the Javascript and CSS files to perform various optimizations on to reduce the number and size of the files required to load 
the web pages.

### Nginx

The virtual host configuration will need to include PHP being enabled for the main index.php file, which handles dynamic loading of styling for white labeled 
domains.  It is also important to set the variable ENV that PHP will use to the correct environment that is being used.  It is also worth noting that the 
web server must be setup to allow all domains that are pointing to it's IP address to be handled by this virtual host config.  Other companies will likely have
a CNAME record setup in their DNS to point to cfa.convirza.com, which in turn should point to the IP of this web server, but they could also have an A record 
that points directly to the IP of the server.  Here is a sample config:

    server {
        listen 127.0.0.1:443;
        server_name *;
        
        ssl on;
        ssl_certificate /etc/ssl/apache2/cfa.convirza.js.crt;
        ssl_certificate_key /etc/ssl/apache2/cfa.convirza.js.key;
        
        # set cache expire headers
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|woff|html)$ {
            expires 1w;
            add_header Pragma public;
            add_header Cache-Control "public";
        }
    
        index index.php index.html index.htm;
        root /www/crouchingtiger;
        location / {
            try_files $uri $uri/ =404;
        }
    
        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    
        location ~ \.php$ {
            try_files $uri =404;
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_pass unix:/var/run/php5-fpm.sock;
            fastcgi_param ENV development;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    
        access_log /var/log/nginx/cfa-ssl.access;
        error_log /var/log/nginx/cfa-ssl.error error;
    }
    
NOTE: for developers in order work with a locally ran environment and to get around having to have DNS registered domain names or the 
problem of having more than one virtual host configured for your system, you can alter the config slightly to work with specifically
defined domains that you want to use, which will keep the rest of your virtual host configs working as well.
    
You will need to define each alternate domain or sub-domain that you wish to use for while labeling and create an entry in your /etc/hosts
file for each.  Next you'll need to alter the Nginx config from the above to something like the following:
    
    listen 443;
    server_name ct.convirza.js mysub.convirza.js another.mysite.com;
        
Here you will notice that we have taken off the IP restriction, which doesn't matter all that much since you likely have everything pointing 
to the same IP, but helps ease any possible conflicts.  Next we define the server_name value to be a static domain name, followed by aliases
that we would use for sub-domain white label testing.  Keep in mind this will only work for domains that you explicitly list as a value for 
server_name AND include in your hosts file (which circumvents the need for DNS records)

### Apache2

The setup for use with Apache2.x would be very similar to the configuration used for Nginx.  The following is an example configuration, which the 
main things to note in this config is that it is set to use IP-based virtual hosting (to the loopback IP) and no ServerName is set, so it will
answer to any domain that is pointed to the specified IP in the VirtualHost tag.  Also PHP needs to have the ENV variable set that it can read
which is accomplished with the SetEnv command.  There is also a Header setting to allow for CORS calls which are used with the API.

    <VirtualHost 127.0.0.1:443>
        ServerAdmin dwalbeck@convirza.com
    
        SSLEngine on
        SSLCertificateFile      /etc/ssl/apache2/cfa.convirza.js.crt
        SSLCertificateKeyFile   /etc/ssl/apache2/cfa.convirza.js.key
        SSLCertificateChainFile /etc/ssl/apache2/my-ca.crt
    
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
    
        Header set Access-Control-Allow-Origin "*"
        SetEnv ENV development
    
        DocumentRoot /www/crouchingtiger
        <Directory /www/crouchingtiger>
            Options +FollowSymLinks +ExecCGI
            Allow from all
            AllowOverride All
            Order allow,deny
            Require all granted
        </Directory>
        ErrorLog /var/log/apache2/ct_error_log
        CustomLog /var/log/apache2/ct_access_log combined
    </VirtualHost>


NOTES: For a developer environment it will be necessary to alter the configuration from this example a bit, so to keep any additional virtual
host sites working we need to remove the binding to the IP in the VirtualHost tag.  You will need to specify the domain for the ServerName, 
which should be the equivalent of the default Convirza used domain, and then can add as many ServerAlias entries as needed for alternate domains.
    
    <VirtualHost *:443>
        ServerName cfa.convirza.js
        ServerAlias cmo.convirza.js
        ServerAlias mud.convirza.js
            
Keep in mind that you must also have each additional ServerAlias domain included in your /etc/hosts file in order to work.

## Notes for 'index.html'

NOTE: index.html has been replace by index.php, which is basically the same thing, only it additionally checks for custom domains with CSS styling

For normal development workflow, we can just serve up the files from their paths in the various directories, bower_components etc. And it doesn't
really matter for performance reasons.

However when we serve assets up in production we need to limit how many requests the browser is making, and therefore use concat'ed versions. of only a few files
An example of how we are doing this is as follows

<!--build:js js/vendor3.js-->
<script src="js/aes.js"></script>
<script src="bower_components/modernizr/modernizr.js"></script>
<script src="bower_components/underscore/underscore.js"></script>
<script src="scripts/inhouse_lib/underscore_augment.js"></script>

<script src="bower_components/html2canvas/build/html2canvas.js"></script>
<script src="bower_components/jspdf/dist/jspdf.debug.js"></script>
<script src="js/d3.js"></script>
<script src="lib/dc.js"></script>
<script src="js/colorbrewer.js"></script>
<!--endbuild-->

Inbetween the two lines of commented code (<!--build:js js/vendor3.js--> and <!--endbuild-->) we have the normal script tags path'ed to wherever the asset is that we care
about. During normal development our browser will request to what is in the script src attribute, however, what we want to serve up from production is only one files with all of the others merged into it, or
"concat'ed" into one. We have a grunt task that parses through the 'index.html' and will merge all the files inbetween the two flag lines (in this case (<!--build:js js/vendor3.js--> and <!--endbuild-->))
and merge all of those into "js/vendor3.js" in the /dist directory. To see the result, you can run 'grunt' if you have it installed and it will product a new, optimized version of our project
into the /dist directory. Examine the new 'dist/index.html' file to see how all of the files inbetween the (<!--build:js js/vendor3.js--> and <!--endbuild-->) are removed and replaced with
<script src="js/vendor3.js"></script> (or whatever it's specified to end up named as);

You will see this pattern for CSS files as well as JS.

*IMPORTANT*
If you comment out a script tag that inside the block for concat'ing files it will still use it and won't take into consideration that you don't want it (since you commented it out).
It seems like the grunt module just uses a simple regex to grab the text out of the src attribute in any script tags and doesn't avoid script tags that are commented out AND inside the
concat block syntax ex(<!--build:js js/vendor3.js--> and <!--endbuild-->). You can, however, safely just comment out the tag you don't want, and then put it right outside the concat block.



## Grunt'ing

### Building production version
in terminal run
grunt

for building production version of the app to the /dist folder in the root directory of the project. You'll see that a /.tmp folder is also created in the process but it's just a temporary area
for manipulating the files and can be discarded

### Linting JS files
in terminal run
grunt lint
which will show you any errors in JS syntax as well as bad practices (JS sins) written.



## Library Modifications

We're keeping track of modifications to library files inside of the root directory at lib_modifications.txt.
Include the modification type and the reason made



























