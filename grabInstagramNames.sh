#!/bin/bash

#resources: http://www.opensourceforu.com/2011/04/sed-explained-part-1/

#cut off from the _ followed by 6 digits back. that should handle names ending with numbers
ls | sed 's/_[[:digit:]]\{6\}.*//' | uniq
