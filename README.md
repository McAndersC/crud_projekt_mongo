# crud_projekt
Create, Read, Update, Delete

# MCDM_ServerSide_MongoDB
MCDM_ServerSide_MongoDB

1. [Overordnet Server Projekt](#overordnet)
2. [MongoDB Install](#mongodbInstall)   
    2.1 [Win Install](#mongodbWinInstall)   
    2.2 [Mac Install](#mongodbMacInstall)   
3. [Snippets](#snippet)     
    3.1 [Snippets - Farverkode](#snippetFarve)           
4. [Expo/React-native](#expo) 

## 1. Overordnet Server Projekt. <a name="overordnet"></a>

Create, Read, Update, Delete.

## 2. MongoDB Install <a name="mongodbInstall"></a>

### 2.1 Windows Install <a name="mongodbWinInstall"></a>
[Windows - MongoDB Install](https://www.mongodb.com/try/download/community)

På følgende link vælger du "on-premises".
Herefter vælger man download i venstre side og henter "msi" udgaven.

Denne installation skal der bare siges next, next, next til. Herefter er Både MongoDB og Compass installeret. Det vil altid være godt med en genstarter herefter.

Nu skulle du kunne finde programmet "Compass" på din pc. Compass er et GUI til mongoDB.

### 2.2 Mac Install. <a name="mongodbMacInstall"></a>

Det er en to-trins process på Mac. Man skal installere mongoDB og Compass.

[Mac - MongoDB Install](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)      
[Mac - MongoDB Compass (Gui for MongoDB)](https://docs.mongodb.com/compass/current/install/)

**MacOS start/stop MonGO DB Services.**

Start:
``` brew services start mongodb-community@5.0 ```

Stop
``` brew services stop mongodb-community@5.0```

Herefter kan man starte Compass.