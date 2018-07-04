#!/bin/bash

mongoimport --db similarDoctors --collection doctors --type json --file ./fake-data.json --jsonArray