<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClinics extends Migration
{
   /**
    * Run the migrations.
    *
    * @return void
    */
   public function up()
   {
      Schema::create('clinics', function (Blueprint $table) {
         $table->increments('id');
         $table->string('nome');
         $table->string('cnpj', 20)->nullable();
         $table->string('telefone', 15)->nullable();
         $table->string('logradouro')->nullable();
         $table->string('numero', 10)->nullable();
         $table->string('bairro')->nullable();
         $table->string('complemento')->nullable();
         $table->string('cidade')->nullable();
         $table->string('uf', 2)->nullable();
         $table->string('latitude', 100)->nullable();
         $table->string('longitude', 100)->nullable();
         $table->longText('descricao')->nullable();
         $table->integer('status')->default(1);
         $table->timestamps();
      });
   }

   /**
    * Reverse the migrations.
    *
    * @return void
    */
   public function down()
   {
      Schema::dropIfExists('clinics');
   }
}
