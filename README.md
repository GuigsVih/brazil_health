# Brasil Saúde
Aplicativo do Brasil Saúde.

# Backend

O backend foi desenvolvido utilizando o framework Laravel 6.

# Instalação

- Copie o arquivo `.env.example` e crie um arquivo .env.
- Altere as configurações de banco de dados.
- Rode o comando `php artisan jwt:secret`
- Rode o comando `php artisan key:generate`.
- Rode o comando `php artisan migrate --seed`para criar as tabelas no banco e adiconar um usuário.
- Rode o comando `php artisan storage:link` para direcionar o `storage` para a pasta `public`
- `php artisan serve` para iniciar o servidor.

# Frontend

O frontend foi desenvolvido utilizando o framework Ionic com Angular.

# Instalação

- `npm install` para instalar as dependências
- `ionic serve` para iniciar a aplicação
- verifique os plugins do cordova para transições de tela
- `ionic cordova run android` para executar a criação da APK

# Required

- SDK Java e Android Studio
