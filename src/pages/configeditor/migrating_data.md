---
title: "Configuration Editor Migration"
excerpt: "Configuration Editor Migration."
categories: configeditor
slug: migration
toc: true
---

## Migrating Early Access Program Data

Customers that were part of the Early Access Program (EAP) can follow these steps to migrate existing artifacts to the newly installed Merative ACD Configuration Editor instace.

1.  Stop the Merative Configuration Editor from the `acd-ce` diretory.
  `./run-acd-ce.sh -stop`
1.  Navigate to the %HOME%/installs/config/artrifactstore directory in the EAP enviroment.
1.  Create an archive of the tenent data directories.
  `tar -czv --exclude=SHAREDBASE <archive-name>.tar.gz *`
1.  Copy the archive to the Merative Configuration Editor environment.
1.  Navigate to the %HOME%/installs/config/artrifactstore directory in the Merative enviroment.
1.  Extract the archive to the .../artifactstore directory.
  `tar xvf <archive-dir>/<archive-file> .`
1.  Start the Merative Configuration Editor from the 'acd-ce' directory.
  `./run-acd-ce.sh`

NOTE:  WHen analyzing text the first time after restarting Merative Configuration Editor, it is common to experiance an initial error while the data model is being loaded.  Wait a few minutes after the initial error is received and retry the operation.
