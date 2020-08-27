# Restant à faire
- Partie ‘aide’ dans le drawer pour mettre les liens de contact, pol de conf et doc de l’appli (indispensable pour upload sur les stores)
- Trouver une solution pour la visualisation des pdf hors ligne sur android (pistes : utiliser WebBrowser, Sharing, IntentLauncher, ou Linking pour ouvrir le pdf dans le navigateur ou un lecteur de pdf).
- Finir le dernier écran non-fait de l’appli
- Corriger pb variable Int pour téléphone dans la bd, cause un mini-bug dans la modif des données persos
- Possibilité de modif l’image de profil ?
- Ajouter des id dans la bd pour les evals, catégories, sous-catégories (permettra de simplifier la partie bilan, évaluations et évitera des choses écrites 'en dur')…

# Installation

## Etape 1: 
cloner le projet, puis cd le fichier du projet

## Etape 2: 
Installer de manière globale expo-cli
```
npm install -g expo-cli
```

## Etape 3: 

Installer yarn

### MacOS

avec Brew package manager :

```
brew install yarn
```

Ou télécharger directement via le terminal :

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

### Windows

Avec Chocolatey :

```
choco install yarn
```

Notez que l'utilisation de yarn est un choix, mais il est possible de switcher vers npm.<br>
    
## Etape 4: 
Installer les dépendances

```
yarn install
```
    
## Etape 5: Installer les IDE et émulateurs

### windows

Tuto : *https://www.infoworld.com/article/3095406/android-studio-for-beginners-part-1-installation-and-setup.html* <br>

> Télécharger Android Studio <br>
> Sur la page d'accueil (Welcome to Android Studio), cliquer sur Configure (en bas à droite) <br>
> AVD Manager <br>
> Create virtual device (en bas à gauche) <br>
> Installer le JDK et tous les plugins nécéssaires

### MacOS

> Télécharger XCode <br>
> Préférences -> Locations -> Command Line Tools : votre version de XCode


## Etape 6: 
Lancer "Metro Bundler"

*Dépend de votre OS*
```
yarn android
yarn ios
```

Cette commande lance "Metro Bundler", et essaye de lancer l'application sur un appareil/simulateur disponible. <br>

## Etape 7 :
Testez l'application !<br>

Une fois lancée, l'appli pourra être testée sur votre appareil physique : <br>
    > Télécharger l'application Expo sur le PlayStore <br>
    > Scanner le QR code en bas à gauche du "Metro Bundler" avec le scanner de l'application Expo <br><br>
    
Ou sur l'émulateur : <br>
    > Sur windows, il faut donc lancer l'AVD avant le Metro Bundler.<br>
    > Sur MacOS, peut importe, Xcode lancera l'émulateur par défaut automatiquement au lancement de Metro
        

# Environnement:
- expo-cli: 3.21.5
- expo: 38
- react-native > 0.62