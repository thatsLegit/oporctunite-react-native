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
brew yarn install
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
    
## Etape 5: 
Lancer "Metro Bundler" (qui permet de choisir le support sur lequel l'application sera lancée)

```
yarn android
```

Cette commande lance "Metro Bundler", et essaye de lancer l'application sur un appareil/simulateur disponible
    
## Etape 6: Accéder à l'application
- 7.1: Par appareil physique <br>
        > Télécharger l'application Expo sur le PlayStore <br>
        > Scanner le QR code en bas à gauche du "Metro Bundler" avec le scanner de l'application Expo <br>
        
- 7.2: Par émulateur *Pas fini, essayer avec 7.1* <br>
        > Télécharger Android Studio <br>
        > Sur la page d'accueil (Welcome to Android Studio), cliquer sur Configure (en bas à droite) <br>
        > AVD Manager <br>
        > Create virtual device (en bas à gauche) <br>

# Environnement:
    - Expo: 3.21.5