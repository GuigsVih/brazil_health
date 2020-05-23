<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
   /**
    * Run the database seeds.
    *
    * @return void
    */
   public function run()
   {
      $user = new User();
      $user->name = 'Saúde Brasil';
      $user->email = 'contato@saudebrasil.com.br';
      $user->password = bcrypt('1234');
      $user->role = 'Admin';
      $user->save();
   }
}
