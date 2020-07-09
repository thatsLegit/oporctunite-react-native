Etape 1: cloner le git (avec https pour pouvoir interagir avec le git)
    - Dans Git Bash à l'endroit choisi
    >git clone ...

Etape 2: Installer de manière globale expo-cli (pour l'instant, cela risque de changer)
    >npm install -g expo-cli

Etape 3: Installer chocolatey afin de pouvoir installer yarn
    >https://chocolatey.org/
    
Etape 4: Installer yarn de manière globale 
    >choco install yarn
    
Etape 5: Installer yarn dans le projet
    - Aller dans de projet avec l'invité de commande (cd Oporctunite-React-Native)
    >yarn install
    
Etape 6: Lancer "Metro Bundler" (qui permet de choisir le support sur lequel l'application sera lancée)
    - Toujours dans le projet avec l'invité de commande (cd Prototype-Sprint1-React-Native)
    >yarn android
    PS: cette commande lance "Metro Bundler", et essaye de lancer l'application sur un appareil/simulateur disponible
    
Etape 7: Accéder à l'application
    - 7.1: Par appareil physique
        > Télécharger l'application Expo sur le PlayStore
        > Scanner le QR code en bas à gauche du "Metro Bundler" avec le scanner de l'application Expo
        
    - 7.2: Par émulateur *Pas fini, essayer avec 7.1*
        > Télécharger Android Studio
        > Sur la page d'accueil (Welcome to Android Studio), cliquer sur Configure (en bas à droite)
        > AVD Manager
        > Create virtual device (en bas à gauche)
