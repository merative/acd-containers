---
title: "Configuration Editor Migration"
excerpt: "Configuration Editor Migration."
categories: configeditor
slug: migration
toc: true
---

## Migrating Early Access Program (EAP) Data

**Migration of existing IBM Watson ACD Configuration Editor cartridges and artifacts to Merative ACD Configuration Editor** 

Customers that were part of the Early Access Program (EAP) can follow these steps to migrate existing artifacts to the newly installed Merative ACD Configuration Editor instance.

1.  From the `acd-ce` directory, stop the Merative Configuration Editor.

    ```
    ./run-acd-ce.sh -stop
    ```

1.  Navigate to the %HOME%/installs/config/artifactstore directory in the IBM Watson ACD EAP environment.  The %HOME% value is where the Configuration Editor was installed.
1.  Create an archive of the tenant data directories.

    ```
    tar -czv --exclude=SHAREDBASE <archive-name>.tar.gz *
    ```

1.  Copy the archive to the Merative Configuration Editor environment.
1.  Navigate to the %HOME%/installs/config/artifactstore directory in the Merative environment.  The %HOME% value is where the Configuration Editor was installed.
1.  Extract the archive to the artifactstore directory using the fully qualified path to the archive.

    ```
    tar xvf <archive-path>/<archive-name>.tar.gz .
    ```

1.   From the `acd-ce` directory, start the Merative Configuration Editor.

    ```
    ./run-acd-ce.sh
    ```

NOTE:  When analyzing text the first time after restarting Merative ACD Configuration Editor, it is common to experience an initial error while the data model is being loaded.  Wait a few minutes after the initial error is received and retry the operation.
