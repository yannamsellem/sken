#!/bin/bash

remote=`git remote -v | grep -m 1 sken.git`

function update_from_sken_repo {
    git pull origin master
}

function update_sken_in_project {
    mkdir tmp
    git clone https://github.com/GhostxRipper/sken.git tmp
    rsync --exclude-from 'ignore_for_update' -avz tmp/ ./
    rm -rf tmp
    git checkout package.json
    yarn
    echo "⚠️check your dependencies⚠️"
}

if [[ -n "$remote" ]]; then update_from_sken_repo; else update_sken_in_project; fi
