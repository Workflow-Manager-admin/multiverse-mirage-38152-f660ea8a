#!/bin/bash
cd /home/kavia/workspace/code-generation/multiverse-mirage-38152-f660ea8a/multiverse_mirage
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

