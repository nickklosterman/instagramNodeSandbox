#!/bin/bash
ls | sed 's/_[[:digit:]]\{6\}.*//' | uniq
