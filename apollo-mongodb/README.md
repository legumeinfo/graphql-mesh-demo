# apollo-mongodb
This is a little experiment in loading all the README YAMLs into a MongoDB collection
(using [this shell script](https://github.com/legumeinfo/datastore-specifications/blob/main/scripts/import_metadata_into_mongodb.sh))
and then writing an Apollo server/client to display the README synopses with an expander button to show all the README data.

This is a concept that could be implemented for the README expander on the Jekyll site. But I have no idea how to integrate the client code
into the Jekyll site, so I'll wait for someone to create an official example of that.
