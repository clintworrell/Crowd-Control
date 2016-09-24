#!/bin/bash
# chmod u+x current_track_info.sh
qdbus org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Metadata | awk -F": " '{ print $1 "=" $2 "&"}' | curl -d @- http://10.3.35.82:3000/api/playlist/curltest
